import React from "react";
import SectionHeader from "../ui/SectionHeader";
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
    <div className="mt-16">
      <SectionHeader title="My Services" className="mb-3" />
      {packages?.length > 0 ? (
        <div
          className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          suppressHydrationWarning={true}
        >
          {packages?.map((item, index) => (
            <ProfessionalServiceCard key={index} data={item} myData={myData} professionalUser={professionalUser} />
          ))}
        </div>
      ) : (
        <NoResultFound
          title="No Service Available"
          description="This professional has not added any services yet."
        />
      )}
    </div>
  );
};

export default ProfessionalPageDetailsMyServices;
