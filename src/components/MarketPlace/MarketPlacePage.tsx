/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Suspense } from "react";
import SectionBanner from "../ui/SectionBanner";
import SectionHeader from "../ui/SectionHeader";
import Container from "../ui/Container";
import ProductCard from "../shared/ProductCard";
import { AllImages } from "../../../public/assets/AllImages";
import MarketPlaceTab from "./MarketPlaceTab";
import MarketPlaceSeacrhFiltre from "./MarketPlaceSeacrhFiltre";
import { fetchWithAuth } from "@/lib/fetchWraper";
import TagTypes from "@/helpers/config/TagTypes";
import { ICategory, IGear } from "@/types";
import PaginationSection from "../shared/PaginationSection";
import NoResultFound from "../shared/NoResultFound";
import ReuseButton from "../ui/Button/ReuseButton";
import { PlusIcon } from "lucide-react";
import { getCurrentUser } from "@/services/AuthService";
import { readJson } from "@/lib/readJson";
import JsonLd from "@/components/seo/JsonLd";
import { productListSchema } from "@/lib/seo/schema";

// Let's generate 12 dummy entries (mock data like a boss 😎)

const MarketPlace = async ({ searchParams }: { searchParams: any }) => {
  const params = await searchParams;
  const search = params?.search || "";

  const page = params?.page || 1;
  const category = params?.category === "all" ? "" : params?.category || "";
  const condition =
    params?.condition === "all" ? "" : params?.condition || "";
  const minPrice = params?.min || "";
  const maxPrice = params?.max || "";
  const limit = 12;

  const res = await fetchWithAuth(
    `/marketPlace?page=${page}&limit=${limit}&searchTerm=${search}&categoryId=${category}&condition=${condition}&minPrice=${minPrice}&maxPrice=${maxPrice}&status=In Stock`,
    {
      next: {
        tags: [TagTypes.gear],
      },
    }
  );
  const data = await readJson(res, "/marketPlace");
  const gear: IGear[] = data?.data?.result || [];
  const totalData = data?.data?.meta?.total || 0;

  const categoryRes = await fetchWithAuth(`/category/type/gear`, {
    next: {
      tags: [TagTypes.category],
    },
  });
  const categoryData = await readJson(categoryRes, "/category/type/gear");

  const categories: ICategory[] = categoryData?.data || [];


  const userData = await getCurrentUser();

  console.log(userData)
  return (
    <main className="pb-20">
      {gear.length > 0 && <JsonLd data={productListSchema("Bazár foto a video techniky", "/marketplace", gear)} />}
      {/* title="Market Place" */}
      <SectionBanner
        image={AllImages?.marketBanner?.src}
        title="Bazár"
      />

      <Container>
        <div className="mt-16 sm:mt-20">
          {/* title="Market Place" */}
          {/* description="Browse and buy equipment from professionals in the industry." */}
          <SectionHeader title="Bazár" description="Prezrite si ponuku techniky a nakúpte od fotografov a kameramanov." />
          {
            (userData?.role === "both" || userData?.role === "photographer" || userData?.role === "videographer") && (
              <div className="mt-8 flex justify-end">
                <ReuseButton
                  variant="secondary"
                  url="/dashboard/professional/gear-marketPlace"
                  className="!w-fit !text-sm sm:!text-base !py-5 !px-6 !rounded-lg !font-semibold"
                >
                  <PlusIcon className="mr-1 size-5" />
                  {/* Add New Gear */}
                  Pridať nové príslušenstvo
                </ReuseButton>
              </div>
            )
          }

          <div className="mt-12">
            <MarketPlaceTab categories={categories} />
          </div>
          <div className="mt-8 flex justify-end">
            <MarketPlaceSeacrhFiltre />
          </div>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-stretch gap-6">
            {gear?.length <= 0 ? (
              <div className="py-16 sm:col-span-2 lg:col-span-3 xl:col-span-4">
                <NoResultFound />
              </div>
            ) : (
              gear?.map((item, index) => (
                <ProductCard key={index} product={item} />
              ))
            )}
          </div>

          <div className="mt-14 flex justify-center items-center">
            {totalData !== 0 && (
              <Suspense fallback={<div>Načítava sa...</div>}>
                <PaginationSection
                  page={page}
                  limit={limit}
                  totalData={totalData}
                />
              </Suspense>
            )}
          </div>
        </div>
      </Container>
    </main>
  );
};

export default MarketPlace;
