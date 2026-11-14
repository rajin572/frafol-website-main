import { staticPageMetadata } from "@/lib/seo/pages";
import Container from "@/components/ui/Container";
import BrowseHeader from "@/components/shared/BrowseHeader";
import WorkshopsPage from "@/components/Workshops/WorkshopsPage";
import React from "react";
import JsonLd from "@/components/seo/JsonLd";
import { workshopListSchema } from "@/lib/seo/schema";
import { AllImages } from "../../../../public/assets/AllImages";
import TagTypes from "@/helpers/config/TagTypes";
import { IProfile, IWorkshop } from "@/types";
import { fetchWithAuth } from "@/lib/fetchWraper";
import { getAuthToken } from "@/lib/getAuthToken";

export const metadata = staticPageMetadata("workshops");

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;

  const page = Number(params?.page) || 1;
  const searchText = params?.search || "";
  const limit = 12;

  const res = await fetchWithAuth(
    `/workshop?page=${page}&limit=${limit}&searchTerm=${searchText}`,
    {
      next: {
        tags: [TagTypes.workshop],
      },
    }
  );

  const data = await res.json();

  const totalData = data?.data?.meta?.total;

  const workshops: IWorkshop[] = data?.data?.result || [];

  // Only fetch the logged-in user's profile when there is an access token. Guests have
  // no profile, so this authed call would just fail for them.
  const accessToken = await getAuthToken();

  let myData: IProfile | undefined;

  if (accessToken) {
    const profileRes = await fetchWithAuth("/users/my-profile", {
      next: {
        tags: [TagTypes.profile],
      },
    });

    const profiledata = await profileRes.json();
    myData = profiledata?.data;
  }

  return (
    <main>
      {workshops.length > 0 && <JsonLd data={workshopListSchema(workshops)} />}
      {/* title="Photography & Videography Workshops" */}
      {/* description="Learn new skills and techniques from industry professionals." */}
      <BrowseHeader
        image={AllImages.workspaceBanner}
        title="Fotografické a video workshopy"
        description="Objavte praktické kurzy vedené fotografmi a kameramanmi z praxe."
      />
      <Container>
        <WorkshopsPage
          workshops={workshops}
          myData={myData}
          totalData={totalData}
          page={page}
          limit={limit}
        />
      </Container>
    </main>
  );
};

export default page;
