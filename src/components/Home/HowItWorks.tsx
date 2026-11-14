import React from "react";
import { CalendarCheck, Camera, Download, Search } from "lucide-react";
import Container from "../ui/Container";
import SectionHeader from "../ui/SectionHeader";

const data = [
  {
    /* name: "Search" */
    name: "Hľadať",
    /* description: "Browse through our collection of photographers and videographers or use our search to find the perfect match." */
    description: "Široký výber fotografov a kameramanov s portfóliami, ponukami a službami na rôzne príležitosti.",
    icon: Search,
  },
  {
    /* name: "Book" */
    name: "Rezervovať",
    /* description: "Schedule a meeting, discuss your project details and confirm your booking with your chosen professional." */
    description: "Jednoduché objednanie fotenia alebo natáčania s možnosťou dohodnúť všetky detaily priamo s tvorcom.",
    icon: CalendarCheck,
  },
  {
    /* name: "Shoot" */
    name: "Fotenie alebo natáčanie",
    /* description: "Meet with your professional and let them capture amazing images or videos for your project." */
    description: "Realizácia fotenia či natáčania podľa dohodnutých predstáv, termínu a požiadaviek.",
    icon: Camera,
  },
  {
    /* name: "Receive" */
    name: "Prevziať",
    /* description: "Get your edited photos or videos and provide feedback on your experience with the professional." */
    description: "Odovzdanie upravených fotografií alebo videí a možnosť podeliť sa o skúsenosť prostredníctvom hodnotenia.",
    icon: Download,
  },
];

// Dark band with 4 numbered steps. Each step: number, icon, title, text, separated by hairlines.
const HowItWorks = () => {
  return (
    <section className="bg-[#1f1d1c] py-20 sm:py-24">
      <Container>
        <SectionHeader
          tone="dark"
          eyebrow="4 jednoduché kroky"
          /* title="How It Works" */
          title="Ako to funguje"
          /* description="Frafol makes it easy to find and hire the perfect photographer or videographer for your project." */
          description="Od výberu fotografa či kameramana až po hotové fotografie a videá. Všetko jednoducho na jednom mieste."
        />

        <ol className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {data.map(({ name, description, icon: Icon }, i) => (
            <li key={name} className="border-t border-white/20 pt-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold tabular-nums text-white/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Icon className="size-6 text-third-color" strokeWidth={1.75} />
              </div>
              <h3 className="mt-6 text-lg sm:text-xl font-bold text-white">{name}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-white/60">{description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
};

export default HowItWorks;
