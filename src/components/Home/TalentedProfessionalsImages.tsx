import React from "react";
import Container from "../ui/Container";
import SectionHeader from "../ui/SectionHeader";
import ImageGallery from "../ui/ImageGallery";
import { fetchWithAuth } from "@/lib/fetchWraper";

export interface IRandomImages {
  userId: string;
  name: string;
  image: string;
}


const TalentedProfessionalsImages = async () => {

  const columnsCountBreakPoints = { 350: 1, 600: 2, 1024: 3 };

  const res = await fetchWithAuth(`/users/random-gallery-images`, {
    next: {
      revalidate: 60 * 60,
    },
  });


  const data = await res.json();
  const randomImages: IRandomImages[] = data?.data;

  return (
    <section className="pb-28">
      <Container>
        <SectionHeader title="Od našich talentovaných tvorcov" />
        <div className="mt-16">
          <ImageGallery<IRandomImages>
            data={randomImages}
            columnsCountBreakPoints={columnsCountBreakPoints}
          />
        </div>
      </Container>
    </section>
  );
};

export default TalentedProfessionalsImages;
