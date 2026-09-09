/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import SectionHeader from "../ui/SectionHeader";
import CategoryCard from "../shared/CategoryCard";
import Container from "../ui/Container";
import Link from "next/link";
import ReuseButton from "../ui/Button/ReuseButton";
import { fetchWithAuth } from "@/lib/fetchWraper";
import TagTypes from "@/helpers/config/TagTypes";
import { ICategory } from "@/types";
import PhotographyPageSearch from "./PhotographyPageSearch";
import NoResultFound from "../shared/NoResultFound";

const PhotographyPage = async ({ searchParams }: { searchParams: any }) => {
  const params = await searchParams;
  const search = params?.search || "";
  const res = await fetchWithAuth(`/category/type/photoGraphy`, {
    next: {
      tags: [TagTypes.category],
      revalidate: 0,
    },
  });
  const data = await res.json();
  const categories: ICategory[] = data?.data;

  const filteredCategories = categories.filter((category) => {
    return category?.title?.toLowerCase().includes(search?.toLowerCase());
  });
  return (
    <div className="">
      <Container>
        {/* title="Browse All Photography Categories" */}
        {/* description="Explore our complete range of specialized photography services to match your specific project needs." */}
        <SectionHeader title="Prezrite si všetky foto kategórie" description="Prezrite si našu ponuku fotografických služieb a nájdite fotografa podľa toho, čo práve potrebujete." />
        <div className="mt-16">
          <PhotographyPageSearch />
          {filteredCategories?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 items-stretch gap-5">
              {filteredCategories?.map((item, index) => (
                <Link
                  key={index}
                  href={`/photography/${item?._id}?role=photographer&title=${item?.title}&src=${item?.image}`}
                >
                  <CategoryCard item={item} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-20 sm:col-span-2 lg:col-span-3 xl:col-span-4">
              <NoResultFound />
            </div>
          )}
        </div>
        <div className="flex justify-center items-center !mt-10">
          <ReuseButton
            url="/professionals?role=photographer"
            className="mt-10 w-fit mx-auto !text-sm sm:!text-base lg:!text-lg !py-4.5"
            variant="secondary"
          >
            {/* See All Photographers */}
            Zobraziť všetkých fotografov
          </ReuseButton>
        </div>
      </Container>
    </div>
  );
};

export default PhotographyPage;
