import PaginationSection from "@/components/shared/PaginationSection";
import Container from "@/components/ui/Container";
import { fetchWithAuth } from "@/lib/fetchWraper";
import { INotification } from "@/types";
import { formatDateTime } from "@/utils/dateFormet";
import { FiBell } from "react-icons/fi";

const Notifications = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const params = await searchParams;
    const page = Number(params?.page) || 1;
    const limit = 10;

    const res = await fetchWithAuth(`/notifications/my-notifications?page=${page}&limit=10`);
    const data = await res.json();

    const notifications: INotification[] = data?.data?.notifications || [];
    const totalNotifications: number = data?.data?.meta?.total || 0;

    return (
        <Container>
            <div
                className=" min-h-[88vh] pb-10 mt-10"
            >
                <div className="flex items-center bg-primary-color gap-1 py-3 mb-3 rounded-tl-xl rounded-tr-xl">


                    <h1 className="text-3xl font-bold text-secondary-color">Notification</h1>
                </div>
                <div className=" space-y-4 mb-10 min-h-[78vh]">
                    {
                        //             notificationFetching ? (
                        //                 <div className=" isolate aspect-video h-[78vh] bg-primary-color/40 backdrop-blur w-full flex justify-center items-center">
                        //                     <FadeLoader
                        //                         color="#0c3188
                        //   "
                        //                     />
                        //                 </div>
                        //             ) : (
                        notifications?.map((notification: INotification) => (
                            <div
                                key={notification?._id}
                                className="flex items-center space-x-3 p-2 border-b border-gray-300 last:border-none"
                            >
                                {/* Icon */}
                                <div className="bg-[#b8c1c3] p-2 rounded-full">
                                    <FiBell className="text-secondary-color w-6 h-6" />
                                </div>

                                {/* Notification text */}
                                <div className="flex flex-col">
                                    <span className="text-lg font-medium text-gray-700">
                                        {notification?.message?.text}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        {formatDateTime(notification?.createdAt)}
                                    </span>
                                </div>
                            </div>
                        ))
                        // )
                    }
                </div>
                <PaginationSection
                    page={page}
                    limit={limit}
                    totalData={totalNotifications}
                />
            </div>
        </Container>
    );
};
export default Notifications;
