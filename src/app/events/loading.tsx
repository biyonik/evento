import SkeletonCard from "@/components/skeleton-card";

export default function Loading() {
    return <div className="flex flex-wrap justify-center max-w-[1100px] mx-auto px-[20px] py-24 gap-20">
        {
            Array.from({length: 12}).map((_: unknown, i: number) => (
                <SkeletonCard key={i}/>
            ))
        }
    </div>
}