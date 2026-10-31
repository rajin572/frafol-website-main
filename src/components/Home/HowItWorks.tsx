import React from "react";
import Container from "../ui/Container";
import SectionHeader from "../ui/SectionHeader";
import { FiSearch } from "react-icons/fi";
import { IoCalendar } from "react-icons/io5";
import { ImCamera } from "react-icons/im";
import { ImDownload2 } from "react-icons/im";

const data = [
  {
    /* name: "Search" */
    name: "Hľadať",
    /* description: "Browse through our collection of photographers and videographers or use our search to find the perfect match." */
    description: "Široký výber fotografov a kameramanov s portfóliami, ponukami a službami na rôzne príležitosti.",
    icon: <FiSearch className="size-7 text-secondary-color" />,
  },
  {
    /* name: "Book" */
    name: "Rezervovať",
    /* description: "Schedule a meeting, discuss your project details and confirm your booking with your chosen professional." */
    description: "Jednoduché objednanie fotenia alebo natáčania s možnosťou dohodnúť všetky detaily priamo s tvorcom.",
    icon: <IoCalendar className="size-7 text-secondary-color" />,
  },
  {
    /* name: "Shoot" */
    name: "Fotenie alebo natáčanie",
    /* description: "Meet with your professional and let them capture amazing images or videos for your project." */
    description: "Realizácia fotenia či natáčania podľa dohodnutých predstáv, termínu a požiadaviek.",
    icon: < ImCamera className="size-7 text-secondary-color" />,
  },
  {
    /* name: "Receive" */
    name: "Prevziať",
    /* description: "Get your edited photos or videos and provide feedback on your experience with the professional." */
    description: "Odovzdanie upravených fotografií alebo videí a možnosť podeliť sa o skúsenosť prostredníctvom hodnotenia.",
    icon: <ImDownload2 className="size-7 text-secondary-color" />,
  },
];

const HowItWorks = () => {
  return (
    <section className="pb-28">
      <Container>
        <SectionHeader
          /* title="How It Works" */
          title="Ako to funguje"
          /* description="Frafol makes it easy to find and hire the perfect photographer or videographer for your project." */
          description="Od výberu fotografa či kameramana až po hotové fotografie a videá. Všetko jednoducho na jednom mieste."
        />

        <div className="mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8 lg:gap-5">
            {data.map((item, i) => (
              <div
                key={i}
                className="flex flex-col gap-2 items-center justify-center text-center"
              >
                <div className="p-4 rounded-full bg-background-color flex items-center justify-center text-white text-3xl">
                  {item.icon}
                </div>
                <h3 className="text-secondary-color text-base sm:text-lg lg:text-xl font-semibold ">
                  {item.name}
                </h3>
                <p className="text-sm sm:text-sm font-medium text-base-color">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HowItWorks;