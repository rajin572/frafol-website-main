import Container from "@/components/ui/Container";
import BrowseHeaderSkeleton from "@/components/ui/Skeletons/BrowseHeaderSkeleton";
import ProfessionalsCardSkeleton from "@/components/ui/Skeletons/ProfessionalsCardSkeleton";

const SkeletonLoader = () => {
  return (
    <div className="min-h-screen pb-20">
      <BrowseHeaderSkeleton banner />
      <Container>
        <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="h-12 w-52 animate-pulse rounded-xl bg-base-color/10" />
          <div className="h-11 w-full animate-pulse rounded-lg bg-base-color/10 md:w-[28rem]" />
        </div>
        <div className="mt-8">
          <ProfessionalsCardSkeleton />
        </div>
      </Container>
    </div>
  );
};

export default SkeletonLoader;
