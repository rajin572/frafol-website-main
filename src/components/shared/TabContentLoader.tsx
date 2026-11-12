import SpinLoader from "@/components/ui/SpinLoader";

// Shown in the content area while the server fetches the newly chosen tab, instead of leaving the
// previous tab's content on screen (which looks frozen). Uses the site's own spinner; the wrapper
// only makes it larger for a whole content area.
const TabContentLoader = () => (
  <div className="flex justify-center py-20 [&_svg]:w-10 [&_svg]:h-10">
    <SpinLoader />
  </div>
);

export default TabContentLoader;
