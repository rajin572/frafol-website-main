import Image from "next/image";
import React from "react";
import Link from "next/link";
import { IGear } from "@/types";
import { getMediaUrl } from "@/utils/mediaUrl";
import AddToCardButton from "../ui/AddToCardButton";
import { AllImages } from "../../../public/assets/AllImages";

interface ProductCardProps {
  product: IGear;
}

// Marketplace (bazár) item card.
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const isNew = product?.condition === "new";
  return (
    <div className="group !h-full flex flex-col overflow-hidden rounded-xl border border-base-color/10 bg-white transition-shadow duration-300 hover:shadow-lg">
      <Link href={`/marketplace/${product?._id}`} className="grow flex flex-col">
        <div className="relative overflow-hidden bg-background-color">
          <Image
            width={600}
            height={600}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="w-full h-64 object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            src={
              product?.gallery[0]?.length > 0
                ? getMediaUrl(product?.gallery[0])
                : AllImages.dummyCover
            }
            alt={product?.name || "Produkt"}
          />
          <div className="absolute inset-x-3 top-3 flex items-center justify-between gap-2">
            {product?.condition ? (
              <span
                className="rounded-md bg-white px-2 py-0.5 text-xs font-semibold text-base-color"
              >
                {isNew ? "Nové" : "Použité"}
              </span>
            ) : (
              <span />
            )}
            {product?.vatAmount > 0 && (
              <span className="rounded-md bg-white px-2 py-0.5 text-xs font-semibold text-base-color">
                Vrátane DPH: {product?.vatAmount}%
              </span>
            )}
          </div>
        </div>

        <div className="flex grow flex-col p-4">
          {product?.categoryId?.title && (
            <p className="text-sm text-base-color/55">
              {product.categoryId.title}
            </p>
          )}
          <p className="mt-0.5 text-lg font-bold text-base-color line-clamp-1">{product?.name}</p>
          <p className="mt-1.5 text-sm text-base-color/65 line-clamp-2">{product?.description}</p>
        </div>
      </Link>
      {/* Outside the card link: the seller name is its own link (no <a> inside <a>). */}
      <div className="flex items-end justify-between gap-3 px-4 pb-1">
        <div className="min-w-0 text-sm text-base-color/60 line-clamp-1">
          Predajca:{" "}
          <Link
            href={`/professionals/${product?.authorId?._id}`}
            className="font-bold text-secondary-color hover:underline"
          >
            {product?.authorId?.name}
          </Link>
        </div>
        <span className="shrink-0 text-lg font-bold text-base-color">
          {product?.mainPrice?.toFixed(2)}€
        </span>
      </div>
      <div className="shrink px-4 pb-4">
        <AddToCardButton gear={product} />
      </div>
    </div>
  );
};

export default ProductCard;
