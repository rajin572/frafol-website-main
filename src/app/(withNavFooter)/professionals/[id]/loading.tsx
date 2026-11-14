import Container from "@/components/ui/Container";

// Creator profile skeleton: cover, avatar + name, section bar, side card and sections.
const bar = "animate-pulse rounded bg-gray-200";

const SkeletonLoader = () => {
  return (
    <div className="min-h-screen pb-20">
      <Container>
        <div className="flex flex-col items-center gap-5 pt-12 sm:flex-row sm:gap-7 sm:pt-14">
          <div className="size-28 sm:size-32 shrink-0 animate-pulse rounded-full bg-gray-200" />
          <div className="flex flex-col items-center sm:items-start">
            <div className={`h-9 w-56 ${bar}`} />
            <div className={`mt-2 h-5 w-28 ${bar}`} />
          </div>
        </div>
      </Container>

      <div className="mt-8 border-b border-base-color/10">
        <Container>
          <div className="flex gap-8 py-4">
            {[20, 28, 28, 20].map((w, i) => (
              <div key={i} className={`h-5 ${bar}`} style={{ width: `${w * 4}px` }} />
            ))}
          </div>
        </Container>
      </div>

      <Container>
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:order-last lg:col-span-4">
            <div className="rounded-2xl border border-base-color/10 p-6">
              <div className={`h-4 w-32 ${bar}`} />
              <div className={`mt-2 h-8 w-44 ${bar}`} />
              <div className="mt-5 space-y-3 border-t border-base-color/10 pt-5">
                <div className={`h-4 w-40 ${bar}`} />
                <div className={`h-4 w-28 ${bar}`} />
              </div>
              <div className="mt-6 h-11 w-full animate-pulse rounded-lg bg-gray-200" />
              <div className="mt-3 h-11 w-full animate-pulse rounded-lg bg-gray-200" />
            </div>
          </div>

          <div className="space-y-16 lg:col-span-8">
            <div>
              <div className={`h-8 w-32 ${bar}`} />
              <div className={`mt-6 h-4 w-full ${bar}`} />
              <div className={`mt-2.5 h-4 w-11/12 ${bar}`} />
              <div className={`mt-2.5 h-4 w-2/3 ${bar}`} />
            </div>
            <div>
              <div className={`h-8 w-40 ${bar}`} />
              <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-60 animate-pulse rounded-lg bg-gray-200" />
                ))}
              </div>
            </div>
            <div>
              <div className={`h-8 w-40 ${bar}`} />
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="rounded-2xl border border-base-color/10 p-2">
                    <div className="h-52 animate-pulse rounded-xl bg-gray-200" />
                    <div className="px-3 pb-3">
                      <div className={`mt-4 h-6 w-24 ${bar}`} />
                      <div className={`mt-4 h-6 w-3/4 ${bar}`} />
                      <div className="mt-6 h-11 w-full animate-pulse rounded-lg bg-gray-200" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SkeletonLoader;
