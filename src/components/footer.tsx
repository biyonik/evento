import Link from "next/link";

type RouteType = {
    name: string;
    path: string;
}

const routes: RouteType[] = [
    {
        name: "Terms & Conditions",
        path: "/terms-conditions"
    },
    {
        name: "Privacy Policy",
        path: "/privacy-policy"
    }
]
export default function Footer() {
    return (
        <footer
            className="mt-auto flex items-center justify-between h-16 border-t border-white/10 px-3 sm:px-9 text-xs text-white/25">
            <small className="text-xs">
                &copy; {new Date().getFullYear()} Biyonik. All rights reserved
            </small>

            <ul className="flex gap-x-3 sm:gap-x-8">
                {
                    routes.map((route: RouteType) => (
                        <li key={route.path} className={`text-white/50 hover:text-white transition`}>
                            <Link href={route.path}>{route.name}</Link>
                        </li>
                    ))
                }
            </ul>
        </footer>
    )
}