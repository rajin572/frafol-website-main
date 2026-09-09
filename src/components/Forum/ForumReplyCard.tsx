"use client";
import Image from "next/image";
import React from "react";
import { AllImages } from "../../../public/assets/AllImages";
import { ICommunityComment, IReply } from "@/types";
import { getServerUrl } from "@/helpers/config/envConfig";
import { formatDateTime } from "@/utils/dateFormet";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const ForumReplyCard = ({ item }: { item: ICommunityComment }) => {
  const serverUrl = getServerUrl();
  const [isReplyVisible, setIsReplyVisible] = React.useState(false);

  console.log(item)

  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const { replace } = router;

  const handleReply = (value: ICommunityComment) => {

    const name = value?.user?.name;
    const id = value?._id;

    const params = new URLSearchParams(searchParams);

    params.set("reply", id);
    params.set("to", name);


    replace(`${pathName}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="border-b-2 border-background-color pb-5 mt-5 w-full">
      <div className="text-sm sm:text-sm lg:text-base flex items-center gap-2 h-full">
        <Image
          width={1000}
          height={1000}
          src={
            item?.user?.profileImage
              ? serverUrl + item?.user?.profileImage
              : AllImages?.dummyProfile
          }
          alt="user"
          className="w-12 h-12 object-cover rounded-full "
        />
        <div>
          {
            item?.user?.role === "photographer" || item?.user?.role === "both" || item?.user?.role === "videographer" ? (
              <Link href={`/professionals/${item?.user?._id}`} className="text-secondary-color text-sm sm:text-sm lg:text-base font-bold cursor-pointer">

                <p className="text-sm sm:text-sm lg:text-base font-bold">
                  {item?.user?.name}
                </p>
              </Link>
            ) :

              <p className="text-sm sm:text-sm lg:text-base font-bold">
                {item?.user?.name}
              </p>
          }

          <p className=" lg:text-sm text-base-color/50">
            {formatDateTime(item?.createdAt)}
          </p>
        </div>
      </div>
      <div className=" h-full mt-2 w-full">
        <p className="text-sm sm:text-base lg:text-lg text-base-color/70 break-words">{item?.text}</p>
        <p className="text-sm sm:text-sm text-secondary-color cursor-pointer font-bold w-fit ml-auto underline" onClick={() => handleReply(item)}>{/* Reply */} Odpovedať</p>

      </div>
      {
        item?.replies?.length > 0 && (
          <p className="text-sm sm:text-sm text-secondary-color cursor-pointer font-bold w-fit select-none" onClick={() => setIsReplyVisible((prev) => !prev)}>{isReplyVisible ? /* Hide Replies */ "Skryť odpovede" : `Zobraziť odpovede (${item?.replies?.length})`}</p>
        )
      }
      <div className={`mt-2 w-[97%] bg-base-color/5 rounded-2xl  space-y-6 p-5 ml-auto ${isReplyVisible ? "block" : "hidden"}`}>
        {
          item?.replies?.map((reply: IReply, index: number) => (
            <div key={reply?._id} className={`${index < item?.replies?.length - 1 ? "border-b-2 border-base-color/20 pb-5" : ""}`}>
              <div className="text-sm sm:text-sm lg:text-base flex items-center gap-2 h-full ">
                <Image
                  width={1000}
                  height={1000}
                  src={
                    reply?.user?.profileImage
                      ? serverUrl + reply?.user?.profileImage
                      : AllImages?.dummyProfile
                  }
                  alt="user"
                  className="w-9 h-9 object-cover rounded-full "
                />
                <div>
                  {
                    item?.user?.role === "photographer" || item?.user?.role === "both" || item?.user?.role === "videographer" ? (
                      <Link href={`/professionals/${item?.user?._id}`} className="text-secondary-color text-sm sm:text-sm lg:text-base font-bold cursor-pointer">
                        <p className="text-sm lg:text-sm font-bold">
                          {reply?.user?.name}
                        </p>
                      </Link>
                    ) :
                      (<p className="text-sm lg:text-sm font-bold">
                        {reply?.user?.name}
                      </p>)
                  }
                  <p className=" lg:text-sm text-base-color/50">
                    {formatDateTime(reply?.createdAt)}
                  </p>
                </div>
              </div>
              <div className=" h-full mt-2 w-full">
                <p className=" sm:text-sm lg:text-base text-base-color/70 break-words">{reply?.text}</p>
              </div>
            </div>
          ))
        }
      </div>

    </div >
  );
};

export default ForumReplyCard;
