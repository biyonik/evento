import H1 from "@/components/header-one";
import EventsList from "@/components/events-list";
import {Suspense} from "react";
import Loading from "@/app/events/loading";

interface EventsPageProps {
    searchParams: Promise<{
        page?: string
    }>
}

export default async function EventsPage({searchParams}: EventsPageProps) {
    const resolvedSearchParams: { page?: string | undefined } = await searchParams;
    const page: string = resolvedSearchParams?.page || "1";

    return (
        <main className="flex flex-col items-center py-24 px-[20px] min-h-[110vh]">
            <H1 className="mb-5">All Events</H1>

            <Suspense key={page} fallback={<Loading/>}>
                <EventsList page={page} />
            </Suspense>
        </main>
    )
}