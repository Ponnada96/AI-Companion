import prismadb from "@/lib/primsadb"
import { CompanionForm } from "./components/companion-form"
import { auth, redirectToSignIn } from "@clerk/nextjs"

interface companionPageProps {
    params: {
        companionId: string
    }
}

const CompanionPage = async ({ params }: companionPageProps) => {

    const { userId } = auth()
    if (!userId) {
        return redirectToSignIn
    }

    const companion = await prismadb.companion.findUnique({
        where: {
            id: params.companionId,
            userId
        }
    })

    const categories = await prismadb.category.findMany();

    return <CompanionForm
        initialData={companion}
        categories={categories}
    />
}

export default CompanionPage