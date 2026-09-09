import { ITown } from "@/app/(Auth)/sign-up/professional/legal-invoice/page";
import ProfileSettingsPage from "@/components/Dashboard/User/ProfileSettings/ProfileSettingsPage";
import TagTypes from "@/helpers/config/TagTypes";
import { fetchWithAuth } from "@/lib/fetchWraper";
import { ICategory, IProfile } from "@/types";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;
  const tab =
    (params?.tab as
      | "profile"
      | "portfolio"
      | "accountCredentials"
      | "unavailability"
      | "changePassword"
      | "deleteAccount") || "profile";
  const portfolio =
    (params?.portfolio as "introVideo" | "bannerImage" | "galleryImage") ||
    "introVideo";

  const res = await fetchWithAuth("/users/my-profile", {
    next: {
      tags: [TagTypes.profile],
    },
  });

  const data = await res.json();

  const myData: IProfile = data?.data;

  // const role = params?.sRol;

  // console.log(role)
  // const activeRole = (role === "videographer" ? "videoGraphy" : role === "photographer" ? "photoGraphy" : "") as
  //   | "photoGraphy"
  //   | "videoGraphy";

  const resRole = await fetchWithAuth(`/users/towns/categories`, {
    next: {
      tags: [TagTypes.category],
    },
  });
  const dataRole = await resRole.json();
  const categories: ICategory[] = dataRole?.data?.categories || [];
  const towns: ITown[] = dataRole?.data?.towns || [];

  const deleteStatus = {
    deleteRequestStatus: myData?.deleteRequestStatus ?? "none",
    deleteRequestReason: myData?.deleteRequestReason,
    deleteRequestedAt: myData?.deleteRequestedAt,
  };

  return (
    <ProfileSettingsPage
      activeTab={tab}
      portfolio={portfolio}
      myData={myData}
      categories={categories}
      towns={towns}
      deleteStatus={deleteStatus}
    />
  );
};

export default page;
