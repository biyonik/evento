'use client'

import Link from "next/link";
import Logo from "@/components/logo";
import {usePathname} from "next/navigation";
import {motion} from 'framer-motion';
import {cn} from "@/lib/utils";

type RouteType = {
    name: string;
    path: string;
}

const routes: RouteType[] = [
    {
        name: "Home",
        path: "/"
    },
    {
        name: "All Events",
        path: "/events"
    }
]

export default function Header() {
    const activePathname: string = usePathname();
    return (
        <header className="flex items-center justify-between border-b border-white/10 h-14 px-3 sm:px-9">
            <Logo/>
            <nav>
                <ul className="flex gap-x-6 text-sm">
                    {routes.map((route: RouteType) => (
                        <li key={route.path} className={
                            cn("hover:text-white flex items-center relative transition", {
                                "text-white": activePathname === route.path,
                                "text-white/50": activePathname !== route.path
                            })
                        }>
                            <Link href={route.path}>{route.name}</Link>
                            {
                                activePathname === route.path && (
                                    <motion.div
                                        layoutId="header-active-link"
                                        className="bg-accent h-1 w-full absolute bottom-0"></motion.div>
                                )
                            }

                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    )
}