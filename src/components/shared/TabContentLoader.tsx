import { Spin } from "antd";

// Shown in the content area while the server fetches the newly chosen tab, instead of leaving the
// previous tab's content on screen (which looks frozen).
const TabContentLoader = () => (
  <div className="flex justify-center py-20">
    <Spin size="large" />
  </div>
);

export default TabContentLoader;
