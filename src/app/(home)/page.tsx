import { Suspense } from "react";
import Banner from "@/components/Home/Banner";
import HomeSectionSkeleton from "@/components/ui/Skeletons/HomeSectionSkeleton";
import ExploreCategories from "@/components/Home/ExploreCategories";
import FAQ from "@/components/Home/FAQ";
import FeaturedProfessionals from "@/components/Home/FeaturedProfessionals";
import FrafolChoiceProfessional from "@/components/Home/FrafolChoiceProfessional";
import HowItWorks, { howItWorksSteps } from "@/components/Home/HowItWorks";
import JoinCta from "@/components/Home/JoinCta";
import Marketplace from "@/components/Home/Marketplace";
import TalentedProfessionalsImages from "@/components/Home/TalentedProfessionalsImages";
import Testimonial from "@/components/Home/Testimonial";
import { clientsAccordions, professionalsAccordions } from "@/components/Home/faqData";
import JsonLd from "@/components/seo/JsonLd";
import { PAGE_SEO, staticPageMetadata } from "@/lib/seo/pages";
import { faqSchema, howToSchema, webPageSchema } from "@/lib/seo/schema";

export const metadata = staticPageMetadata("home");

const HomePage = ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  return (
    <main className="">
      <JsonLd
        data={[
          webPageSchema({
            name: PAGE_SEO.home.title,
            description: PAGE_SEO.home.description,
            path: "/",
            speakable: ["h1", "#ako-to-funguje", "#faq"],
          }),
          faqSchema([...clientsAccordions, ...professionalsAccordions]),
          howToSchema({
            name: "Ako to funguje",
            description: "Od výberu fotografa či kameramana až po hotové fotografie a videá. Všetko jednoducho na jednom mieste.",
            path: "/",
            steps: howItWorksSteps,
          }),
        ]}
      />
      {/* The hero has no data, so it is sent at once. Every section that calls the API streams in
          on its own (Suspense), instead of the whole page waiting behind the loading spinner. */}
      <Banner />
      {/* No placeholder: this section is hidden when no creator has a subscription. */}
      <Suspense fallback={null}>
        <FrafolChoiceProfessional />
      </Suspense>
      <Suspense fallback={<HomeSectionSkeleton variant="categories" tone="cream" />}>
        <ExploreCategories searchParams={searchParams} />
      </Suspense>
      <Suspense fallback={<HomeSectionSkeleton variant="professionals" />}>
        <FeaturedProfessionals />
      </Suspense>
      <HowItWorks />
      <Suspense fallback={<HomeSectionSkeleton variant="products" />}>
        <Marketplace />
      </Suspense>
      <Suspense fallback={<HomeSectionSkeleton variant="testimonials" tone="cream" />}>
        <Testimonial />
      </Suspense>
      <FAQ />
      <Suspense fallback={<HomeSectionSkeleton variant="gallery" tone="cream" />}>
        <TalentedProfessionalsImages />
      </Suspense>
      {/* Reads the login cookie (async); outside a boundary it would hold the whole page back. */}
      <Suspense fallback={null}>
        <JoinCta />
      </Suspense>
    </main>
  );
};

export default HomePage;
