import NavBar from "@/components/navbar";
import SideBar from "@/components/side-bar";
import { checkSubscription } from "@/lib/subscription";
import { StrictMode } from "react";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {

    const isUserSubscribed = await checkSubscription();

    return (
        <StrictMode>
            <div className="h-full">
                <NavBar isPro={isUserSubscribed} />
                <div className="hidden md:flex mt-16 w-20 flex-col fixed inset-y-0">
                    <SideBar isPro={isUserSubscribed} />
                </div>
                <main className="md:pl-20 pt-16 h-full">
                    {children}
                </main>
            </div>
        </StrictMode>
       
    )
}

export default RootLayout;