// SEO title + meta description of every fixed public page, in one place for the client's review.
// Titles are the existing ones (already approved). Descriptions are new and still need the
// client's review in the translation sheet (copy: seo/meta-texts.md).
import type { Metadata } from "next";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, pageMetadata } from "./site";

export const PAGE_SEO = {
  home: {
    path: "/",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  photography: {
    path: "/photography",
    title: "Fotografi na Slovensku – Vyberte si fotografa | Frafol",
    description:
      "Vyberte si kategóriu fotenia, napríklad svadbu, rodinu, portrét či podujatie, a nájdite overeného fotografa z celého Slovenska s portfóliom a cenami.",
  },
  videography: {
    path: "/videography",
    title: "Natáčanie videa – Video služby a kategórie | Frafol",
    description:
      "Vyberte si kategóriu natáčania, napríklad svadobné video, podujatie či reklamu, a nájdite overeného kameramana z celého Slovenska s portfóliom a cenami.",
  },
  marketplace: {
    path: "/marketplace",
    title: "Bazár foto a video techniky | Frafol",
    description:
      "Kúpte alebo predajte fotoaparáty, objektívy, drony a ďalšiu foto a video techniku od fotografov a kameramanov na Slovensku.",
  },
  workshops: {
    path: "/workshops",
    title: "Kurzy fotografie a videa – Workshopy | Frafol",
    description:
      "Prihláste sa na kurzy a workshopy fotografie a videa od skúsených fotografov a kameramanov. Termíny, miesta a ceny na jednom mieste.",
  },
  forums: {
    path: "/forums",
    title: "Fórum fotografov a kameramanov | Frafol",
    description:
      "Prepojte sa s inými fotografmi a kameramanmi na diskusiu o príslušenství, technikách a ďalších témach.",
  },
  aboutUs: {
    path: "/about-us",
    title: "O nás – Spoznajte Frafol",
    description:
      "Frafol je slovenská platforma, ktorá spája fotografov a kameramanov s klientmi. Spoznajte náš príbeh, víziu a to, ako pomáhame tvorcom aj klientom.",
  },
  contactUs: {
    path: "/contact-us",
    title: "Kontakt – Kontaktujte Frafol",
    description:
      "Kontaktujte tím Frafol (FRAFOL s.r.o., Žilina). Napíšte nám na cvak@frafol.sk alebo zavolajte na 0917 174 707, radi vám pomôžeme.",
  },
  howItWorks: {
    path: "/how-it-works",
    title: "Ako funguje Frafol pre fotografov a kameramanov",
    description:
      "Zistite, ako na Frafol získať nových klientov: registrácia, profil a portfólio, balíky služieb, prijímanie objednávok a vyplácanie platieb.",
  },
  howOrderingWorks: {
    path: "/how-ordering-works",
    title: "Ako objednať fotografa alebo kameramana | Frafol",
    description:
      "Ako si na Frafol objednať fotenie alebo natáčanie: výber tvorcu, balík alebo nezáväzná požiadavka, bezpečná platba vopred a dodanie fotografií či videa.",
  },
  searchAlgorithm: {
    path: "/search-algorithm",
    title: "Ako funguje vyhľadávanie tvorcov | Frafol",
    description:
      "Ako Frafol zoraďuje fotografov a kameramanov vo výsledkoch vyhľadávania a čo ovplyvňuje poradie profilov.",
  },
  helpfulDocuments: {
    path: "/helpful-documents",
    title: "Užitočné dokumenty | Frafol",
    description:
      "Stiahnite si užitočné šablóny a právne dokumenty pre vaše fotografické a video projekty",
  },
  termsOfService: {
    path: "/terms-of-service",
    title: "Všeobecné obchodné podmienky Zmluvné vzťahy | Frafol",
    description:
      "Všeobecné obchodné podmienky platformy Frafol, ktoré upravujú zmluvné vzťahy medzi klientmi, fotografmi, kameramanmi a prevádzkovateľom FRAFOL s.r.o.",
  },
  termsOfServiceMarketplace: {
    path: "/terms-of-service-marketplace",
    title: "Obchodné podmienky online trh | Frafol",
    description:
      "Obchodné podmienky bazára Frafol pre nákup a predaj foto a video techniky medzi používateľmi platformy.",
  },
  dataProtection: {
    path: "/data-protection",
    title: "Ochrana osobných údajov | Frafol",
    description:
      "Ako FRAFOL s.r.o. spracúva a chráni osobné údaje používateľov platformy Frafol v súlade s GDPR.",
  },
  websiteFunctionality: {
    path: "/website-functionality-compatibility",
    title: "Funkčnosť a kompatibilita webu | Frafol",
    description:
      "Informácie o fungovaní platformy Frafol a o podporovaných prehliadačoch a zariadeniach.",
  },
} as const;

export type PageSeoKey = keyof typeof PAGE_SEO;

export const staticPageMetadata = (key: PageSeoKey): Metadata => pageMetadata(PAGE_SEO[key]);
