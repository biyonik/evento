import H1 from "@/components/header-one";
import EventsList from "@/components/events-list";
import {Suspense} from "react";
import Loading from "@/app/events/loading";
import {z} from "zod";

interface CityEventsPageProps {
    params: Promise<{
        city: string
    }>
}

type CityEventsPagePropsWithSearch = {
    params: Promise<{
        city: string
    }>
    searchParams: Promise<{
        page?: string
    }>
}

export async function generateMetadata({params}: CityEventsPageProps) {
    const {city} = await params;
    const capitalizedCityName: string = city.charAt(0).toUpperCase() + city.slice(1);
    return {
        title: `Events in ${capitalizedCityName}`
    };
}

const pageNumberSchema = z.coerce.number().int().positive().optional();

export default async function CityEventsPage({params, searchParams}: CityEventsPagePropsWithSearch) {
    const {city}: { city: string } = await params;
    const searchParamsData: { page?: string | undefined } = await searchParams;
    const page: string = searchParamsData?.page || "1";
    const parsedPage = pageNumberSchema.safeParse(page);
    const capitalizedCityName: string = city.charAt(0).toUpperCase() + city.slice(1);

    return (
        <main className="flex flex-col items-center py-24 px-[20px] min-h-[110vh]">
            <H1 className="mb-5">Events in {capitalizedCityName}</H1>

            <Suspense key={city + page} fallback={<Loading/>}>
                <EventsList city={city} page={parsedPage.data}/>
            </Suspense>
        </main>
    )
}