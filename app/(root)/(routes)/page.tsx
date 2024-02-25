import Categories from "@/components/categories";
import Companion from "@/components/companion";
import CompanionSkeleton from "@/components/skeleton-ui/companions-skeleton";
import { SearchInput } from "@/components/search-input";
import prismadb from "@/lib/primsadb";
import { Suspense } from "react";

interface rootPageProps {
    searchParams: {
        categoryId: string,
        name: string
    }
}

const RootPage = async ({ searchParams }: rootPageProps) => {

    const categoires = await prismadb.category.findMany({});

    return (
        <div className="h-full p-4 space-y-2">
            <SearchInput />
            <Categories data={categoires} />
            <Suspense fallback={<CompanionSkeleton />}>
                <Companion searchParams={searchParams} />
            </Suspense>
        </div>
    );
}

export default RootPage;