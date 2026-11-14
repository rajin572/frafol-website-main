import Container from "@/components/ui/Container";

// Same shape as /about-us: centred heading + intro, then rows of photo + text that swap sides.
const Loading = () => {
  return (
    <main className="py-10 sm:py-14">
      <Container>
        <div className="mb-10 flex flex-col items-center">
          <div className="mb-5 h-10 w-40 animate-pulse rounded-md bg-base-color/10" />
          <div className="w-full sm:w-[90%] lg:w-[70%] xl:w-[55%] space-y-2.5">
            <div className="h-4 w-full animate-pulse rounded bg-base-color/10" />
            <div className="mx-auto h-4 w-11/12 animate-pulse rounded bg-base-color/10" />
            <div className="mx-auto h-4 w-2/3 animate-pulse rounded bg-base-color/10" />
          </div>
        </div>

        <div className="mt-12 space-y-14 sm:space-y-16 lg:mt-16 lg:space-y-24">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 items-center gap-7 md:gap-10 lg:gap-16">
              <div
                className={`h-[340px] sm:h-[420px] md:h-[480px] lg:h-[560px] w-full animate-pulse rounded-2xl bg-base-color/10 ${
                  index % 2 === 0 ? "md:order-2" : ""
                }`}
              />
              <div className={index % 2 === 0 ? "md:order-1" : ""}>
                <div className="h-9 w-2/3 animate-pulse rounded-md bg-base-color/10" />
                <div className="mt-6 space-y-3">
                  <div className="h-4 w-full animate-pulse rounded bg-base-color/10" />
                  <div className="h-4 w-full animate-pulse rounded bg-base-color/10" />
                  <div className="h-4 w-11/12 animate-pulse rounded bg-base-color/10" />
                  <div className="h-4 w-3/4 animate-pulse rounded bg-base-color/10" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </main>
  );
};

export default Loading;
