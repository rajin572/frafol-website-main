import SignIn from "@/components/Auth/SignIn";
import React from "react";

export const metadata = {
  title: "Prihlásenie | Frafol",
};

const page = () => {
  return (
    <div>
      <SignIn />
    </div>
  );
};

export default page;
