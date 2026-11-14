// Product detail skeleton: thumbnails + photo on the left, name / price / description / seller /
// condition / button / shipping on the right.
import Container from "@/components/ui/Container";
import React from "react";

const bar = "animate-pulse rounded bg-gray-200";

const ProductDetailSkeleton = () => {
  return (
    <main className="py-14 sm:py-20">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 min-h-[80vh]">
          <div className="flex gap-3 sm:gap-4">
            <div className="flex flex-col gap-2">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="size-16 sm:size-20 animate-pulse rounded-lg bg-gray-200" />
              ))}
            </div>
            <div className="h-96 flex-1 animate-pulse rounded-xl bg-gray-200" />
          </div>

          <div>
            <div className={`h-10 w-3/4 ${bar}`} />
            <div className={`mt-4 h-7 w-28 ${bar}`} />
            <div className={`mt-6 h-4 w-full ${bar}`} />
            <div className={`mt-2.5 h-4 w-11/12 ${bar}`} />
            <div className={`mt-2.5 h-4 w-2/3 ${bar}`} />
            <div className={`mt-6 h-5 w-48 ${bar}`} />
            <div className={`mt-3 h-5 w-32 ${bar}`} />
            <div className="mt-10 h-12 w-full animate-pulse rounded-lg bg-gray-200" />
            <div className="mt-10 h-14 w-full animate-pulse rounded bg-gray-200" />
          </div>
        </div>
      </Container>
    </main>
  );
};

export default ProductDetailSkeleton;
