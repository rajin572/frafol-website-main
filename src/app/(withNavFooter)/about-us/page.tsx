import AboutUsPage from "@/components/AboutUs/AboutUsPage";
import Container from "@/components/ui/Container";
import React from "react";

export const metadata = {
  title: "O nás – Spoznajte Frafol",
};

const page = () => {
  return (
    <main className="py-10 sm:py-14">
      <Container>
        <AboutUsPage />
      </Container>
    </main>
  );
};

export default page;
