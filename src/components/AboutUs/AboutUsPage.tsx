import React from "react";
import SectionHeader from "../ui/SectionHeader";
import { AllImages } from "../../../public/assets/AllImages";
import AboutUsCard from "./AboutUsCard";

const data = [
  {
    image: AllImages.aboutUs1,
    /* title: "Why do we do this?" */
    title: "Prečo to robíme?",
    /* description: "Because we believe in quality, honest work, and a human approach..." */
    description: "Pretože veríme v kvalitu, poctivú prácu a ľudský prístup. Pretože vieme, že nie každý má čas alebo trpezlivosť prehľadávať stovky webov alebo písať desiatky e-mailov. Naša platforma spája tých, ktorí chcú vytvárať nadčasové spomienky.",
    reverse: true,
    buttonText: null,
  },
  {
    image: AllImages.aboutUs2,
    /* title: "Our Vision" */
    title: "Naša vízia",
    /* description: "We aim to build the largest community of photographers and videographers in Slovakia..." */
    description: "Naším cieľom je vybudovať najväčšiu komunitu fotografov a videografov na Slovensku, aby si klienti mohli jednoducho nájsť ideálneho tvorcu pre svoje potreby. Pomáhame čo najväčšiemu počtu ľudí nájsť spoľahlivého a talentovaného fotografa alebo kameramana. Naším cieľom je podporovať dôveru medzi tvorcami a klientmi prostredníctvom transparentnej a osobnej komunikácie.",
    buttonText: null,
  },
  {
    image: AllImages.aboutUs3,
    /* title: "For Photographers and Videographers" */
    title: "Pre fotografov a kameramanov",
    /* description: "This is not just a platform but a community that connects creators..." */
    description: "Získajte nových klientov a prezentujte svoju tvorbu na jednom mieste. Vytvorte si profesionálne portfólio, ponúkajte fotografické a video služby a prijímajte objednávky jednoducho online. Z ceny, ktorú si stanovíte, vám FRAFOL nič neodpočítava. Servisný poplatok sa pripočíta k cene objednávky a hradí ho klient. Navyše sa môžete zapojiť do komunity fotografov a kameramanov, zdieľať skúsenosti a diskutovať na fóre.",
    /* buttonText: "Join As a Photographer/Videographer" */
    buttonText: "Pridajte sa ako fotograf/kameraman",
    reverse: true,
    redirectUrl: "/join",
  },
  {
    image: AllImages.aboutUs4,
    /* title: "For Clients" */
    title: "Pre klientov",
    /* description: "Looking for a photographer or videographer for a wedding, baptism, corporate event, or prom?..." */
    description: "Hľadáte fotografa alebo kameramana na svadbu, stužkovú, oslavu či firemnú akciu? Na FRAFOL si jednoducho prezrite portfóliá overených fotografov a kameramanov, porovnáte ich ponuky a vyberte si toho pravého. S profesionálom môžete komunikovať priamo, dohodnúť si všetky detaily a objednať fotenie alebo natáčanie.",
    /* buttonText: "Find a Photographer/Videographer" */
    buttonText: "Nájsť fotografa/kameramana",
    redirectUrl: "/professionals",
  },
  {
    image: AllImages.aboutUs5,
    /* title: "What now?" */
    title: "Čo ďalej?",
    /* description: "If you're a photographer or videographer, join us..." */
    description: "Ak ste fotograf alebo videograf, pridajte sa k nám. Ak hľadáte profesionála, vyberte si z overených tvorcov.",
    reverse: true,
    buttonText: null,
  },
];

const AboutUsPage = () => {
  return (
    <div>
      <SectionHeader
        /* title="About Us" */
        title="O nás"
        /* description="We are not just another ordinary listing website..." */
        description="Nie sme len ďalší obyčajný katalógový web. Sme komunita a platforma, kde sa talent stretáva s dopytom. Spájame fotografov a videografov, ktorí milujú tvoriť, s klientmi, ktorí chcú zachytiť to, na čom im najviac záleží."
      />
      <section className="mt-10 space-y-10">
        {data.map((item, index) => (
          <AboutUsCard key={index} data={item} />
        ))}
      </section>
    </div>
  );
};

export default AboutUsPage;