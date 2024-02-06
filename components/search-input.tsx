"use client"

import { Search } from "lucide-react"
import { Input } from "./ui/input"
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ChangeEventHandler, useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import qs from "query-string";

export const SearchInput = () => {

    const router = useRouter();
    const searchParams = useSearchParams();

    const categoryId = searchParams.get("categoryId");
    const name = searchParams.get("name");

    const [value, setValue] = useState(name || "")
    const debounceValue = useDebounce<string>(value, 500)

    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setValue(e.target.value)
    }

    useEffect(() => {
        const query = {
            name: debounceValue,
            categoryId: categoryId
        };
        const url = qs.stringifyUrl(
            {
                url: window.location.href,
                query
            },
            {
                skipEmptyString: true,
                skipNull: true
            }
        )
        router.push(url)
    }, [debounceValue, router, categoryId])

    return (
        <div className="relative">
            <Search className="absolute h-4 w-4 top-3 left-3 text-muted-foreground" />
            <Input className="bg-primary/10 pl-10" placeholder="Search..." onChange={onChange} />
        </div>
    )
}