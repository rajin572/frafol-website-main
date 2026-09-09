/* eslint-disable @typescript-eslint/no-explicit-any */

import { GoBellFill } from "react-icons/go";
import { formatDateTime } from "../../../../utils/dateFormet";

const RecentNotification = ({
  notificationData,
}: {
  notificationData: any;
}) => {
  return (
    <div
      className="w-full max-h-[300px] xl:max-h-[600px] overflow-y-auto rounded-xl relative  border border-[#E1E1E1]"
      style={{ boxShadow: "0px 0px 5px 1px #0000000D" }}
    >
      <div className="flex justify-between items-center sticky top-0  px-5 pt-5 bg-white z-10 ">
        {/* <h1 className="text-xl font-semibold">Recent Activity</h1> */}
        <h1 className="text-xl font-semibold">Nedávna aktivita</h1>
      </div>

      <div className="flex flex-col gap-5 p-5 bg-primary-color">
        {notificationData?.map((activity: any, i: number) => (
          <div key={i} className="flex items-center gap-2">
            <div className=" p-1 bg-secondary-color rounded-full w-fit">
              <GoBellFill className="text-lg cursor-pointer text-primary-color" />
            </div>
            <div>
              <p className="text-[#242424] text-base font-medium">
                {activity?.message?.text}
              </p>

              <p className="text-sm text-[#8A8D8E] mt-1">
                {formatDateTime(activity?.createdAt)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentNotification;
