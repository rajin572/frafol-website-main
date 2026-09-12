import PaginationSection from "@/components/shared/PaginationSection";
import Container from "@/components/ui/Container";
import { fetchWithAuth } from "@/lib/fetchWraper";
import { INotification } from "@/types";
import { formatDateTime } from "@/utils/dateFormet";
import { FiBell } from "react-icons/fi";
import { getCurrentUser } from "@/services/AuthService";
import { getNotificationRedirectUrl } from "@/utils/notificationRedirect";
import { getServerUrl } from "@/helpers/config/envConfig";
import Link from "next/link";
import Image from "next/image";

const Notifications = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const params = await searchParams;
    const page = Number(params?.page) || 1;
    const limit = 10;
    const serverUrl = getServerUrl();

    const [res, currentUser] = await Promise.all([
        fetchWithAuth(`/notifications/my-notifications?page=${page}&limit=10`),
        getCurrentUser(),
    ]);
    const data = await res.json();
    const role = currentUser?.role;

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
                        notifications?.map((notification: INotification) => (
                            <Link
                                href={getNotificationRedirectUrl(notification, role)}
                                key={notification?._id}
                                className={`flex items-center space-x-3 p-3 border-b border-gray-300 last:border-none hover:bg-gray-50 rounded-lg transition duration-200 cursor-pointer block ${
                                    !notification?.isRead ? "bg-orange-50/40" : ""
                                }`}
                            >
                                <div className="flex items-center space-x-3">
                                    {/* Icon or Profile Image */}
                                    {notification?.message?.image ? (
                                        <Image
                                            src={
                                                notification.message.image.startsWith("http")
                                                    ? notification.message.image
                                                    : `${serverUrl}${notification.message.image}`
                                            }
                                            alt="Notification Avatar"
                                            width={44}
                                            height={44}
                                            className="w-11 h-11 rounded-full object-cover shrink-0 border border-gray-200"
                                        />
                                    ) : (
                                        <div className="bg-[#b8c1c3] p-2 rounded-full shrink-0">
                                            <FiBell className="text-secondary-color w-6 h-6" />
                                        </div>
                                    )}

                                    {/* Notification text */}
                                    <div className="flex flex-col">
                                        <span className="text-base sm:text-lg font-medium text-gray-800">
                                            {notification?.message?.text}
                                        </span>
                                        <span className="text-xs sm:text-sm text-gray-500 mt-0.5">
                                            {formatDateTime(notification?.createdAt)}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))
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
