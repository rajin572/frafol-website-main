import React from "react";
import ProductDetailAccordion from "../ui/ProductDetailAccordion";
import MarketPlaceImageTab from "./MarketPlaceImageTab";
import { IGear } from "@/types";
import AddToCardButton from "../ui/AddToCardButton";
import Link from "next/link";

const MarketPlaceDetailsPage = ({ data }: { data: IGear }) => {
  const generalData = [
    {
      title: "Shipping",
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="bg-zinc-200 p-4 rounded-lg">
            <p className="text-sm sm:text-sm md:text-base lg:text-lg xl:text-xl ">
              {data?.shippingCompany?.name}
              {" - "}
              <span className="text-secondary-color font-bold">
                ${data?.shippingCompany?.price?.toFixed(2)}
              </span>
            </p>
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 min-h-[90vh]">
      <div>
        <MarketPlaceImageTab images={data?.gallery} />
      </div>
      <div className="space-y-1 lg:space-y-2 ">
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-extrabold">
          {data?.name}
        </h1>
        <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold">
          {data?.mainPrice?.toFixed(2)}€
        </h3>
        <p className="text-sm sm:text-sm md:text-base lg:text-lg xl:text-xl mt-4">
          {data?.description}
        </p>
        <p className="text-sm sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold mt-4">
          Seller:{" "}
          <Link
            href={`/professionals/${data?.authorId?._id}`}
            className="text-secondary-color text-sm sm:text-sm lg:text-base font-bold cursor-pointer"
          >
            {" "}
            {data?.authorId?.name}
          </Link>
        </p>
        <p className="text-sm sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold mt-4">
          Condition:{" "}
          <span className="font-bold capitalize"> {data?.condition ? data?.condition === "new" ? "Nové" : "Použité" : "N/A"}</span>
        </p>
        <div className="flex flex-col w-full mt-10">
          <AddToCardButton gear={data} />
          {/* <ReuseButton
            className=" mt-5 !text-sm sm:!text-base lg:!text-lg !py-5 w-full !border-secondary-color !font-bold"
            variant="secondary"
          >
            Buy Now
          </ReuseButton> */}
          <div className="mt-10">
            {generalData.map((item, index) => (
              <ProductDetailAccordion
                key={index}
                title={item.title}
                content={item.content}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketPlaceDetailsPage;
