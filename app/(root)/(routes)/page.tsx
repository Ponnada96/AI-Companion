import Categories from "@/components/categories";
import { SearchInput } from "@/components/search-input";
import prisma from "@/prisma/primsadb";

const RootPage = async () => {
    const categoires = await prisma.category.findMany();
    return (
        <div className="h-full p-4 space-y-2">
            <SearchInput />
            <Categories data={categoires} />
        </div>
    );
}

export default RootPage;