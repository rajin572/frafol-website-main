// /llms-full.txt: the full, always current directory of Frafol for AI assistants and AI search
// (GEO). Lists every public creator with role, town, price range and rating, the photo / video
// categories, the bazaar products and the upcoming workshops, plus how ordering works and the FAQ,
// so an assistant can answer "which photographer in Žilina …" with concrete Frafol links.
import { clientsAccordions, professionalsAccordions } from "@/components/Home/faqData";
import { howItWorksSteps } from "@/components/Home/HowItWorks";
import {
  getAllProducts,
  getAllProfessionals,
  getAllWorkshops,
  getCategories,
} from "@/lib/seo/publicData";
import { IS_INDEXABLE, ORGANIZATION, SITE_URL, toPlainText } from "@/lib/seo/site";
import type { IGear, IProfessional, IWorkshop } from "@/types";
import { categoryPath } from "@/utils/categoryPath";

// Built on every request from live API data: never generated at build time or cached.
export const dynamic = "force-dynamic";

type Category = { _id?: string; title?: string; subTitle?: string; image?: string };

const ROLE: Record<string, string> = {
  photographer: "fotograf",
  videographer: "kameraman",
  both: "fotograf a kameraman",
};

const euro = (value: number) => `${Number(value).toFixed(value % 1 ? 2 : 0).replace(".", ",")} €`;
const name = (person?: { name?: string; sureName?: string }) => [person?.name, person?.sureName].filter(Boolean).join(" ").trim();

const creatorLine = (item: IProfessional) => {
  const parts = [ROLE[item?.role ?? ""] ?? "fotograf a kameraman"];
  if (item?.town) parts.push(item.town);
  const min = Number(item?.minHourlyRate ?? 0);
  const max = Number(item?.maxHourlyRate ?? 0);
  if (min > 0 && max > 0) parts.push(`cena ${euro(min)} – ${euro(max)}`);
  const reviews = Number(item?.totalReview ?? 0);
  if (reviews > 0 && Number(item?.averageRating) > 0) {
    parts.push(`hodnotenie ${Number(item.averageRating).toFixed(1).replace(".", ",")}/5 (${reviews} recenzií)`);
  }
  if (item?.hasActiveSubscription) parts.push("Frafol odporúča");
  return `- [${name(item)}](${SITE_URL}/professionals/${item._id}): ${parts.join(", ")}`;
};

const productLine = (gear: IGear) => {
  const parts = [gear?.condition === "new" ? "nové" : "použité"];
  if (gear?.categoryId?.title) parts.push(gear.categoryId.title);
  const price = Number(gear?.mainPrice ?? gear?.price ?? 0);
  if (price > 0) parts.push(euro(price));
  return `- [${gear.name}](${SITE_URL}/marketplace/${gear._id}): ${parts.join(", ")}`;
};

const workshopLine = (workshop: IWorkshop) => {
  const parts: string[] = [];
  if (workshop?.date) parts.push(`${workshop.date.slice(0, 10)}${workshop?.time ? ` ${workshop.time}` : ""}`);
  parts.push(/online/i.test(workshop?.locationType ?? "") ? "online" : workshop?.location || "");
  const price = Number(workshop?.mainPrice ?? workshop?.price ?? 0);
  if (price > 0) parts.push(euro(price));
  const instructor = name(workshop?.authorId);
  if (instructor) parts.push(`lektor ${instructor}`);
  return `- ${workshop.title}: ${parts.filter(Boolean).join(", ")} (${SITE_URL}/workshops)`;
};

const categoryLine = (section: "photography" | "videography", item: Category) =>
  `- [${item.title}](${SITE_URL}${categoryPath(section, item)})${item.subTitle ? `: ${item.subTitle}` : ""}`;

