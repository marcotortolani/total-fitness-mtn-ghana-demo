import LongCardSkeleton from "./LongCardSkeleton";
import ShortCardSkeleton from "./ShortCardSkeleton";

export default function SectionSkeleton() {
  return (
    <section className="w-full h-full md:w-5/6 lg:w-4/6 lg:max-w-[900px] px-4 flex flex-col gap-4 lg:gap-6">
      <LongCardSkeleton />
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 lg:gap-6">
        <ShortCardSkeleton />
        <ShortCardSkeleton />
      </div>
    </section>
  )
}
