"use client";

import Image from "next/image";
import { AllImages } from "../../../public/assets/AllImages";
import { MdDelete } from "react-icons/md";
import { getMediaUrl } from "@/utils/mediaUrl";
import { IGear } from "@/types";
import { useAppDispatch } from "@/redux/hooks";
import { removeFromCart } from "@/redux/features/cart/cartSlice";
import Link from "next/link";

const CartCard = ({ product }: { product: IGear }) => {
  const dispatch = useAppDispatch();

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="py-4 flex justify-between items-center gap-5">
      <div className="flex gap-4 items-center">
        <Image
          src={
            product?.gallery?.[0]
              ? getMediaUrl(product?.gallery?.[0])
              : AllImages?.dummyCover?.src
          }
          alt="product"
          width={240}
          height={240}
          className="size-24 sm:size-28 shrink-0 object-cover rounded-lg"
          quality={75}
        />
        <div className="space-y-0.5">
          <Link href={`/marketplace/${product?._id}`}>
            <h2 className="text-base lg:text-lg text-secondary-color font-semibold mb-1.5 hover:underline">
              {product?.name}
            </h2>
          </Link>
          <div className="flex items-center gap-2 text-sm lg:text-base">
            <p className="font-semibold">
              Stav:
            </p>
            <p>
              {product?.condition === "new" ? "Nové" : "Použité"}
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm lg:text-base">
            <p className="font-semibold">
              Predajca:
            </p>
            <Link href={`/professionals/${product?.authorId?._id}`} className="text-secondary-color font-bold cursor-pointer hover:underline">
              {product?.authorId?.name}
            </Link>
          </div>
          <h2 className="text-sm lg:text-base">
            Cena: <span className="font-bold">{product?.mainPrice?.toFixed(2)}€</span>
          </h2>
        </div>
      </div>
      <button
        type="button"
        onClick={() => handleRemove(product?._id)}
        className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg text-error transition-colors hover:bg-error/10"
      >
        <MdDelete className="size-5 lg:size-6" />
      </button>
    </div>
  );
};

export default CartCard;
