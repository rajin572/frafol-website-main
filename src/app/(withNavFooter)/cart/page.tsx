import CartSection from "@/components/Cart/CartSection";
import TagTypes from "@/helpers/config/TagTypes";
import { fetchWithAuth } from "@/lib/fetchWraper";
import { IProfile } from "@/types";
import React from "react";

const page = async () => {
  const res = await fetchWithAuth("/users/my-profile", {
    next: {
      tags: [TagTypes.profile],
    },
  });

  const data = await res.json();

  const myData: IProfile = data?.data;

  console.log(data)
  return (
    <main className="py-10">
      <CartSection myData={myData} />
    </main>
  );
};

export default page;
