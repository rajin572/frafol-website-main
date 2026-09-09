import TagTypes from "@/helpers/config/TagTypes";
import { fetchWithAuth } from "@/lib/fetchWraper";
import { IProfessional } from "@/types";
import Container from "../ui/Container";
import SectionHeader from "../ui/SectionHeader";
import ReuseButton from "../ui/Button/ReuseButton";
import FeaturedProfessionalSlider from "./FeaturedProfessionalSlider";

const FrafolChoiceProfessional = async () => {
    const res = await fetchWithAuth(`/users/professionals?hasActiveSubscription=true`, {
        next: {
            tags: [TagTypes.prfessional],
            revalidate: 180
        },
    });
    const data = await res.json();
    const professionals: IProfessional[] = data?.data?.result;

    console.log(professionals)

    if (!professionals || professionals.length === 0) {
        return null;
    }

    return (
        <section className="">
            <Container>
                <SectionHeader
                    title="Odporúča Frafol"
                    description="Objavte našich overených fotografov a videografov"
                />

                <FeaturedProfessionalSlider data={professionals} />

                <div className="flex justify-center items-center !mt-10">
                    <ReuseButton
                        url="/professionals?type=verified"
                        className="mt-10 w-fit mx-auto !text-sm sm:!text-base lg:!text-lg !py-4.5"
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