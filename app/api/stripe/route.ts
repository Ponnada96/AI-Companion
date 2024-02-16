import { absoluteUrl } from "@/lib/utils";
import { auth, currentUser, useAuth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import prismadb from '@/lib/primsadb'
import { stripe } from "@/lib/stripe";

const settingUrl = absoluteUrl("/settings");

export async function GET() {
    try {
        const { userId } = auth();
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

        const stripeSession = await stripe.checkout.sessions.create({
            success_url: settingUrl,
            cancel_url: settingUrl,
            payment_method_types: ["card"],
            mode: 'subscription', 
            billing_address_collection: 'auto',
            customer_email: user.emailAddresses[0].emailAddress,
            line_items: [
                {
                    price_data: {
                        currency: "USD",
                        product_data: {
                            name: "Companion Pro",
                            description: "Create Custom AI Companion"
                        },
                        unit_amount: 999,
                        recurring:{
                            interval: 'month'
                        }
                    },
                    quantity: 1
                }
            ],
            metadata:{
                userId
            }
        });

        return new NextResponse(JSON.stringify({ url: stripeSession.url }))

    }
    catch (error) {
        console.log("[STRIPE_GET]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}