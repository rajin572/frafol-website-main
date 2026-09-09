import Banner from "@/components/Home/Banner";
import ExploreCategories from "@/components/Home/ExploreCategories";
import FAQ from "@/components/Home/FAQ";
import FeaturedProfessionals from "@/components/Home/FeaturedProfessionals";
import FrafolChoiceProfessional from "@/components/Home/FrafolChoiceProfessional";
import HowItWorks from "@/components/Home/HowItWorks";
import Marketplace from "@/components/Home/Marketplace";
import TalentedProfessionalsImages from "@/components/Home/TalentedProfessionalsImages";
import Testimonial from "@/components/Home/Testimonial";

const HomePage = ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  return (
    <main className="">
      <Banner />
      <FrafolChoiceProfessional />
      <ExploreCategories searchParams={searchParams} />
      <FeaturedProfessionals />
      <HowItWorks />
      <Marketplace />
      <Testimonial />
      <FAQ />
      <TalentedProfessionalsImages />
    </main>
  );
};

export default HomePage;
