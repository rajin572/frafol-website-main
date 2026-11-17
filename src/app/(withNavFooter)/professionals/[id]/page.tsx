import ProfessionalPageDetails from "@/components/Professional/ProfessionalPageDetails";
import JsonLd from "@/components/seo/JsonLd";
import TagTypes from "@/helpers/config/TagTypes";
import { fetchWithAuth } from "@/lib/fetchWraper";
import { breadcrumbSchema, professionalSchema } from "@/lib/seo/schema";
import { pageMetadata, toPlainText } from "@/lib/seo/site";
import { IProfessionalUser } from "@/types";
import { getMediaUrl } from "@/utils/mediaUrl";
import React from "react";
import { notFound } from "next/navigation";
import { isMissingRecord } from "@/lib/isMissingRecord";

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

// Used by generateMetadata and the page (fetch memoization runs the request only once per render).
// The profile does not depend on the review filter, yet the page re-renders on every sort / star tap
// (the filter lives in the URL). A short cache keeps those taps from re-fetching the whole profile;
// mutations still invalidate it through the tag.
const getProfessional = async (id: string): Promise<{ status: number; user?: IProfessionalUser }> => {
  const res = await fetchWithAuth(`/users/${id}`, {
    next: {
      tags: [TagTypes.prfessional],
      revalidate: 60,
    },
  });
  return { status: res.status, user: (await res.json())?.data };
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
  let result: Awaited<ReturnType<typeof getProfessional>> | undefined;
  try {
    result = await getProfessional(id);
  } catch {
    // API not reachable, use the generic title below
  }
  // Outside the try: notFound() works by throwing. Unknown id → real 404, not an empty profile.
  if (result && isMissingRecord(result.status, result.user)) notFound();

  const user = result?.user;
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

  const { status, user } = await getProfessional(id);
  if (isMissingRecord(status, user)) notFound();
  const professionalUser = user as IProfessionalUser;

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
