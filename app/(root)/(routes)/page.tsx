import Categories from "@/components/categories";
import Companion from "@/components/companion";
import { SearchInput } from "@/components/search-input";
import prismadb from "@/prisma/primsadb";

interface rootPageProps {
    searchParams: {
        categoryId: string,
        name: string
    }
}

const RootPage = async ({ searchParams }: rootPageProps) => {

    const data = await prismadb.companion.findMany({
        where:{
            categoryId: searchParams?.categoryId,
            name:{
                search: searchParams?.name
            }
        },
        orderBy:{
            createdAt:'desc'
        },
        include:{
            _count:{
                select:{
                    messages: true
                }
            }
        }
    })

    const categoires = await prismadb.category.findMany();

    return (
        <div className="h-full p-4 space-y-2">
            <SearchInput />
            <Categories data={categoires} />
            <Companion data={data}/>
        </div>
    );
}

export default RootPage;