/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import CategoryCard from "../shared/CategoryCard";
import Container from "../ui/Container";
import Link from "next/link";
import ReuseButton from "../ui/Button/ReuseButton";
import { fetchWithAuth } from "@/lib/fetchWraper";
import TagTypes from "@/helpers/config/TagTypes";
import { ICategory } from "@/types";
import PhotographyPageSearch from "./PhotographyPageSearch";
import NoResultFound from "../shared/NoResultFound";
import BrowseHeader from "../shared/BrowseHeader";

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
    <>
      {/* title="Browse All Photography Categories" */}
      {/* description="Explore our complete range of specialized photography services to match your specific project needs." */}
      <BrowseHeader
        title="Prezrite si všetky foto kategórie"
        description="Prezrite si našu ponuku fotografických služieb a nájdite fotografa podľa toho, čo práve potrebujete."
      >
        <PhotographyPageSearch />
      </BrowseHeader>

      <section className="py-12 sm:py-16">
        <Container>
          {filteredCategories?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-stretch gap-6">
              {filteredCategories?.map((item, index) => (
                <Link
                  key={index}
                  href={`/photography/${item?._id}?role=photographer&title=${encodeURIComponent(item?.title ?? "")}&src=${encodeURIComponent(item?.image ?? "")}&subTitle=${encodeURIComponent(item?.subTitle ?? "")}`}
                  className="rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-color"
                >
                  <CategoryCard item={item} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-16">
              <NoResultFound />
            </div>
          )}

          <div className="mt-14 flex justify-center">
            <ReuseButton
              url="/professionals?role=photographer"
              className="w-fit !text-sm sm:!text-base !py-5 !px-8 !rounded-lg !font-semibold"
              variant="secondary"
            >
              {/* See All Photographers */}
              Zobraziť všetkých fotografov
            </ReuseButton>
          </div>
        </Container>
      </section>
    </>
  );
};

export default PhotographyPage;
