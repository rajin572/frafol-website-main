import Container from "../Container";

// Loading state of BrowseHeader, so the page does not jump when it loads.
// `banner` = the photo banner of the category pages, otherwise the plain centred band of the list pages.
const BrowseHeaderSkeleton = ({ banner = false }: { banner?: boolean }) => {
  if (!banner) {
    return (
      <section className="border-b border-base-color/10 bg-[#fbf7f4]">
        <Container>
          <div className="mx-auto flex max-w-3xl flex-col items-center py-14 sm:py-20">
            <div className="h-11 w-3/4 animate-pulse rounded-md bg-base-color/10" />
            <div className="mt-6 h-4 w-full max-w-xl animate-pulse rounded bg-base-color/10" />
            <div className="mt-2.5 h-4 w-2/3 max-w-md animate-pulse rounded bg-base-color/10" />
            <div className="mt-9 h-[3.25rem] w-full max-w-2xl animate-pulse rounded-xl bg-base-color/10" />
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="flex min-h-[340px] sm:min-h-[400px] lg:min-h-[55vh] items-end bg-gray-300 animate-pulse">
      <Container>
        <div className="w-full max-w-3xl pb-10 pt-24 sm:pb-12 lg:pb-[4%]">
          <div className="h-10 w-3/4 rounded-md bg-gray-400" />
          <div className="mt-5 h-4 w-full max-w-xl rounded bg-gray-400" />
          <div className="mt-2.5 h-4 w-2/3 max-w-md rounded bg-gray-400" />
        </div>
      </Container>
    </section>
  );
};

export default BrowseHeaderSkeleton;
