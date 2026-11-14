import Container from "@/components/ui/Container";
import ProductCardSkeleton from "@/components/ui/Skeletons/ProductCardSkeleton";
import SectionBannerSkeleton from "@/components/ui/Skeletons/SectionBannerSkeleton";

const SkeletonLoader = () => {
  return (
    <div className="flex flex-col min-h-screen pb-20">
      <SectionBannerSkeleton />
      <Container>
        <div className="mt-16 sm:mt-20">
          {/* Centred title + description */}
          <div className="mx-auto mb-4 h-10 w-40 animate-pulse rounded bg-gray-200" />
          <div className="mx-auto h-5 w-2/3 max-w-xl animate-pulse rounded bg-gray-200" />

          {/* Category chips */}
          <div className="mt-12 flex flex-wrap gap-2.5">
            {[24, 32, 28, 36, 24].map((w, i) => (
              <div key={i} className="h-10 animate-pulse rounded-lg bg-gray-200" style={{ width: `${w * 4}px` }} />
            ))}
          </div>

          {/* Search + filter on the right */}
          <div className="mt-8 flex justify-end">
            <div className="flex w-full gap-2 md:w-[28rem]">
              <div className="h-12 flex-1 animate-pulse rounded-xl bg-gray-200" />
              <div className="h-12 w-12 animate-pulse rounded-xl bg-gray-200" />
            </div>
          </div>

          {/* Grid Skeleton */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
            {[...Array(4)].map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SkeletonLoader;
