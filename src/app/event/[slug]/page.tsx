import {eventService} from "@/lib/services/event.service";
import Image from "next/image";
import H1 from "@/components/header-one";
import React from "react";
import {cn} from "@/lib/utils";
import {Event} from "@/generated/prisma/client";

interface EventFromSlugPageProps {
    params: Promise<{
        slug: string
    }>
}

export async function generateMetadata({params}: EventFromSlugPageProps) {
    const {slug} = await params;
    const event: Event|null = await eventService.getBySlug(slug);

    return {
        title: event ? event.name : "Event Not Found",
    };
}

export default async function EventFromSlugPage({params}: EventFromSlugPageProps) {
    const {slug} = await params;
    const event: Event|null = await eventService.getBySlug(slug);

    if (!event) {
        return <div className="text-center py-20">Event not found</div>;
    }

    return (
        <main>
            <section className="relative overflow-hidden flex justify-center items-center py-14 md:py-20">
                <Image src={event.imageUrl!}
                       alt={event.name}
                       fill
                       sizes="(max-width: 1280px) 100vw, 1280px"
                       className="object-cover z-0 blur-3xl"
                       quality={50}
                       priority={true}
                />
                <div className="z-10 relative flex flex-col gap-6 lg:gap-16 lg:flex-row">

                    <Image src={event.imageUrl!}
                           alt={event.name}
                           width={300}
                           height={201}
                           className="rounded-xl border-2 border-white/50 object-cover"
                    />

                    <div className="flex flex-col">
                        <p className="text-white/75">
                            {
                                new Date(event.date).toLocaleDateString("en-US", {
                                    weekday: "long",
                                    month: "long",
                                    day: "numeric"
                                })
                            }
                        </p>
                        <H1 className="mb-2 mt-1 whitespace-nowrap lg:text-5xl">{event.name}</H1>
                        <p className="whitespace-nowrap text-xl text-white/75">Organized by <span
                            className="italic">{event.organizerName}</span></p>
                        <button
                            className="text-lg bg-white/20 capitalize bg-blur lg:mt-auto mt-5 w-[95vw] rounded-md border-white/10 border-2 sm:w-full py-2 state-effects">Get
                            Tickets
                        </button>
                    </div>
                </div>
            </section>

            <div className="min-h-[75vh] text-center px-5 py-16">
                <Section id="about_section" className="mb-20">
                    <SectionHeading>About this event</SectionHeading>
                    <SectionContent>{event.description}</SectionContent>
                </Section>

                <Section id="location_section">
                    <SectionHeading>Location</SectionHeading>
                    <SectionContent>{event.location}</SectionContent>
                </Section>
            </div>
        </main>
    )
}

type SectionProps = {
    children: React.ReactNode;
    id?: string;
    className?: string
}

function Section({children, id, className}: SectionProps) {
    return <section id={id} className={cn(className)}>{children}</section>
}

function SectionHeading({children}: { children: React.ReactNode }) {
    return <h2 className="text-2xl mb-8">{children}</h2>
}

function SectionContent({children}: { children: React.ReactNode }) {
    return <p className="text-lg leading-8 text-white/75 max-w-4xl mx-auto">{children}</p>
}