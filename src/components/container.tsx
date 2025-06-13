import React from "react";

interface ContainerProps {
    children?: Readonly<React.ReactNode>
}

export default function Container({children}: ContainerProps) {
    return (
        <div className="flex flex-col max-w-7xl min-h-screen mx-auto bg-white/[2%]">
            {children}
        </div>
    )
}