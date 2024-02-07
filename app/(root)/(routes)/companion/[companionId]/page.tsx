import prismadb from "@/prisma/primsadb"
import { CompanionForm } from "./components/companion-form"

interface companionPageProps {
    params: {
        companionId: string
    }
}

const CompanionPage = async ({ params }: companionPageProps) => {
    //TODO: Check subscription
    const companion = await prismadb.companion.findUnique({
        where: {
            id: params.companionId
        }
    })
    const categories = await prismadb.category.findMany();

    return <CompanionForm
        initialData={companion}
        categories={categories}
    /> 
}

export default CompanionPage