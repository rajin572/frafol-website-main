/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Suspense } from "react";
import Container from "../ui/Container";
import FeaturedProfessionalsCard from "../shared/FeaturedProfessionalsCard";
import BrowseHeader from "../shared/BrowseHeader";

//! Import Swiper styles
// import "swiper/css";
// import "swiper/css/effect-fade";
// import "swiper/css/navigation";

import { fetchWithAuth } from "@/lib/fetchWraper";
import TagTypes from "@/helpers/config/TagTypes";
import { IProfessional } from "@/types";
import PaginationSection from "../shared/PaginationSection";
import NoResultFound from "../shared/NoResultFound";
import PhotographyCategorySeacrhFiltre from "../Photography/PhotographyCategorySeacrhFiltre";
import { ITown } from "@/app/(Auth)/sign-up/professional/legal-invoice/page";
import { getProfessionalsListCopy } from "@/utils/professionalsCopy";
import Link from "next/link";
import { cn } from "@/lib/utils";
import JsonLd from "@/components/seo/JsonLd";
import { professionalListSchema } from "@/lib/seo/schema";

// Tabs above the list. Plain links to URLs the site already uses (navbar, home page).
const views = [
  /* label: "All" */
  { key: "all", label: "Všetci", href: "/professionals" },
  { key: "photographer", label: "Fotografi", href: "/professionals?role=photographer" },
  { key: "videographer", label: "Kameramani", href: "/professionals?role=videographer" },
  { key: "recommended", label: "Frafol odporúča", href: "/professionals?type=verified" },
];

const AllProfessionals = async ({ searchParams }: { searchParams: any }) => {
  const params = await searchParams;
  const copy = getProfessionalsListCopy(params);
  const search = params?.search || "";
  const type = params?.type || null;
  const minPrice = (params?.min as string) || null;
  const maxPrice = (params?.max as string) || null;
  const availity = (params?.availity as string) || null;
  const towns = (params?.towns as string) || null;

  const role =
    params?.role === "videographer"
      ? "videographer"
      : params?.role === "photographer"
        ? "photographer"
        : "";

  const page = params?.page || 1;
  const limit = 12;

  const res = await fetchWithAuth(
    `/users/professionals?page=${page}&limit=${limit}&role=${role}&searchTerm=${search}&travelTowns=${towns || ""}${type ? `&hasActiveSubscription=true` : ''}&minPrice=${minPrice || ""}&maxPrice=${maxPrice || ""}&availableDate=${availity || ""}`,
    {
      next: {
        tags: [TagTypes.prfessional],
      },
    }
  );
  const data = await res.json();
  const totalData = data?.data?.meta?.total;
  const professionals: IProfessional[] = data?.data?.result;

  const Townres = await fetchWithAuth(
    `/town`,
    {
      next: {
        tags: [TagTypes.town],
      },
    }
  );

  const Tdata = await Townres.json();
  const townData: ITown[] = Tdata?.data || [];

  // Which tab is on: the same links the navbar and home page already use.
  const activeView = role || (type ? "recommended" : "all");

  return (
    <main className="pb-20">
      {professionals?.length > 0 && (
        <JsonLd
          data={professionalListSchema(
            copy.heading,
            role ? `/professionals?role=${role}` : type ? "/professionals?type=verified" : "/professionals",
            professionals
          )}
        />
      )}
      {/* title="Our Professionals" */}
      {/* description="Discover our top-rated Professionals" */}
      {/* Heading and intro follow the ?role= / ?type= filter, see professionalsCopy.ts */}
      <BrowseHeader
        title={copy.heading}
        description={copy.description}
        /* label="Back To Categories" */
        back={
          role === "videographer"
            ? { href: "/videography", label: "Späť na kategórie" }
            : role === "photographer"
              ? { href: "/photography", label: "Späť na kategórie" }
              : undefined
        }
      />

      <Container>
        <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <nav aria-label="Typ tvorcov" className="-mx-1 overflow-x-auto px-1">
            <ul className="inline-flex gap-1 rounded-xl border border-base-color/10 bg-white p-1 shadow-sm">
              {views.map((view) => (
                <li key={view.key}>
                  <Link
                    href={view.href}
                    aria-current={activeView === view.key ? "page" : undefined}
                    className={cn(
                      "block whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors",
                      activeView === view.key
                        ? "bg-secondary-color text-white"
                        : "text-base-color/70 hover:bg-background-color hover:text-base-color"
                    )}
                  >
                    {view.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <PhotographyCategorySeacrhFiltre townData={townData} />
        </div>

        {professionals?.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {professionals?.map((item, index) => (
              <FeaturedProfessionalsCard key={index} item={item} />
            ))}
          </div>
        ) : (
          <div className="py-16">
            <NoResultFound />
          </div>
        )}

        <div className="mt-14 flex justify-center items-center">
          <Suspense fallback={<div>Načítava sa...</div>}>
            <PaginationSection
              page={page}
              limit={limit}
              totalData={totalData}
            />
          </Suspense>
        </div>
      </Container>
    </main>
  );
};

export default AllProfessionals;
