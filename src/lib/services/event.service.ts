import {EVENTS_API_URL} from "@/lib/api";
import {Event} from "@/lib/models/event.model";

export class EventService {
    constructor() {
    }

    async getAll() {
        try {
            const response: Response = await fetch(EVENTS_API_URL!)
            if (!response.ok) {
                throw new Error("Events fetch all operation failed!")
            }
            const events: Event[] = await response.json();
            return events;
        } catch (error) {
            throw error
        }
    }

    async getByCityName(cityName: string) {
        try {
            const response: Response = await fetch(`${EVENTS_API_URL!}?city=${cityName}`)
            if (!response.ok) {
                throw new Error("Events fetch all operation failed!")
            }
            const events: Event[] = await response.json();
            return events;
        } catch (error) {
            throw error
        }
    }

    async getBySlug(slug: string): Promise<Event> {
        try {
            const response: Response = await fetch(`${EVENTS_API_URL!}/${slug}`)
            if (!response.ok) throw new Error("Event not found!")
            return await response.json();
        } catch (error) {
            throw error;
        }
    }

    async getById(id: number) {
        const events = await this.getAll();
        return events.find((event: Event) => event.id === id);
    }
}

export const eventService: EventService = new EventService();