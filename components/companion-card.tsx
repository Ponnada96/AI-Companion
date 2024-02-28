import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Companion } from "@prisma/client";
import { auth } from "@clerk/nextjs";

interface CompanionCardProps {
    item: (Companion & {
        _count: {
            messages: number
        }
    })
}

const CompanionCard = ({ item }: CompanionCardProps) => {

    const { userId } = auth()

    const isUserLoggedin = () => {
        return !!userId;
    }

    return (
        <Card
            className="bg-primary/10 rounded-xl 
                        cursor-pointer hover:opacity-75 transition border-0"
        >
            <Link href={isUserLoggedin() ? ` /chat/${item.id}` : '/sign-in'} className="flex flex-1 h-[300px]  flex-col justify-between">
                <CardHeader className="flex items-center justify-center 
                                           text-center text-muted-foreground">
                    <div className="relative w-32 min-h-32">
                        <Image
                            width={128}
                            height={128}
                            src={item.src}
                            alt="companion"
                            className="rounded-xl object-cover max-h-32"
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
                        <MessageSquare className="w-4 h-4 mr-1" />
                        {item._count.messages}
                    </div>
                </CardFooter>
            </Link>
        </Card>
    );
}

export default CompanionCard;