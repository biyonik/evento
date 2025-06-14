import {Event} from "@/generated/prisma/client";
import EventCard from "@/components/event-card";
import {eventService} from "@/lib/services/event.service";
import PaginationControls from "@/components/pagination-controls";

type EventsListProps = {
    city?: string,
    page?: number
}

export default async function EventsList({city, page}: EventsListProps) {
    const result = city
        ? await eventService.getByCityName(city, page)
        : await eventService.getAll(page);


    return <section className="max-w-[1100px] flex flex-wrap gap-10 justify-center px-[20px]">
        {
            result.events.map((event: Event) => (
                <EventCard event={event} key={event.id}/>
            ))
        }
        <PaginationControls currentPage={result.currentPage} totalPages={result.totalPages} />
    </section>;
}