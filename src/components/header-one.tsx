import React from "react";
import {cn} from "@/lib/utils";

interface H1Props {
    children?: Readonly<React.ReactNode>,
    className?: string | undefined;
}

export default function H1({children, className}: H1Props) {
    return <h1 className={cn("text-3xl lg:text-6xl font-bold tracking-tight", className)}>
        {children}
    </h1>
}