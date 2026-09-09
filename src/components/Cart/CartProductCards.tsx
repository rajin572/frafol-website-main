"use client";

import Image from "next/image";
import { AllImages } from "../../../public/assets/AllImages";
import { MdDelete } from "react-icons/md";
import { getServerUrl } from "@/helpers/config/envConfig";
import { IGear } from "@/types";
import { useAppDispatch } from "@/redux/hooks";
import { removeFromCart } from "@/redux/features/cart/cartSlice";
import Link from "next/link";

const CartCard = ({ product }: { product: IGear }) => {
  const dispatch = useAppDispatch();
  const serverUrl = getServerUrl();

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  console.log(product)
  return (
    <div className="py-2 flex justify-between items-center gap-5 ">
      <div className="flex gap-2 items-center">
        <Image
          src={
            product?.gallery?.[0]
              ? serverUrl + product?.gallery?.[0]
              : AllImages?.dummyCover?.src
          }
          alt="product"
          width={2000}
          height={2000}
          className="w-28 h-28 object-cover rounded"
          quality={75}
        />
        <div>
          <Link href={`/marketplace/${product?._id}`}>
            <h2 className="text-sm sm:text-base lg:text-lg text-secondary-color font-semibold mb-2">
              {product?.name}
            </h2>
          </Link>
          <div className="flex items-center gap-2">
            <p className="text-sm sm:text-sm lg:text-base font-semibold">
              Condition:
            </p>
            <p className="text-sm sm:text-sm lg:text-base">
              {product?.condition === "new" ? "Nové" : "Použité"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm sm:text-sm lg:text-base font-semibold">
              Seller:
            </p>
            <Link href={`/professionals/${product?.authorId?._id}`} className="text-secondary-color text-sm sm:text-sm lg:text-base font-bold cursor-pointer">
              <p className="text-sm sm:text-sm lg:text-base">
                {product?.authorId?.name}
              </p>
            </Link>
          </div>
          <h2 className="text-sm sm:text-sm lg:text-base mb-2">
            Price: <span className="font-semibold">{product?.mainPrice?.toFixed(2)}€</span>
          </h2>
        </div>
      </div>
      <MdDelete
        onClick={() => handleRemove(product?._id)}
        className="size-4 sm:size-5 lg:size-6 cursor-pointer text-error "
      />
    </div>
  );
};

export default CartCard;
