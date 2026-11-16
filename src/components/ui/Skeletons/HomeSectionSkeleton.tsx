import Container from "../Container";
import ProfessionalsCardSkeleton from "./ProfessionalsCardSkeleton";
import CategoryCardSkeleton from "./CategoryCardSkeleton";
import ProductCardSkeleton from "./ProductCardSkeleton";

type Variant = "professionals" | "categories" | "products" | "testimonials" | "gallery";

// Placeholder of one home page section while its data loads. Each data section streams in on its
// own, so the hero (the LCP) is never held back by the slowest API call.
const HomeSectionSkeleton = ({ variant, tone = "white" }: { variant: Variant; tone?: "white" | "cream" }) => (
  <section className={`${tone === "cream" ? "bg-[#fbf7f4]" : "bg-white"} py-20 sm:py-24`} aria-hidden>
    <Container>
      <div className="mb-12 flex flex-col items-center">
        <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
        <div className="mt-4 h-9 w-2/3 max-w-md animate-pulse rounded-md bg-gray-200" />
        <div className="mt-4 h-4 w-full max-w-lg animate-pulse rounded bg-gray-200" />
      </div>

      {variant === "professionals" && <ProfessionalsCardSkeleton />}
      {variant === "categories" && <CategoryCardSkeleton />}
      {variant === "products" && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      )}
      {variant === "testimonials" && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-56 animate-pulse rounded-2xl bg-gray-200" />
          ))}
        </div>
      )}
      {variant === "gallery" && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="aspect-square animate-pulse rounded-xl bg-gray-200" />
          ))}
        </div>
      )}
    </Container>
  </section>
);

export default HomeSectionSkeleton;
