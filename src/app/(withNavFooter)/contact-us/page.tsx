import ContactUs from "@/components/ContactUs/ContactUs";
import Container from "@/components/ui/Container";
import React from "react";

export const metadata = {
  title: "Kontakt – Kontaktujte Frafol",
};

const page = () => {
  return (
    <main className="py-10">
      <Container>
        <ContactUs />
      </Container>
    </main>
  );
};

export default page;
