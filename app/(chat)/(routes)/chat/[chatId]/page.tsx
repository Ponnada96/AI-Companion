import { auth, redirectToSignIn } from "@clerk/nextjs"
import prismadb from "@/lib/primsadb"
import { redirect } from "next/navigation"
import { ChatClient } from "./components/client"

interface ChatIdProps {
    params: {
        chatId: string
    }
}

const ChatIdPage = async ({ params }: ChatIdProps) => {
    const { userId } = auth()
    if (!userId) {
        return redirectToSignIn()
    }
    const companion = await prismadb.companion.findUnique({
        where: {
            id: params.chatId
        },
        include: {
            messages: {
                orderBy: {
                    createdAt: 'asc'
                },
                where: {
                    userId
                }
            },
            _count: {
                select: {
                    messages: true
                }
            }
        }
    })
    if (!companion) {
        redirect('/')
    }
    return <ChatClient companion={companion} />
}
export default ChatIdPage;