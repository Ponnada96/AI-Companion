'use client'

import { SignedIn, SignedOut, UserButton, useAuth } from "@clerk/nextjs";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggler";
import { MobileNav } from "./mobile-nav";
import { useProModal } from "@/hooks/use-pro-modal";
import Image from "next/image";
import logo from '@/public/ai.png';
interface NavBarProps {
    isPro: boolean
}

const NavBar = ({ isPro }: NavBarProps) => {

    const promodal = useProModal();
    const { isSignedIn } = useAuth();

    return (
        <div className="w-full z-50 flex justify-between items-center 
                    fixed bg-secondary border-b border-primary/10 px-4 py-2 h-16">
            <div className="flex items-center">
                <MobileNav isPro={isPro} />
                <Link href={"/"} className="flex items-center">
                    <Image src={logo} className="mr-2 hidden sm:block" width={42} height={42} alt="title" />
                    <h1 className="hidden sm:block text-xl md:text-3xl font-bold text-primary">
                        companion.ai
                    </h1>
                </Link>

            </div>
            <div className="flex gap-x-3 items-center">
                {isSignedIn && !isPro && (
                    <Button variant={'premiun'}
                        size={"sm"}
                        onClick={promodal.onOpen}
                    >
                        Upgrade
                        <Sparkles className="h-4 w-4 fill-white ml-2 text-white" />
                    </Button>
                )}
                <ModeToggle />
                <SignedIn>
                    <UserButton afterSignOutUrl="/" />
                </SignedIn>
                <SignedOut>
                    <Button asChild className="rounded-full bg-gradient-to-r from-sky-500  to-cyan-500 text-white border-0" size="sm">
                        <Link href="/sign-in">
                            Login
                        </Link>
                    </Button>
                </SignedOut>
            </div>
        </div>);
}

export default NavBar;