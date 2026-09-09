import Container from "@/components/ui/Container";
import ProfessionalsCardSkeleton from "@/components/ui/Skeletons/ProfessionalsCardSkeleton";
import SearchSkeleton from "@/components/ui/Skeletons/SearchSkeleton";

const SkeletonLoader = () => {
  return (
    <Container>
      <div className="flex flex-col py-20 min-h-screen">
        {/* Header Skeleton */}
        <div className="w-2/3 lg:w-1/3 h-8 bg-gray-200 animate-pulse rounded mb-6 text-center mx-auto"></div>
        <div className="w-1/2 h-6 bg-gray-200 animate-pulse rounded text-center mx-auto"></div>

        <div className="flex justify-end mb-3 mt-16">
          <SearchSkeleton />
        </div>

        {/* Grid Skeleton */}

        <ProfessionalsCardSkeleton />
        {/* Footer Skeleton (if needed) */}
        <div className="w-48 h-12 bg-gray-300 animate-pulse rounded-lg my-16 mx-auto"></div>
      </div>
    </Container>
  );
};

export default SkeletonLoader;
