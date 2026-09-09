"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Container from "../ui/Container";
import CartCard from "./CartProductCards";
import CartDeliveryOption from "./CartDeliveryOption";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import {
  selectSubTotalPrice,
  selectTotalPrice,
  selectTotalShippingPrice,
} from "@/redux/features/cart/cartSlice";
import { IProfile } from "@/types";

const CartSection = ({ myData }: { myData: IProfile }) => {
  const subTotal = useAppSelector(selectSubTotalPrice);
  const shippingTotal = useAppSelector(selectTotalShippingPrice);
  const totalPrice = useAppSelector(selectTotalPrice);

  const cartProducts = useAppSelector(
    (state: RootState) => state.cart.products
  );

  return (
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 text-base-color items-baseline">
        <section className="lg:col-span-3 outline-1 outline-offset-[-1px] outline-gray-200 rounded-xl">
          <div className="p-4 rounded-lg  bg-highlight-color">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-1">
                {/* Order Summary */}
                Zhrnutie objednávky
              </h2>

              <div className="w-fit py-1 px-2 rounded-full bg-secondary-color text-primary-color font-semibold">
                {cartProducts?.length}
              </div>
            </div>
            <div className="flex flex-col gap-4 p-2 overflow-y-auto ">
              {cartProducts.map((product: any, index: number) => (
                <CartCard key={index} product={product} />
              ))}
            </div>
          </div>
        </section>
        <section className="lg:col-span-2 bg-highlight-color outline-1 outline-offset-[-1px] outline-gray-200 rounded-xl p-4">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-5">
            {/* Pricing Information */}
            Informácie o cene
          </h2>
          <div className=" py-5 w-full space-y-4 border-y border-base-color/30 mb-5">
            <div className="flex justify-between">
              <span className="font-bold">Sub Total: </span>
              <span className="font-bold">{subTotal?.toFixed(2)}€</span>
            </div>

            <div className="flex justify-between">
              <span className="font-bold">Shipping: </span>
              <span className="font-bold">{shippingTotal?.toFixed(2)}€</span>
            </div>

            <hr className="border-gray-700" />

            <div className="flex justify-between font-semibold">
              <span className=" font-bold">Total</span>
              <span className="text-secondary-color text-lg font-bold">
                {totalPrice?.toFixed(2)}€
              </span>
            </div>
          </div>
          <div className="mt-10">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-5">
              {/* Delivery Information */}
              Dodacie informácie
            </h2>
            <CartDeliveryOption cartProducts={cartProducts} myData={myData} />
          </div>
        </section>
      </div>
    </Container>
  );
};

export default CartSection;