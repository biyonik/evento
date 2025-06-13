import H1 from "@/components/header-one";
import EventsList from "@/components/events-list";

export default async function EventsPage() {

    return (
        <main className="flex flex-col items-center py-24 px-[20px] min-h-[110vh]">
            <H1 className="mb-5">All Events</H1>

            <EventsList/>
        </main>
    )
}