import Link from "next/link";
import {cn} from "@/lib/utils";

type PaginationControlsProps = {
    currentPage?: number;
    totalPages?: number;
}

export default function PaginationControls({currentPage = 1, totalPages = 1}: PaginationControlsProps) {
    return (
        <section className="flex justify-center items-center w-full mt-10">
            <Link href={
                currentPage > 1 ? `?page=${currentPage - 1}` : "#"
            } className={cn(
                "px-4 py-2 bg-gray-800 text-accent rounded-md hover:bg-accent hover:text-gray-800 transition-colors",
                currentPage === 1 ? "cursor-not-allowed opacity-50" : "",
                currentPage === 1 ? "pointer-events-none" : "",
                currentPage === 1 ? "disabled" : ""
            )}
                  aria-disabled={currentPage === 1 ? "true" : "false"}
            >
                Previous
            </Link>
            <span className="mx-4">Page {currentPage} of {totalPages}</span>
            <Link href={
                currentPage < totalPages ? `?page=${currentPage + 1}` : "#"
            } className={
                cn("px-4 py-2 bg-gray-800 text-accent rounded-md hover:bg-accent hover:text-gray-800 transition-colors",
                    currentPage === totalPages ? "cursor-not-allowed opacity-50" : "",
                    currentPage === totalPages ? "pointer-events-none" : "",
                    currentPage === totalPages ? "disabled" : "")
            }
                  aria-disabled={currentPage === totalPages ? "true" : "false"}
            >
                Next
            </Link>
        </section>
    );
}