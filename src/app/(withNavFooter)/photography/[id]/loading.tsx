import Container from "@/components/ui/Container";
import ProfessionalsCardSkeleton from "@/components/ui/Skeletons/ProfessionalsCardSkeleton";
import SearchSkeleton from "@/components/ui/Skeletons/SearchSkeleton";
import SectionBannerSkeleton from "@/components/ui/Skeletons/SectionBannerSkeleton";

const SkeletonLoader = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <SectionBannerSkeleton />
      <Container>
        <div className="pt-10">
          <div className="flex justify-between mb-3 mt-16">
            <div className="flex justify-baseline items-center gap-5 py-3 px-2 bg-gray-200 animate-pulse rounded-lg overflow-hidden w-60 lg:w-80"></div>
            <SearchSkeleton />
          </div>

          {/* Grid Skeleton */}
          <div className="py-10">
            <ProfessionalsCardSkeleton />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SkeletonLoader;
