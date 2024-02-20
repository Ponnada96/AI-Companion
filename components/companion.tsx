import { Companion } from "@prisma/client";
import Image from "next/image";
import {
    Card,
    CardFooter,
    CardHeader,
} from "@/components/ui/card"
import Link from "next/link";
import { MessageSquare } from "lucide-react";

interface companionProps {
    data: (Companion & {
        _count: {
            messages: number
        }
    })[]
}

const Companion = ({ data }: companionProps) => {

    if (data.length === 0) {
        return (
            <div className="flex flex-col pt-10 items-center justify-center">
                <div className="relative w-60 h-60">
                    <Image
                        fill
                        alt="empty"
                        className="grayscale"
                        src="/empty.png"
                    />
                </div>
                <p className="text-sm text-muted-foreground">No companions found</p>
            </div>
        )
    }
    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 pb-10">
            {
                data.map((item) => (
                    <Card
                        key={item.id}
                        className="bg-primary/10 rounded-xl 
                        cursor-pointer hover:opacity-75 transition border-0"
                    >
                        <Link href={`/chat/${item.id}`} className="flex flex-1 h-[300px]  flex-col justify-between">
                            <CardHeader className="flex items-center justify-center 
                                           text-center text-muted-foreground">
                                <div className="relative w-32 h-32">
                                    <Image
                                        fill
                                        src={item.src}
                                        alt="companion"
                                        className="rounded-xl object-cover"
                                    />
                                </div>
                                <p className="font-bold">
                                    {item.name}
                                </p>
                                <p className="text-sm">
                                    {item.description}
                                </p>
                            </CardHeader>
                            <CardFooter className="flex  items-center text-xs
                              justify-between text-muted-foreground">
                                <p>@{item.userName}</p>
                                <div className="flex items-center">
                                    <MessageSquare className="w-4 h-4 mr-1"/>
                                    {item._count.messages}
                                </div>
                            </CardFooter>
                        </Link>
                    </Card>
                ))
            }
        </div>
    )
}
export default Companion;