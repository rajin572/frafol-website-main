import Container from "@/components/ui/Container";
import ProfessionalsCardSkeleton from "@/components/ui/Skeletons/ProfessionalsCardSkeleton";

const SkeletonLoader = () => {
  return (
    <div className="min-h-screen pb-20">
      {/* Same centred band as BrowseHeader (title + intro, no search) */}
      <section className="border-b border-base-color/10 bg-[#fbf7f4]">
        <Container>
          <div className="mx-auto flex max-w-3xl flex-col items-center py-14 sm:py-20">
            <div className="h-11 w-3/4 animate-pulse rounded-md bg-base-color/10" />
            <div className="mt-6 h-4 w-full max-w-xl animate-pulse rounded bg-base-color/10" />
            <div className="mt-2.5 h-4 w-2/3 max-w-md animate-pulse rounded bg-base-color/10" />
          </div>
        </Container>
      </section>
      <Container>
        {/* Tabs + search/filter */}
        <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="h-12 w-full max-w-md animate-pulse rounded-xl bg-base-color/10" />
          <div className="h-12 w-full animate-pulse rounded-xl bg-base-color/10 md:w-[28rem]" />
        </div>
        <div className="mt-8">
          <ProfessionalsCardSkeleton />
        </div>
      </Container>
    </div>
  );
};

export default SkeletonLoader;
