import {Event} from "@/lib/models/event.model";
import EventCard from "@/components/event-card";
import {eventService} from "@/lib/services/event.service";

type EventsListProps = {
    city?: string
}

export default async function EventsList({city}: EventsListProps) {
    const events: Event[] = city
        ? await eventService.getByCityName(city)
        : await eventService.getAll();

    return <section className="max-w-[1100px] flex flex-wrap gap-10 justify-center px-[20px]">
        {
            events.map((event: Event) => (
                <EventCard event={event} key={event.id}/>
            ))
        }
    </section>;
}