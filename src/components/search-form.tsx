'use client';

import React, {ChangeEvent, useState} from "react";
import {useRouter} from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";

export default function SearchForm() {
    const [searchText, setSearchText] = useState<string>("");
    const router: AppRouterInstance = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!searchText) return;

        router.push(`/events/${searchText}`);
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full sm:w-[580px]">
            <input
                className="w-full h-16 rounded-lg bg-white/[7%] px-6 outline-none ring-accent/50 transition focus:ring-2 focus:bg-white/10"
                type="text"
                placeholder="Search events in any city"
                value={searchText}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)}
                spellCheck={false}/>
        </form>
    )
}