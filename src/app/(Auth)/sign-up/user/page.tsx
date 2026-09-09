import AuthSectionTemplate from "@/components/ui/AuthSectionTemplet";
import { AllImages } from "../../../../../public/assets/AllImages";
import SignUpUser from "@/components/Auth/SignUpUser";
import { fetchWithAuth } from "@/lib/fetchWraper";
import TagTypes from "@/helpers/config/TagTypes";
import { ITown } from "../professional/legal-invoice/page";



const page = async () => {
  const res = await fetchWithAuth(
    `/town`,
    {
      next: {
        tags: [TagTypes.town],
      },
    }
  );

  const data = await res.json();
  const townData: ITown[] = data?.data || [];
  return (
    <div>
      <AuthSectionTemplate imageScr={AllImages.signupuser} showLogo={false}>
        <SignUpUser townData={townData} />
      </AuthSectionTemplate>
    </div>
  );
};

export default page;
