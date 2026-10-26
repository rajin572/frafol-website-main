import { redirect } from "next/navigation";

// The calendar page was removed (it did not work properly). Old links / bookmarks go to the
// dashboard overview instead of showing an error.
const page = () => {
  redirect("/dashboard/professional/overview");
};

export default page;
