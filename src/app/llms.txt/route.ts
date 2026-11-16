// /llms.txt (https://llmstxt.org): a short plain-text guide to the website for AI assistants and
// AI search (ChatGPT, Perplexity, Gemini …), so they can describe Frafol and link the right pages.
import { PAGE_SEO } from "@/lib/seo/pages";
import { ORGANIZATION, SITE_URL } from "@/lib/seo/site";

export const revalidate = 86400;

const link = (key: keyof typeof PAGE_SEO, name: string) => `- [${name}](${SITE_URL}${PAGE_SEO[key].path}): ${PAGE_SEO[key].description}`;

export function GET() {
  const body = `# Frafol

> Frafol je slovenská online platforma, ktorá spája klientov s overenými fotografmi a kameramanmi. Klienti si porovnajú portfóliá, ceny a hodnotenia a objednajú si fotenie alebo natáčanie online s bezpečnou platbou vopred. Súčasťou je aj bazár foto a video techniky, workshopy a komunitné fórum.

Prevádzkovateľ: ${ORGANIZATION.legalName}, ${ORGANIZATION.address.streetAddress}, ${ORGANIZATION.address.postalCode} ${ORGANIZATION.address.addressLocality}, Slovensko. IČO ${ORGANIZATION.taxID}, DIČ ${ORGANIZATION.vatID}. Kontakt: ${ORGANIZATION.email}, 0917 174 707.
Jazyk webu: slovenčina. Pôsobnosť: celé Slovensko.

## Ako to funguje
- Klient si vyberie kategóriu alebo konkrétneho fotografa či kameramana a na jeho profile si pozrie portfólio, balíky služieb, orientačné ceny a hodnotenia.
- Objednať môže hotový balík alebo poslať nezáväznú požiadavku. Po odsúhlasení ceny platí vopred; platforma drží platbu a tvorcovi ju uvoľní až po dodaní a potvrdení služby.
- Frafol si neberie províziu z ceny tvorcu. Klient platí samostatný servisný poplatok.

## Hlavné stránky
- [Domov](${SITE_URL}/): ${PAGE_SEO.home.description}
- [Fotografi a kameramani](${SITE_URL}/professionals): zoznam všetkých tvorcov s filtrom podľa mesta, ceny a dostupnosti.
- [Fotografi](${SITE_URL}/professionals?role=photographer): zoznam fotografov.
- [Kameramani](${SITE_URL}/professionals?role=videographer): zoznam kameramanov.
${link("photography", "Kategórie fotenia")}
${link("videography", "Kategórie natáčania")}
${link("marketplace", "Bazár foto a video techniky")}
${link("workshops", "Workshopy a kurzy")}
${link("forums", "Fórum")}

## Informácie
${link("howOrderingWorks", "Ako objednať fotografa alebo kameramana")}
${link("howItWorks", "Ako funguje Frafol pre tvorcov")}
${link("searchAlgorithm", "Ako funguje vyhľadávanie")}
${link("aboutUs", "O nás")}
${link("contactUs", "Kontakt")}

## Právne dokumenty
${link("termsOfService", "Všeobecné obchodné podmienky")}
${link("termsOfServiceMarketplace", "Obchodné podmienky bazára")}
${link("dataProtection", "Ochrana osobných údajov")}

## Optional
- [Úplný zoznam](${SITE_URL}/llms-full.txt): všetci fotografi a kameramani s mestom, cenou a hodnotením, kategórie, bazár, workshopy a často kladené otázky.
- [Mapa stránok](${SITE_URL}/sitemap.xml): všetky verejné profily tvorcov, produkty v bazári, príspevky vo fóre a kategórie.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
