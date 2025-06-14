"use client"; // Error components must be Client Components


import H1 from "@/components/header-one";
import {useEffect} from "react";

type ErrorProps = {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function Error({
                                  error,
                                  reset,
                              }: ErrorProps) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <main className="text-center py-24">
            <H1>{error.message}</H1>
            <button
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    reset
                }
            >
                Try again
            </button>
        </main>
    );
}