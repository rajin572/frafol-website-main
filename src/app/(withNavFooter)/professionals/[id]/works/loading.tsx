import Container from "@/components/ui/Container";

// Full portfolio skeleton: "Späť" link, then the photos block.
const SkeletonLoader = () => {
  return (
    <div className="min-h-screen pb-20 pt-10">
      <Container>
        <div className="my-12 h-6 w-20 animate-pulse rounded bg-gray-200" />
        <div className="overflow-hidden rounded-xl border border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="h-6 w-40 animate-pulse rounded bg-gray-200" />
            <div className="size-6 animate-pulse rounded bg-gray-200" />
          </div>
          <div className="grid grid-cols-1 gap-2.5 p-6 pt-8 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 animate-pulse rounded-lg bg-gray-200" />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SkeletonLoader;
