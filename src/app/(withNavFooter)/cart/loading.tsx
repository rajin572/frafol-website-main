import Container from "@/components/ui/Container";

// Cart skeleton: items card on the left, price + delivery card on the right.
const bar = "animate-pulse rounded bg-gray-200";

const SkeletonLoader = () => {
  return (
    <main className="py-10 sm:py-14">
      <Container>
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-5">
          <div className="rounded-xl border border-base-color/10 p-5 sm:p-6 lg:col-span-3">
            <div className={`h-8 w-64 ${bar}`} />
            <div className="divide-y divide-base-color/10">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 py-4">
                  <div className="size-24 sm:size-28 shrink-0 animate-pulse rounded-lg bg-gray-200" />
                  <div className="flex-1">
                    <div className={`h-5 w-3/4 ${bar}`} />
                    <div className={`mt-3 h-4 w-32 ${bar}`} />
                    <div className={`mt-2 h-4 w-40 ${bar}`} />
                    <div className={`mt-2 h-4 w-28 ${bar}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-base-color/10 p-5 sm:p-6 lg:col-span-2">
            <div className={`h-8 w-52 ${bar}`} />
            <div className={`mt-8 h-4 w-full ${bar}`} />
            <div className={`mt-3 h-4 w-full ${bar}`} />
            <div className={`mt-5 h-6 w-full ${bar}`} />
            <div className={`mt-12 h-8 w-52 ${bar}`} />
            {[...Array(4)].map((_, i) => (
              <div key={i} className="mt-5">
                <div className={`h-4 w-32 ${bar}`} />
                <div className="mt-2 h-10 w-full animate-pulse rounded-lg bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
};

export default SkeletonLoader;
