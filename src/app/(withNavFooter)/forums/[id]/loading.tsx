import Container from "@/components/ui/Container";

// Forum post skeleton: back link, post card (title, meta, like, author + text), comments card.
const bar = "animate-pulse rounded bg-gray-200";

const SkeletonLoader = () => {
  return (
    <main>
      <Container>
        <div className="py-12 sm:py-16">
          <div className={`h-6 w-44 ${bar}`} />

          <div className="mt-8 overflow-hidden rounded-2xl border border-base-color/10">
            <div className="flex items-start justify-between gap-6 border-b border-base-color/10 p-6 sm:p-8">
              <div className="w-full">
                <div className={`h-10 w-2/3 ${bar}`} />
                <div className="mt-4 flex gap-6">
                  <div className={`h-4 w-48 ${bar}`} />
                  <div className={`h-4 w-20 ${bar}`} />
                </div>
              </div>
              <div className="h-16 w-16 shrink-0 animate-pulse rounded-xl bg-gray-200" />
            </div>
            <div className="flex flex-col lg:flex-row">
              <div className="flex items-center gap-3 border-b border-base-color/10 bg-background-color/30 px-6 py-5 lg:w-52 lg:flex-col lg:border-b-0 lg:border-r lg:p-8">
                <div className="size-12 lg:size-20 animate-pulse rounded-full bg-gray-200" />
                <div className={`h-4 w-24 ${bar}`} />
              </div>
              <div className="flex-1 space-y-3 p-6 sm:p-8">
                <div className="mb-8 h-72 lg:h-[420px] w-full animate-pulse rounded-xl bg-gray-200" />
                <div className={`h-4 w-full ${bar}`} />
                <div className={`h-4 w-11/12 ${bar}`} />
                <div className={`h-4 w-4/5 ${bar}`} />
                <div className={`h-4 w-2/3 ${bar}`} />
              </div>
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-base-color/10 p-6 sm:p-8">
            <div className={`h-7 w-32 ${bar}`} />
            <div className="mt-5 h-36 w-full animate-pulse rounded-2xl bg-gray-100" />
            <div className="mt-6 border-t border-base-color/10" />
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-4 pt-6">
                <div className="size-11 shrink-0 animate-pulse rounded-full bg-gray-200" />
                <div className="flex-1">
                  <div className="h-20 w-3/4 animate-pulse rounded-2xl rounded-tl-md bg-gray-100" />
                  <div className={`mt-2 h-5 w-24 ${bar}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
};

export default SkeletonLoader;
