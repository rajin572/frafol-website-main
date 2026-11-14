import React from "react";
import ProductDetailAccordion from "../ui/ProductDetailAccordion";
import MarketPlaceImageTab from "./MarketPlaceImageTab";
import { IGear } from "@/types";
import AddToCardButton from "../ui/AddToCardButton";
import Link from "next/link";

const MarketPlaceDetailsPage = ({ data }: { data: IGear }) => {
  const generalData = [
    {
      title: "Doprava",
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="bg-background-color p-4 rounded-lg">
            <p className="text-sm sm:text-base lg:text-lg">
              {data?.shippingCompany?.name}
              {" - "}
              <span className="text-secondary-color font-bold">
                {data?.shippingCompany?.price?.toFixed(2)}€
              </span>
            </p>
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 min-h-[80vh]">
      <div>
        <MarketPlaceImageTab images={data?.gallery} />
      </div>
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight text-base-color">
          {data?.name}
        </h1>
        <h3 className="mt-3 text-xl sm:text-2xl font-bold text-base-color">
          {data?.mainPrice?.toFixed(2)}€
        </h3>
        <p className="mt-5 whitespace-pre-line text-base lg:text-lg leading-relaxed text-base-color/80">
          {data?.description}
        </p>
        <p className="mt-5 text-base lg:text-lg font-semibold">
          Predajca:{" "}
          <Link
            href={`/professionals/${data?.authorId?._id}`}
            className="text-secondary-color font-bold cursor-pointer hover:underline"
          >
            {data?.authorId?.name}
          </Link>
        </p>
        <p className="mt-2 text-base lg:text-lg font-semibold">
          Stav:{" "}
          <span className="font-bold capitalize">{data?.condition ? data?.condition === "new" ? "Nové" : "Použité" : "N/A"}</span>
        </p>
        <div className="flex flex-col w-full mt-8">
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
