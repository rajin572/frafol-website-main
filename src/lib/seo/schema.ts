// schema.org JSON-LD builders for the public pages. Rendered with <JsonLd />.
import type { ICommunityPost, IGear, IProfessionalUser, IWorkshop } from "@/types";
import { getMediaUrl } from "@/utils/mediaUrl";
import { ORGANIZATION, SITE_NAME, SITE_URL, absoluteUrl, toPlainText } from "./site";

type Schema = Record<string, unknown>;

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const clean = <T extends Schema>(schema: T): T =>
  Object.fromEntries(
    Object.entries(schema).filter(([, value]) => value !== undefined && value !== null && value !== "" && !(Array.isArray(value) && value.length === 0))
  ) as T;

const media = (path?: string | null) => {
  const url = getMediaUrl(path);
  return url ? absoluteUrl(url) : undefined;
};

const fullName = (person?: { name?: string; sureName?: string }) =>
  [person?.name, person?.sureName].filter(Boolean).join(" ").trim();

// Who runs the website: FRAFOL s.r.o. Shown on every page (root layout).
export const organizationSchema = (): Schema => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: SITE_NAME,
  legalName: ORGANIZATION.legalName,
  url: SITE_URL,
  logo: absoluteUrl("/icons/icon-512.png"),
  image: absoluteUrl("/og-image.png"),
  email: ORGANIZATION.email,
  telephone: ORGANIZATION.telephone,
  vatID: ORGANIZATION.vatID,
  taxID: ORGANIZATION.taxID,
  address: { "@type": "PostalAddress", ...ORGANIZATION.address },
  areaServed: { "@type": "Country", name: "Slovensko" },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: ORGANIZATION.email,
    telephone: ORGANIZATION.telephone,
    availableLanguage: ["sk"],
  },
  sameAs: ORGANIZATION.sameAs,
});

// The website itself, with its search (the creators list takes ?search=).
export const websiteSchema = (): Schema => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "sk-SK",
  publisher: { "@id": ORG_ID },
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/professionals?search={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
});

// A plain page (about, contact, legal …). `type` e.g. AboutPage, ContactPage, CollectionPage.
export const webPageSchema = ({ type = "WebPage", name, description, path }: { type?: string; name: string; description: string; path: string }): Schema => ({
  "@context": "https://schema.org",
  "@type": type,
  "@id": `${absoluteUrl(path)}#webpage`,
  url: absoluteUrl(path),
  name,
  description,
  inLanguage: "sk-SK",
  isPartOf: { "@id": WEBSITE_ID },
  publisher: { "@id": ORG_ID },
});

// "Domov › Fotografi › Meno" trail, shown by Google instead of the raw URL.
export const breadcrumbSchema = (items: { name: string; path: string }[]): Schema => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

// Home page FAQ.
export const faqSchema = (items: { title: string; content: string }[]): Schema => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((item) => ({
    "@type": "Question",
    name: item.title,
    acceptedAnswer: { "@type": "Answer", text: item.content },
  })),
});

// A list of links (categories, creators) on a list page.
export const itemListSchema = (items: { name: string; path: string; image?: string }[]): Schema => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: items.map((item, index) =>
    clean({ "@type": "ListItem", position: index + 1, name: item.name, url: absoluteUrl(item.path), image: item.image })
  ),
});

const ROLE_JOB: Record<string, string> = {
  photographer: "Fotograf",
  videographer: "Kameraman",
  both: "Fotograf a kameraman",
};

// A creator's public profile (/professionals/[id]).
export const professionalSchema = (user: IProfessionalUser, path: string, description?: string): Schema => {
  const name = fullName(user) || user?.companyName;
  const job = ROLE_JOB[user?.role ?? ""] ?? "Fotograf a kameraman";
  const reviews = Number(user?.totalReview ?? user?.totalReviews ?? 0);
  const rating = Number(user?.averageRating ?? 0);
  const min = Number(user?.minHourlyRate ?? 0);
  const max = Number(user?.maxHourlyRate ?? 0);

  return clean({
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${absoluteUrl(path)}#service`,
    name: `${name} – ${job}`,
    url: absoluteUrl(path),
    description,
    image: media(user?.profileImage) ?? media(user?.bannerImages?.[0]),
    priceRange: min > 0 && max > 0 ? `${min} € – ${max} €` : undefined,
    address: user?.town
      ? clean({ "@type": "PostalAddress", addressLocality: user.town, postalCode: user?.zipCode, addressCountry: "SK" })
      : undefined,
    areaServed: { "@type": "Country", name: "Slovensko" },
    employee: clean({ "@type": "Person", name, jobTitle: job, image: media(user?.profileImage) }),
    aggregateRating:
      reviews > 0 && rating > 0
        ? { "@type": "AggregateRating", ratingValue: Number(rating.toFixed(1)), reviewCount: reviews, bestRating: 5, worstRating: 1 }
        : undefined,
    makesOffer: (user?.package || [])
      .filter((item) => item?.title && Number(item?.price) > 0)
      .slice(0, 10)
      .map((item) =>
        clean({
          "@type": "Offer",
          name: item.title,
          price: Number(item.price),
          priceCurrency: "EUR",
        })
      ),
    isPartOf: { "@id": WEBSITE_ID },
  });
};

