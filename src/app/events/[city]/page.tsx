import H1 from "@/components/header-one";
import EventsList from "@/components/events-list";
import {Suspense} from "react";
import Loading from "@/app/events/loading";

interface CityEventsPageProps {
    params: Promise<{
        city: string
    }>
}

export async function generateMetadata({params}: CityEventsPageProps) {
    const {city} = await params;
    const capitalizedCityName: string = city.charAt(0).toUpperCase() + city.slice(1);

    return {
        title: `Events in ${capitalizedCityName}`
    };
}

export default async function CityEventsPage({params}: CityEventsPageProps) {
    const {city} = await params;
    const capitalizedCityName: string = city.charAt(0).toUpperCase() + city.slice(1);

    return (
        <main className="flex flex-col items-center py-24 px-[20px] min-h-[110vh]">
            <H1 className="mb-5">Events in {capitalizedCityName}</H1>

            <Suspense fallback={<Loading/>}>
                <EventsList city={city}/>
            </Suspense>
        </main>
    )
}