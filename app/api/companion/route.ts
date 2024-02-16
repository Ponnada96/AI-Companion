import { currentUser } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import prismadb from "@/lib/primsadb"
import { checkSubscription } from "@/lib/subscription"

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const user = await currentUser()
        const { src, name, description, instructions, seed, categoryId } = body;

        //TODO: Try ZOD for validation
        if (!user || !user.id || !user.firstName) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        if (!src || !description || !name || !instructions || !seed || !categoryId) {
            return new NextResponse("Missing required fields", { status: 400 })
        }

        const isUserSubscriped = await checkSubscription();
        if (!isUserSubscriped) {
            return new NextResponse("Pro Subscription required", { status: 403 })
        }

        const companion = await prismadb.companion.create({
            data: {
                userId: user.id,
                userName: user.firstName,
                categoryId,
                name,
                src,
                instructions,
                seed,
                description
            }
        })

        return NextResponse.json(companion);
    }
    catch (error) {
        console.log("[COMPANION_POST]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}