import Container from "@/components/ui/Container";
import BrowseHeaderSkeleton from "@/components/ui/Skeletons/BrowseHeaderSkeleton";

// Forum list skeleton: banner, search + new post on top, then the full-width post feed.
const bar = "animate-pulse rounded bg-gray-200";

const SkeletonLoader = () => {
  return (
    <div className="flex min-h-screen flex-col pb-20">
      <BrowseHeaderSkeleton banner />
      <Container>
        <div className="mt-10 sm:mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="h-[3.25rem] w-full animate-pulse rounded-xl bg-gray-200 sm:max-w-md" />
          <div className="h-12 w-48 animate-pulse rounded-xl bg-gray-200" />
        </div>

        <div className="mt-8 space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-6 sm:gap-8 rounded-2xl border border-base-color/10 p-5 sm:p-7">
              <div className="flex-1">
                <div className="flex items-center gap-2.5">
                  <div className="size-7 animate-pulse rounded-full bg-gray-200" />
                  <div className={`h-4 w-48 ${bar}`} />
                </div>
                <div className={`mt-4 h-7 w-2/3 ${bar}`} />
                <div className={`mt-3 h-4 w-full ${bar}`} />
                <div className={`mt-2 h-4 w-4/5 ${bar}`} />
                <div className="mt-5 flex gap-5">
                  {[...Array(3)].map((__, j) => (
                    <div key={j} className={`h-4 w-10 ${bar}`} />
                  ))}
                </div>
              </div>
              <div className="hidden aspect-[4/3] w-40 md:w-52 shrink-0 self-center animate-pulse rounded-xl bg-gray-200 sm:block" />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default SkeletonLoader;
