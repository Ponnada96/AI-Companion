import { UserButton } from "@clerk/nextjs";
import {  Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggler";
import { MobileNav } from "./mobile-nav";

const NavBar = () => {
    return (
    <div className="w-full z-50 flex justify-between items-center 
                    fixed bg-secondary border-b border-primary/10 px-4 py-2 h-16">
       <div className="flex items-center">
                <MobileNav/>
                <Link href={"/"}>
                    <h1 className="hidden md:block text-xl md:text-3xl font-bold text-primary">
                        companion.ai
                    </h1>
                </Link>
               
       </div>
        <div className="flex gap-x-3 items-center">
            <Button variant={'premiun'} size={"sm"}>
                Subscribe
                <Sparkles className="h-4 w-4 fill-white ml-2 text-white"/>
            </Button>
                <ModeToggle/>
            <UserButton afterSignOutUrl="/" />
        </div>
    </div>);
}

export default NavBar;