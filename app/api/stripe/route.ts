import { absoluteUrl } from "@/lib/utils";
import { currentUser, useAuth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import prismadb from '@/prisma/primsadb'
import { stripe } from "@/lib/stripe";

const settingUrl = absoluteUrl("/settings");

export async function GET() {
    try {
        const { userId } = useAuth();
        const user = await currentUser();
        if (!userId || !user) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const userSubscription = await prismadb.userSubscription.findUnique({
            where: {
                userId
            }
        })

        if (userSubscription && userSubscription.stripeCustomerId) {

            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: userSubscription.stripeCustomerId,
                return_url: settingUrl
            })
            return new NextResponse(JSON.stringify({ url: stripeSession.url }))
        }

    }
    catch (error) {
        console.log("[STRIPE_GET]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}