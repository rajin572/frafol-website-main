import React from "react";
import ProfileSectionTitle from "./ProfileSectionTitle";
import ProfessionalServiceCard from "../shared/ProfessionalServiceCard";
import { IPackage, IProfessionalUser, IProfile } from "@/types";
import NoResultFound from "../shared/NoResultFound";

const ProfessionalPageDetailsMyServices = ({
  packages,
  myData,
  professionalUser
}: {
  packages: IPackage[];
  myData: IProfile;
  professionalUser: IProfessionalUser;

}) => {
  return (
    <section id="packages" className="scroll-mt-24">
      <ProfileSectionTitle>Moje balíky</ProfileSectionTitle>
      {packages?.length > 0 ? (
        <div
          className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6"
          suppressHydrationWarning={true}
        >
          {packages?.map((item, index) => (
            <ProfessionalServiceCard key={index} data={item} myData={myData} professionalUser={professionalUser} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-base-color/10 py-8">
          <NoResultFound
            title="Zatiaľ žiadne balíky"
            description="Tento profesionál zatiaľ nepridal žiadne balíky."
          />
        </div>
      )}
    </section>
  );
};

export default ProfessionalPageDetailsMyServices;
