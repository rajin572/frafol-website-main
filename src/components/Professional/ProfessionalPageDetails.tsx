import React from "react";
import Container from "../ui/Container";
import Image from "next/image";
import { AllImages } from "../../../public/assets/AllImages";
import { FaStar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import ProfessionalPageDetailsMyServices from "./ProfessionalPageDetailsMyServices";
import ProfessionalPageDetailsMyWork from "./ProfessionalPageDetailsMyWork";
import ProfessionalPageDetailsBookSession from "./ProfessionalPageDetailsBookSession";
import ProfessionalReviews from "./ProfessionalReviews";
import Link from "next/link";
import { IProfessionalUser, IProfile, ISignInUser } from "@/types";
import { getMediaUrl } from "@/utils/mediaUrl";
import { fetchWithAuth } from "@/lib/fetchWraper";
import { getAuthToken } from "@/lib/getAuthToken";
import TagTypes from "@/helpers/config/TagTypes";
import { getCurrentUser } from "@/services/AuthService";
import CreateConversionButton from "./CreateConversionButton";
import ProfessionalShowMoreSection from "./ProfessionalShowMoreSection";
import ProfileSectionNav from "./ProfileSectionNav";
import ProfileSectionTitle from "./ProfileSectionTitle";

// Full width, same height as the "Požiadať o cenovú ponuku" button under it.
const messageButtonClass = "!w-full !py-5 !px-5 !rounded-lg !font-semibold !text-sm sm:!text-base !justify-center";

const ProfessionalPageDetails = async ({
  professionalUser,
  sort,
  rating,
}: {
  professionalUser: IProfessionalUser;
  sort: string;
  rating: string;
}) => {
  const userData: ISignInUser = await getCurrentUser();

  // Only fetch the logged-in user's profile when there is an access token. Guests have
  // no profile, so this authed call would just fail for them. Consumers below already
  // guard with optional chaining (myData?.role / myData?._id).
  const accessToken = await getAuthToken();

  let myData: IProfile = undefined as unknown as IProfile;

  if (accessToken) {
    const res = await fetchWithAuth("/users/my-profile", {
      next: {
        tags: [TagTypes.profile],
      },
    });

    const data = await res.json();
    myData = data?.data;

    console.log("my data =>>> ", myData)
  }

  return (
    <main className="pb-20">
      {/* ---------- Identity ---------- */}
      <Container>
        <div className="flex flex-col items-center gap-5 pt-12 text-center sm:flex-row sm:gap-7 sm:pt-14 sm:text-left">
          {/* <ProfessionalDetailsPageSlider item={professionalUser} /> */}
          <Image
            width={400}
            height={400}
            src={
              professionalUser?.profileImage?.length > 0
                ? getMediaUrl(professionalUser?.profileImage)
                : AllImages?.dummyProfile
            }
            alt="user"
            priority
            className="size-28 sm:size-32 shrink-0 rounded-full object-cover border border-base-color/10"
          />
          <div>
            {professionalUser?.hasActiveSubscription && (
              <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-secondary-color px-3 py-1">
                <Image
                  src={AllImages?.batch}
                  width={40}
                  height={40}
                  alt={professionalUser?.name || "item Image"}
                  className="size-4"
                />
                <p className="text-xs sm:text-sm font-bold text-white">Odporúča Frafol</p>
              </div>
            )}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-base-color">
              {professionalUser?.name}
            </h1>
            <p className="mt-1 text-base sm:text-lg font-semibold text-secondary-color">
              {professionalUser?.role === "both"
                ? "Fotograf aj Kameraman"
                : professionalUser?.role === "photographer"
                  ? "Fotograf"
                  : "Videograf"}
            </p>
          </div>
        </div>
      </Container>

      {/* ---------- Section links (sticky) ---------- */}
      <div className="sticky top-0 z-30 mt-8 border-b border-base-color/10 bg-white">
        <Container>
          <ProfileSectionNav />
        </Container>
      </div>

      <Container>
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* ---------- Side card: price, rating, town and actions ---------- */}
          <aside className="lg:order-last lg:col-span-4">
            <div className="rounded-2xl border border-base-color/10 bg-white p-6 lg:sticky lg:top-[88px]">
              <p className="text-sm font-medium text-base-color/60">Cenové rozpätie:</p>
              <p className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-base-color">
                {professionalUser?.minHourlyRate}€ - {professionalUser?.maxHourlyRate}€
              </p>

              <div className="mt-5 space-y-3 border-t border-base-color/10 pt-5 text-sm sm:text-base text-base-color/80">
                <Link
                  href="#reviews"
                  className="flex items-center gap-2.5 font-medium transition-colors hover:text-secondary-color"
                >
                  <FaStar className="text-[#FFD700]" />
                  <span>
                    {professionalUser?.averageRating?.toFixed(1)} ({professionalUser?.totalReview} Recenzie)
                  </span>
                </Link>
                <p className="flex items-center gap-2.5 font-medium">
                  <FaLocationDot className="text-secondary-color" />
                  <span>{professionalUser?.town}</span>
                </p>
              </div>

              {/* Which buttons show depends on who is looking (unchanged rules) */}
              {myData?.role === "user" ? (
                <div className="mt-6 flex flex-col gap-3">
                  <CreateConversionButton userId={professionalUser?._id} name={professionalUser?.name} className={messageButtonClass} />
                  <ProfessionalPageDetailsBookSession
                    myData={myData}
                    professionalUser={professionalUser}
                  />
                </div>
              ) : myData?.role === "company" ? (
                <div className="mt-6 flex flex-col gap-3">
                  <CreateConversionButton userId={professionalUser?._id} name={professionalUser?.name} className={messageButtonClass} />

                  <ProfessionalPageDetailsBookSession
                    myData={myData}
                    professionalUser={professionalUser}
                  />
                </div>
              ) : myData?.role && userData?.userId !== professionalUser?._id ? (
                <div className="mt-6 flex flex-col gap-3">
                  <CreateConversionButton userId={professionalUser?._id} name={professionalUser?.name} className={messageButtonClass} />
                </div>
              ) : (
                !myData?._id && (
                  <div className="mt-6 flex flex-col gap-3">
                    <ProfessionalPageDetailsBookSession
                      myData={myData}
                      professionalUser={professionalUser}
                    />
                  </div>
                )
              )}
            </div>
          </aside>

          {/* ---------- Sections ---------- */}
          <div className="min-w-0 space-y-16 lg:col-span-8">
            <section id="about" className="scroll-mt-24">
              <ProfileSectionTitle>O mne</ProfileSectionTitle>
              <p className="mt-5 whitespace-pre-line text-base lg:text-lg leading-relaxed text-base-color/80">
                {professionalUser?.profileId?.about}
              </p>
            </section>

            <ProfessionalPageDetailsMyWork
              gallery={professionalUser?.gallery?.slice(0, 9)}
              professionalId={professionalUser?._id}
            />
            <ProfessionalPageDetailsMyServices
              packages={professionalUser?.package}
              myData={myData}
              professionalUser={professionalUser}
            />
            <ProfessionalReviews
              professionalUser={professionalUser}
              sort={sort}
              rating={rating}
            />

            <ProfessionalShowMoreSection professionalUser={professionalUser} />
          </div>
        </div>
      </Container>
    </main>
  );
};

export default ProfessionalPageDetails;
