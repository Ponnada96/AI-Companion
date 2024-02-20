import Image from "next/image";
import prismadb from "@/lib/primsadb";
import CompanionCard from "./companion-card";

interface CompanionProps {
    searchParams: {
        categoryId: string,
        name: string
    }
}

const Companion = async ({ searchParams }: CompanionProps) => {

    const data = await prismadb.companion.findMany({
        where: {
            categoryId: searchParams?.categoryId,
            name: {
                search: searchParams?.name
            }
        },
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            _count: {
                select: {
                    messages: true
                }
            }
        }
    })

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
                    <CompanionCard key={item.id} item={item} />
                ))
            }
        </div>
    )
}
export default Companion;