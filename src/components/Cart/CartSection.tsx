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
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 text-base-color items-start">
        <section className="lg:col-span-3 rounded-xl border border-base-color/10 bg-white">
          <div className="p-5 sm:p-6">
            <div className="flex items-center gap-2.5 mb-2">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">
                {/* Order Summary */}
                Zhrnutie objednávky
              </h2>

              <div className="flex h-7 min-w-7 items-center justify-center px-2 rounded-full bg-secondary-color text-primary-color text-sm font-semibold">
                {cartProducts?.length}
              </div>
            </div>
            <div className="flex flex-col divide-y divide-base-color/10">
              {cartProducts.map((product: any, index: number) => (
                <CartCard key={index} product={product} />
              ))}
            </div>
          </div>
        </section>
        <section className="lg:col-span-2 rounded-xl border border-base-color/10 bg-white p-5 sm:p-6">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-5">
            {/* Pricing Information */}
            Informácie o cene
          </h2>
          <div className="py-5 w-full space-y-3 border-y border-base-color/15 mb-5">
            <div className="flex justify-between">
              <span className="font-semibold text-base-color/80">Medzisúčet: </span>
              <span className="font-bold">{subTotal?.toFixed(2)}€</span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold text-base-color/80">Poštovné: </span>
              <span className="font-bold">{shippingTotal?.toFixed(2)}€</span>
            </div>

            <hr className="border-base-color/15" />

            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">Celkom</span>
              <span className="text-secondary-color text-xl font-bold">
                {totalPrice?.toFixed(2)}€
              </span>
            </div>
          </div>
          <div className="mt-10">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-5">
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
