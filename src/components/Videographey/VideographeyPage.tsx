/* eslint-disable @typescript-eslint/no-explicit-any */
import { categoryPath } from "@/utils/categoryPath";
import React from "react";
import CategoryCard from "../shared/CategoryCard";
import Container from "../ui/Container";
import Link from "next/link";
import ReuseButton from "../ui/Button/ReuseButton";
import { fetchWithAuth } from "@/lib/fetchWraper";
import TagTypes from "@/helpers/config/TagTypes";
import { ICategory } from "@/types";
import PhotographyPageSearch from "../Photography/PhotographyPageSearch";
import NoResultFound from "../shared/NoResultFound";
import BrowseHeader from "../shared/BrowseHeader";

const VideographeyPage = async ({ searchParams }: { searchParams: any }) => {
  const params = await searchParams;
  const search = params?.search || "";
  const res = await fetchWithAuth(`/category/type/videoGraphy`, {
    next: {
      tags: [TagTypes.category],
    },
  });
  const data = await res.json();
  const categories: ICategory[] = data?.data;

  const filteredCategories = categories.filter((category) => {
    return category?.title?.toLowerCase().includes(search?.toLowerCase());
  });

  return (
    <>
      {/* title="Browse All Videography Categories" */}
      {/* description="Explore our complete range of specialized videography services to match your specific project needs." */}
      <BrowseHeader
        title="Nájdite kameramana podľa svojich predstáv"
        description="Svadobné video, záznam podujatia alebo reklama pre vašu značku? Vyberte si kategóriu, nájdite svojho kameramana a objednajte si natáčanie."
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
                  href={categoryPath("videography", item)}
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
              url="/professionals?role=videographer"
              className="w-fit !text-sm sm:!text-base !py-5 !px-8 !rounded-lg !font-semibold"
              variant="secondary"
            >
              {/* See All Videographers */}
              Zobraziť všetkých kameramanov
            </ReuseButton>
          </div>
        </Container>
      </section>
    </>
  );
};

export default VideographeyPage;
