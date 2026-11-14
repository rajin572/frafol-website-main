import ProfessionalPageDetails from "@/components/Professional/ProfessionalPageDetails";
import JsonLd from "@/components/seo/JsonLd";
import TagTypes from "@/helpers/config/TagTypes";
import { fetchWithAuth } from "@/lib/fetchWraper";
import { breadcrumbSchema, professionalSchema } from "@/lib/seo/schema";
import { pageMetadata, toPlainText } from "@/lib/seo/site";
import { IProfessionalUser } from "@/types";
import { getMediaUrl } from "@/utils/mediaUrl";
import React from "react";

// "Meno tvorcu – Fotograf | Frafol" (Kameraman for videographers, both for creators who do both).
const ROLE_LABELS: Record<string, string> = {
  photographer: "Fotograf",
  videographer: "Kameraman",
  both: "Fotograf a kameraman",
};

// What the creator can be booked for, used in the fallback description.
const ROLE_SERVICE: Record<string, string> = {
  photographer: "fotenie",
  videographer: "natáčanie",
  both: "fotenie alebo natáčanie",
};

// Breadcrumb level above the profile: the matching creators list.
const ROLE_LIST: Record<string, { name: string; path: string }> = {
  photographer: { name: "Fotografi", path: "/professionals?role=photographer" },
  videographer: { name: "Kameramani", path: "/professionals?role=videographer" },
};

// Same request as the page (fetch memoization runs it only once per render).
const getProfessional = async (id: string): Promise<IProfessionalUser | undefined> => {
  const res = await fetchWithAuth(`/users/${id}`, {
    next: {
      tags: [TagTypes.prfessional],
      revalidate: 60,
    },
  });
  return (await res.json())?.data;
};

const fullNameOf = (user?: IProfessionalUser) => [user?.name, user?.sureName].filter(Boolean).join(" ");

// Meta description: the start of the creator's "O mne" text, or a generic sentence when it is empty.
const descriptionOf = (user: IProfessionalUser) => {
  const about = toPlainText(user?.profileId?.about, 160);
  if (about.length >= 50) return about;
  const role = ROLE_LABELS[user?.role ?? ""] ?? "Fotograf a kameraman";
  const service = ROLE_SERVICE[user?.role ?? ""] ?? "fotenie alebo natáčanie";
  return `${fullNameOf(user)} – ${role} na Frafol. Pozrite si portfólio, balíky služieb, ceny a hodnotenia klientov a objednajte si ${service} online.`;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const path = `/professionals/${id}`;
  try {
    const user = await getProfessional(id);
    const fullName = fullNameOf(user);
    if (user && fullName) {
      const roleLabel = ROLE_LABELS[user?.role ?? ""] ?? "Fotograf a kameraman";
      const image = getMediaUrl(user?.profileImage);
      return pageMetadata({
        title: `${fullName} – ${roleLabel} | Frafol`,
        description: descriptionOf(user),
        path,
        type: "profile",
        images: image ? [{ url: image, alt: fullName }] : undefined,
      });
    }
  } catch {
    // no profile data, use the generic title below
  }
  return { title: "Fotograf a kameraman | Frafol", alternates: { canonical: path } };
}

const page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { id } = await params;
  const paramsData = await searchParams;

  const sort = (paramsData?.sort as string) || "newest";
  const rating = (paramsData?.rating as string) || "5";

  // The profile does not depend on the review filter, yet this page re-renders on every sort / star
  // tap (the filter lives in the URL). A short cache keeps those taps from re-fetching the whole
  // profile each time; mutations still invalidate it through the tag.
  const res = await fetchWithAuth(`/users/${id}`, {
    next: {
      tags: [TagTypes.prfessional],
      revalidate: 60,
    },
  });
  const data = await res.json();
  const professionalUser: IProfessionalUser = data?.data;

  const path = `/professionals/${id}`;
  const fullName = fullNameOf(professionalUser);
  const list = ROLE_LIST[professionalUser?.role ?? ""] ?? { name: "Fotografi a kameramani", path: "/professionals" };

  return (
    <>
      {fullName && (
        <JsonLd
          data={[
            professionalSchema(professionalUser, path, descriptionOf(professionalUser)),
            breadcrumbSchema([{ name: "Domov", path: "/" }, list, { name: fullName, path }]),
          ]}
        />
      )}
      <ProfessionalPageDetails
        professionalUser={professionalUser}
        sort={sort}
        rating={rating}
      />
    </>
  );
};

export default page;
