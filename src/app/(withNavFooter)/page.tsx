import Banner from "@/components/Home/Banner";
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
      <Banner />
      <FrafolChoiceProfessional />
      <ExploreCategories searchParams={searchParams} />
      <FeaturedProfessionals />
      <HowItWorks />
      <Marketplace />
      <Testimonial />
      <FAQ />
      <TalentedProfessionalsImages />
      <JoinCta />
    </main>
  );
};

export default HomePage;
