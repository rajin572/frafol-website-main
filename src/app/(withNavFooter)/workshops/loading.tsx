import Container from "@/components/ui/Container";
import SearchSkeleton from "@/components/ui/Skeletons/SearchSkeleton";
import SectionBannerSkeleton from "@/components/ui/Skeletons/SectionBannerSkeleton";
import WorkshopCardSkeleton from "@/components/ui/Skeletons/WorkshopCardSkeleton";

const SkeletonLoader = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <SectionBannerSkeleton />
      <Container>
        <div className="pt-16">
          <div className="w-2/3 lg:w-1/3 h-8 bg-gray-200 animate-pulse rounded mb-6 text-center mx-auto"></div>
          <div className="w-1/2 h-6 bg-gray-200 animate-pulse rounded text-center mx-auto"></div>

          <div className="flex justify-end mb-3 mt-16">
            <SearchSkeleton />
          </div>

          {/* Grid Skeleton */}
          <div className="py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {[...Array(4)].map((_, index) => (
              <WorkshopCardSkeleton key={index} />
            ))}
          </div>
          {/* Footer Skeleton (if needed) */}
          <div className="w-48 h-12 bg-gray-300 animate-pulse rounded-lg my-16 mx-auto"></div>
        </div>
      </Container>
    </div>
  );
};

export default SkeletonLoader;