// A product in the bazaar (/marketplace/[id]).
export const productSchema = (gear: IGear, path: string): Schema => {
  const seller = fullName(gear?.authorId);
  const price = Number(gear?.mainPrice ?? gear?.price ?? 0);
  return clean({
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${absoluteUrl(path)}#product`,
    name: gear?.name,
    description: toPlainText(gear?.description, 500) || undefined,
    image: (gear?.gallery || []).map((image) => media(image)).filter(Boolean),
    category: gear?.categoryId?.title,
    offers: clean({
      "@type": "Offer",
      url: absoluteUrl(path),
      price: price > 0 ? Number(price.toFixed(2)) : undefined,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      itemCondition: gear?.condition === "new" ? "https://schema.org/NewCondition" : "https://schema.org/UsedCondition",
      seller: seller ? { "@type": "Person", name: seller } : undefined,
    }),
  });
};

// A forum post (/forums/[id]).
export const forumPostSchema = (post: ICommunityPost, path: string): Schema =>
  clean({
    "@context": "https://schema.org",
    "@type": "DiscussionForumPosting",
    "@id": `${absoluteUrl(path)}#post`,
    url: absoluteUrl(path),
    headline: post?.title,
    text: toPlainText(post?.text, 5000) || undefined,
    image: (post?.images || []).map((image) => media(image)).filter(Boolean),
    datePublished: post?.createdAt,
    dateModified: post?.updatedAt,
    inLanguage: "sk-SK",
    author: clean({
      "@type": "Person",
      name: fullName(post?.authorId) || SITE_NAME,
      url: ["photographer", "videographer", "both"].includes(post?.authorId?.role ?? "")
        ? absoluteUrl(`/professionals/${post?.authorId?._id}`)
        : undefined,
    }),
    interactionStatistic: [
      { "@type": "InteractionCounter", interactionType: "https://schema.org/LikeAction", userInteractionCount: Number(post?.totalLikes ?? 0) },
      { "@type": "InteractionCounter", interactionType: "https://schema.org/CommentAction", userInteractionCount: Number(post?.totalComments ?? 0) },
      { "@type": "InteractionCounter", interactionType: "https://schema.org/ViewAction", userInteractionCount: Number(post?.totalViewers ?? 0) },
    ],
    isPartOf: { "@id": WEBSITE_ID },
  });

// "2026-11-20" + "18:00" → "2026-11-20T18:00:00" (no time zone: shown as local Slovak time).
const workshopStart = (date?: string, time?: string) => {
  if (!date) return undefined;
  const day = date.slice(0, 10);
  const match = /(\d{1,2}):(\d{2})/.exec(time ?? "");
  return match ? `${day}T${match[1].padStart(2, "0")}:${match[2]}:00` : day;
};

// One workshop (listed on /workshops).
export const workshopEventSchema = (workshop: IWorkshop): Schema => {
  const online = /online/i.test(workshop?.locationType ?? "");
  const instructor = fullName(workshop?.authorId) || workshop?.authorId?.companyName;
  const price = Number(workshop?.mainPrice ?? workshop?.price ?? 0);
  return clean({
    "@type": "Event",
    name: workshop?.title,
    description: toPlainText(workshop?.description, 500) || undefined,
    image: media(workshop?.image),
    startDate: workshopStart(workshop?.date, workshop?.time),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: online ? "https://schema.org/OnlineEventAttendanceMode" : "https://schema.org/OfflineEventAttendanceMode",
    location: online
      ? { "@type": "VirtualLocation", url: absoluteUrl("/workshops") }
      : workshop?.location
        ? { "@type": "Place", name: workshop.location, address: workshop.location }
        : undefined,
    organizer: instructor ? { "@type": "Person", name: instructor } : undefined,
    performer: instructor ? { "@type": "Person", name: instructor } : undefined,
    offers: clean({
      "@type": "Offer",
      url: absoluteUrl("/workshops"),
      price: price > 0 ? Number(price.toFixed(2)) : 0,
      priceCurrency: "EUR",
      availability:
        Number(workshop?.maxParticipant) > 0 && Number(workshop?.totalParticipants) >= Number(workshop?.maxParticipant)
          ? "https://schema.org/SoldOut"
          : "https://schema.org/InStock",
    }),
  });
};

export const workshopListSchema = (workshops: IWorkshop[]): Schema => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: workshops.map((workshop, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: workshopEventSchema(workshop),
  })),
});