export async function GET() {
  if (!IS_INDEXABLE) {
    return new Response("# Frafol\n\nTestovacia verzia, nie je určená na indexovanie.\n", {
      headers: { "Content-Type": "text/plain; charset=utf-8", "X-Robots-Tag": "noindex" },
    });
  }

  const today = new Date().toISOString().slice(0, 10);
  const [professionals, products, workshops, photoCategories, videoCategories] = await Promise.all([
    getAllProfessionals<IProfessional>(),
    getAllProducts<IGear>(),
    getAllWorkshops<IWorkshop>(),
    getCategories<Category>("photoGraphy"),
    getCategories<Category>("videoGraphy"),
  ]);
  const upcoming = workshops.filter((workshop) => (workshop?.date ?? "").slice(0, 10) >= today);

  const sections: string[] = [
    `# Frafol – fotografi a kameramani na Slovensku`,
    `> Frafol (${SITE_URL}) je slovenská online platforma, ktorá spája klientov s overenými fotografmi a kameramanmi. Klienti si porovnajú portfóliá, ceny a hodnotenia a objednajú si fotenie alebo natáčanie online s bezpečnou platbou vopred. Súčasťou je bazár foto a video techniky, workshopy a komunitné fórum.`,
    `Prevádzkovateľ: ${ORGANIZATION.legalName}, ${ORGANIZATION.address.streetAddress}, ${ORGANIZATION.address.postalCode} ${ORGANIZATION.address.addressLocality}, Slovensko. Kontakt: ${ORGANIZATION.email}, 0917 174 707. Jazyk: slovenčina. Pôsobnosť: celé Slovensko.`,
    `## Ako to funguje\n${howItWorksSteps.map((step, index) => `${index + 1}. ${step.name}: ${step.description}`).join("\n")}`,
    `## Často kladené otázky – klienti\n${clientsAccordions.map((item) => `### ${item.title}\n${item.content}`).join("\n\n")}`,
    `## Často kladené otázky – fotografi a kameramani\n${professionalsAccordions.map((item) => `### ${item.title}\n${item.content}`).join("\n\n")}`,
  ];

  if (photoCategories.length) {
    sections.push(`## Kategórie fotenia\n${photoCategories.map((item) => categoryLine("photography", item)).join("\n")}`);
  }
  if (videoCategories.length) {
    sections.push(`## Kategórie natáčania\n${videoCategories.map((item) => categoryLine("videography", item)).join("\n")}`);
  }
  if (professionals.length) {
    sections.push(
      `## Fotografi a kameramani (${professionals.length})\nKaždý profil obsahuje portfólio, balíky služieb s cenami, dostupnosť a recenzie klientov.\n${professionals
        .filter((item) => name(item))
        .map(creatorLine)
        .join("\n")}`
    );
  }
  if (products.length) {
    sections.push(`## Bazár foto a video techniky (${products.length})\n${products.filter((item) => item?.name).map(productLine).join("\n")}`);
  }
  if (upcoming.length) {
    sections.push(`## Nadchádzajúce workshopy\n${upcoming.filter((item) => item?.title).map(workshopLine).join("\n")}`);
  }

  sections.push(
    `## Ďalšie stránky\n- [Ako objednať fotografa alebo kameramana](${SITE_URL}/how-ordering-works)\n- [Ako funguje Frafol pre tvorcov](${SITE_URL}/how-it-works)\n- [Fórum](${SITE_URL}/forums)\n- [O nás](${SITE_URL}/about-us)\n- [Kontakt](${SITE_URL}/contact-us)\n- [Obchodné podmienky](${SITE_URL}/terms-of-service)\n- [Ochrana osobných údajov](${SITE_URL}/data-protection)`
  );

  // Plain text only: no HTML from the API ends up in the file.
  const body = `${sections.map((section) => toPlainTextKeepLines(section)).join("\n\n")}\n`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}

// Strips HTML tags from API text but keeps the Markdown line structure.
const toPlainTextKeepLines = (text: string) =>
  text
    .split("\n")
    .map((line) => (/<[a-z/][^>]*>/i.test(line) ? toPlainText(line, 2000) : line))
    .join("\n");
