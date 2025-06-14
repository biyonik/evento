import H1 from "@/components/header-one";
import EventsList from "@/components/events-list";
import {Suspense} from "react";
import Loading from "@/app/events/loading";
import {z} from "zod";

interface EventsPageProps {
    searchParams: Promise<{
        page?: string
    }>
}

const pageNumberSchema = z.coerce.number().int().positive().optional();

export default async function EventsPage({searchParams}: EventsPageProps) {
    const resolvedSearchParams: { page?: string | undefined } = await searchParams;
    const page: string = resolvedSearchParams?.page || "1";
    const parsedPage = pageNumberSchema.safeParse(page);

    if (!parsedPage.success) {
        throw new Error("Invalid page number. It must be a positive integer.")
    }

    return (
        <main className="flex flex-col items-center py-24 px-[20px] min-h-[110vh]">
            <H1 className="mb-5">All Events</H1>

            <Suspense key={page} fallback={<Loading/>}>
                <EventsList page={parsedPage.data} />
            </Suspense>
        </main>
    )
}