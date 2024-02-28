import { rateLimit } from "@/lib/rate-limit";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from '@/lib/primsadb';
import { MemoryManager } from "@/lib/memory";
import { LangChainStream, StreamingTextResponse } from "ai";
import { Replicate } from "langchain/llms/replicate";
import { CallbackManager } from "langchain/callbacks";

export async function POST(request: Request,
    { params }: { params: { chatId: string } }
) {
    try {
        const { prompt } = await request.json();
        const user = await currentUser();

        if (!user || !user.firstName || !user.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const identifier = `${request.url}-${user.id}`;
        const { success } = await rateLimit(identifier);

        if (!success) {
            return new NextResponse("Rate limit exceeded", { status: 429 });
        }

        const companion = await prismadb.companion.update({
            where: {
                id: params.chatId,
            },
            data: {
                messages: {
                    create: {
                        content: prompt,
                        role: "user",
                        userId: user.id
                    }
                }
            }
        });

        if (!companion) {
            return new NextResponse("Companion not found", { status: 404 });
        }

        const companion_file_name = `${companion.id}.txt`;

        const companionKey = {
            companionName: companion.id,
            userId: user.id,
            modelName: 'llama2-13b'
        };

        const memoryManager = await MemoryManager.getInstance();

        const records = await memoryManager.readLatestHistory(companionKey);

        if (records.length === 0) {
            await memoryManager.seedChatHistory(companion.seed, "\n\n", companionKey);
        }

        await memoryManager.writeToHistory(`User: ${prompt}\n`, companionKey);

        // Query Pinecone
        const recentChatHistory = await memoryManager.readLatestHistory(companionKey);

        const similarDocs = await memoryManager.vectorSearch(recentChatHistory, companion_file_name);

        let relevantHistory = "";

        if (similarDocs && similarDocs.length !== 0) {
            relevantHistory = similarDocs.map(doc => doc.pageContent).join("\n");
        }

        const { handlers } = LangChainStream();

        // Call Replicate for inference
        const model = new Replicate({
            model: "a16z-infra/llama-2-13b-chat:df7690f1994d94e96ad9d568eac121aecf50684a0b0963b25a41cc40061269e5",
            input: {
                max_length: 2048,
            },
            apiKey: process.env.REPLICATE_API_TOKEN,
            callbackManager: CallbackManager.fromHandlers(handlers),
        });

        // Turn verbose on for debugging
        model.verbose = true;

        const response = await model
            .call(`
                  ONLY generate plain sentences without prefix of who is speaking. DO NOT use ${companion.name}: prefix. 

                 ${companion.instructions}

                  Below are relevant details about ${companion.name}'s past and the conversation you are in.
                  ${relevantHistory}


                  ${recentChatHistory}\n${companion.name}:`
            )
            .catch(console.error);

        const cleaned = response?.replaceAll(",", "");
        const chunks = cleaned?.split("\n");
        const responseBody = chunks?.[0];
        await memoryManager.writeToHistory("" + responseBody?.trim(), companionKey);
        var Readable = require('stream').Readable;

        let s = new Readable();
        s.push(responseBody);
        s.push(null)

        if (responseBody && responseBody.length > 1) {
            await memoryManager.writeToHistory(`${responseBody.trim()}`, companionKey);

            await prismadb.companion.update({
                where: {
                    id: params.chatId,
                },
                data: {
                    messages: {
                        create: {
                            content: responseBody.trim(),
                            role: 'system',
                            userId: user.id
                        }
                    }
                }
            });
        }

      return  new StreamingTextResponse(s);
    } catch (error) {
        console.log("[CHAT_POST]", error);
        return new NextResponse("Internal Server", { status: 500 });
    }
}
