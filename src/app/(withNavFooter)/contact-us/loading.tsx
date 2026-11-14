import Container from "@/components/ui/Container";

// Same shape as /contact-us: heading, intro and company details on the left, the form on the right.
const Loading = () => {
  return (
    <main className="py-10">
      <Container>
        <div className="flex min-h-[86vh] w-full flex-col items-center justify-center">
          <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="mb-4 h-11 w-3/4 max-w-sm animate-pulse rounded-md bg-base-color/10" />
              <div className="mb-8 h-5 w-full max-w-md animate-pulse rounded bg-base-color/10" />
              <div className="space-y-4">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="size-10 shrink-0 animate-pulse rounded-lg bg-base-color/10" />
                    <div className="h-5 w-56 animate-pulse rounded bg-base-color/10" />
                  </div>
                ))}
              </div>
            </div>

            <div>
              {Array.from({ length: 2 }).map((_, index) => (
                <div key={index} className="mb-6">
                  <div className="mb-2 h-5 w-20 animate-pulse rounded bg-base-color/10" />
                  <div className="h-12 w-full animate-pulse rounded-xl bg-base-color/10" />
                </div>
              ))}
              <div className="mb-6">
                <div className="mb-2 h-5 w-20 animate-pulse rounded bg-base-color/10" />
                <div className="h-36 w-full animate-pulse rounded-xl bg-base-color/10" />
              </div>
              <div className="h-12 w-full animate-pulse rounded-xl bg-base-color/10" />
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default Loading;
