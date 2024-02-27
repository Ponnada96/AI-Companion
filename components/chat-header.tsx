'use client'

import axios from "axios";
import { ChevronLeft, Edit, MessageSquare, MoreVertical, Trash } from "lucide-react";
import { Companion, Message } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { BotAvatar } from "./bot-avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useUser } from "@clerk/nextjs";
import { useToast } from "./ui/use-toast";


interface ChatHeaderProps {
    companion: Companion & {
        messages: Message[],
        _count: {
            messages: number
        }
    }
}

const ChatHeader = ({ companion }: ChatHeaderProps) => {
    const router = useRouter()
    const { user } = useUser()
    const { toast } = useToast()

    const onDelete = async () => {
        try {
            await axios.delete(`/api/companion/${companion.id}`);
            toast({
                description:'Success.'
            })
            router.push('/')
            router.refresh()
        }
        catch (error) {
            toast({
                description: "Something went wrong.",
                variant: 'destructive'
            })
        }
    }

    return (
        <div className="w-full flex justify-between items-center border-b border-primary/10 p-4">
            <div className="flex gap-x-2 items-center">
                <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => router.push('/')}>
                    <ChevronLeft className="h-8 w-8" />
                </Button>
                <BotAvatar src={companion.src} />
                <div className="flex flex-col gap-y-1 ">
                    <div className="flex items-center gap-x-2">
                        <p className="font-bold">
                            {companion.name}
                        </p>
                        <div className="flex items-center text-xs text-muted-foreground">
                            <MessageSquare className="w-3 h-3 mr-1" />
                            {companion._count.messages}
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        created by {companion.userName}
                    </p>
                </div>
            </div>
            {user?.id === companion.userId && (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button size={"icon"} variant="ghost">
                            <MoreVertical />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => router.push(`/companion/${companion.id}`)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => onDelete()}>
                            <Trash className="w-4 h-4 mr-2" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </div>
    )
}

export default ChatHeader;