import Container from "@/components/ui/Container";
import BrowseHeaderSkeleton from "@/components/ui/Skeletons/BrowseHeaderSkeleton";
import CategoryCardSkeleton from "@/components/ui/Skeletons/CategoryCardSkeleton";

const SkeletonLoader = () => {
  return (
    <div className="min-h-screen">
      <BrowseHeaderSkeleton />
      <Container>
        <div className="py-12 sm:py-16">
          <CategoryCardSkeleton />
        </div>
      </Container>
    </div>
  );
};

export default SkeletonLoader;
