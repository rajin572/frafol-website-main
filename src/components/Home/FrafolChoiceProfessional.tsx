import TagTypes from "@/helpers/config/TagTypes";
import { fetchWithAuth } from "@/lib/fetchWraper";
import { IProfessional } from "@/types";
import Container from "../ui/Container";
import SectionHeader from "../ui/SectionHeader";
import ReuseButton from "../ui/Button/ReuseButton";
import FeaturedProfessionalSlider from "./FeaturedProfessionalSlider";
import JsonLd from "@/components/seo/JsonLd";
import { professionalListSchema } from "@/lib/seo/schema";

const FrafolChoiceProfessional = async () => {
    const res = await fetchWithAuth(`/users/professionals?hasActiveSubscription=true`, {
        next: {
            tags: [TagTypes.prfessional],
            revalidate: 0
        },
    });
    const data = await res.json();
    const professionals: IProfessional[] = data?.data?.result;

    if (!professionals || professionals.length === 0) {
        return null;
    }

    return (
        <section className="bg-white py-20 sm:py-24">
            <JsonLd data={professionalListSchema("Odporúča Frafol", "/", professionals, "frafol-choice")} />
            <Container>
                <SectionHeader
                    title="Odporúča Frafol"
                    description="Objavte našich overených fotografov a videografov"
                />

                <FeaturedProfessionalSlider data={professionals} />

                <div className="flex justify-center items-center mt-12">
                    <ReuseButton
                        url="/professionals?type=verified"
                        className="w-fit mx-auto !text-sm sm:!text-base lg:!text-lg !py-5 !px-8 !rounded-lg"
                        variant="secondary"
                    >
                        {/* See More */}
                        Zobraziť viac
                    </ReuseButton>
                </div>
            </Container>
        </section>
    );
};

export default FrafolChoiceProfessional;