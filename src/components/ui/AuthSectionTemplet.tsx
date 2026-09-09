import Image, { StaticImageData } from "next/image";
import React from "react";
import Container from "./Container";
import AuthSectionLogo from "./AuthSectionLogo";

const AuthSectionTemplate = ({
  children,
  imageScr,
  skip = false,
  showLogo = false,
}: {
  children: React.ReactNode;
  imageScr: StaticImageData | string;
  skip?: boolean;
  showLogo?: boolean;
}) => {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-3 relative">
      <div className="lg:col-span-2 min-h-[94vh] flex flex-col justify-center items-center">
        <Container className="h-full">
          <div className="flex flex-col gap-5 h-full">
            <AuthSectionLogo skip={skip} showLogo={showLogo} />
            {children}
          </div>
        </Container>
      </div>
      <div className="lg:col-span-1 w-full">
        <Image
          src={imageScr}
          alt="Auth Background"
          width={2000}
          height={2000}
          className="hidden lg:block w-1/3 h-screen fixed top-0  object-cover"
        />
      </div>
    </div>

  );
};

export default AuthSectionTemplate;
