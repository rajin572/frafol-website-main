import Image from "next/image";
import React from "react";
import Link from "next/link";
import { IGear } from "@/types";
import { getServerUrl } from "@/helpers/config/envConfig";
import AddToCardButton from "../ui/AddToCardButton";
import { AllImages } from "../../../public/assets/AllImages";

interface ProductCardProps {
  product: IGear;
}
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const serverUrl = getServerUrl();

  return (
    <div className="!h-full flex flex-col justify-baseline">
      <Link href={`/marketplace/${product?._id}`} className="grow">
        <div className="flex flex-col relative">
          <div className="overflow-hidden rounded-tl-lg rounded-tr-lg ">
            <Image
              width={200}
              height={200}
              className="w-full h-72 object-cover hover:scale-105 transform-3d transition-transform duration-300 ease-in-out"
              src={
                product?.gallery[0]?.length > 0
                  ? serverUrl + product?.gallery[0]
                  : AllImages.dummyCover
              }
              alt="product"
            />
          </div>
          <div className="flex items-center justify-between gap-2 absolute top-2  w-full px-2">
            {product?.vatAmount > 0 ? (
              <span className="text-sm sm:text-sm bg-secondary-color text-primary-color py-0.5 px-1.5 rounded-full ">
                VAT Included: {product?.vatAmount}%
              </span>
            ) : (
              <span></span>
            )}
          </div>
          <div className="mt-4 p-1">
            <p className="text-base sm:text-lg xl:text-xl font-bold text-secondary-color break-all mb-2">
              {product?.name}
            </p>

            <p className=" mb-2 break-all">
              {product?.description?.slice(0, 75)}{" "}
              {product?.description?.length > 75 && "..."}
            </p>
            <p className=" mb-2">
              Category:{" "}
              <span className="font-medium break-all">{product?.categoryId?.title}</span>
            </p>
            <p className=" mb-2">
              Seller:{" "}
              <Link
                href={`/professionals/${product?.authorId?._id}`}
                className="text-secondary-color text-sm sm:text-sm lg:text-base font-bold cursor-pointer"
              >
                {product?.authorId?.name}
              </Link>
            </p>
            <p className=" mb-2">
              Condition:{" "}
              <span className="font-medium">{product?.condition ? product?.condition === "new" ? "Nové" : "Použité" : "N/A"}</span>
            </p>
            <span className="text-sm sm:text-lg lg:text-xl font-bold">
              {product?.mainPrice?.toFixed(2)}€
            </span>
          </div>
        </div>
      </Link>
      <div className="shrink">
        <AddToCardButton gear={product} />
      </div>
    </div>
  );
};

export default ProductCard;
