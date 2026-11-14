import Container from "@/components/ui/Container";
import BrowseHeaderSkeleton from "@/components/ui/Skeletons/BrowseHeaderSkeleton";
import WorkshopCardSkeleton from "@/components/ui/Skeletons/WorkshopCardSkeleton";

const SkeletonLoader = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <BrowseHeaderSkeleton banner />
      <Container>
        <div className="py-12 sm:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {[...Array(3)].map((_, index) => (
            <WorkshopCardSkeleton key={index} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default SkeletonLoader;
