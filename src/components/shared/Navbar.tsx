/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getFriendlyErrorMessage } from "@/utils/errorMessage";
import Container from "@/components/ui/Container";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import useOutsideClick from "@/hook/useOutsideClick";
import { AllImages } from "../../../public/assets/AllImages";
import { usePathname, useRouter } from "next/navigation";
import { Dropdown, MenuProps } from "antd";
import * as motion from "motion/react-client";
import { useScroll, useMotionValueEvent } from "motion/react";
import { TbLogout2 } from "react-icons/tb";
import { IoMdCart } from "react-icons/io";
import { GoBellFill } from "react-icons/go";
import { AiFillMessage } from "react-icons/ai";
import { MdOutlineDashboard } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import { ArrowRight, Menu, X } from "lucide-react";
import Cookies from "js-cookie";
import { INotification, ISignInUser } from "@/types";
import { decodedToken } from "@/utils/jwt";
import { logout } from "@/services/AuthService";
import { getMediaUrl } from "@/utils/mediaUrl";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { formatDateTime } from "@/utils/dateFormet";
import { useSocket } from "@/context/socket-context";
import { toast } from "sonner";
import { clearCart } from "@/redux/features/cart/cartSlice";
import { clearSelectedChatUser } from "@/redux/features/conversation/conversationSlice";
import { getNotificationRedirectUrl } from "@/utils/notificationRedirect";
import { getMyNotifications } from "@/services/Others/NotificationApi";
import { getUnreadMessageCount } from "@/services/ConversationService/ConversationServiceApi";

const NavItems = [
  /* { id: "1", name: "Photography", route: "/photography" }, */
  { id: "1", name: "Fotografi", route: "/photography" },
  /* { id: "2", name: "Videography", route: "/videography" }, */
  { id: "2", name: "Kameramani", route: "/videography" },
  /* { id: "1", name: "Marketplace", route: "/marketplace" }, */
  { id: "3", name: "Bazár", route: "/marketplace" },
  /* { id: "1", name: "Forums", route: "/forums" }, */
  { id: "4", name: "Fórum", route: "/forums" },
  /* { id: "1", name: "Workshops", route: "/workshops" }, */
  { id: "5", name: "Kurzy", route: "/workshops" },
];

// A nav item is active on its own page and on its sub-pages (/photography/<id>).
const isActiveRoute = (path: string, route: string) =>
  path === route || path.startsWith(`${route}/`);

// Small count bubble on the message / bell / cart icons.
const CountBadge = ({ count }: { count: number }) =>
  count > 0 ? (
    <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-third-color px-1 text-[11px] font-extrabold text-base-color ring-2 ring-secondary-color">
      {count > 99 ? "99+" : count}
    </span>
  ) : null;

const iconButtonClass =
  "relative flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20";

const Navbar = ({ notifications }: { notifications: INotification[] }) => {
  const router = useRouter();
  const token = Cookies.get("frafolMainAccessToken");
  const userData: ISignInUser | null = decodedToken(token || "");
  const socket = useSocket()?.socket;
  const path = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [height, setHeight] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);
  const [allNotifications, setAllNotifications] = useState<INotification[]>([]);
  const navbarRef = useRef<HTMLDivElement>(null);
  const navbarWrapperRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const dispatch = useAppDispatch();


  useOutsideClick(navbarWrapperRef, () => setMobileMenuOpen(false));

  // The navbar lives in the root layout, which is NOT re-rendered on client-side navigation,
  // so the server-provided list goes stale. Seed from it, then keep it fresh below.
  useEffect(() => {
    setAllNotifications(notifications);
    setNotificationCount(notifications.filter((n) => !n.isRead).length);
  }, [notifications]);

  // Reload the latest notifications. `updateCount` also recomputes the unread badge.
  const refreshNotifications = useCallback(async (updateCount: boolean) => {
    const fresh = await getMyNotifications();
    if (!fresh) return;
    setAllNotifications(fresh);
    if (updateCount) setNotificationCount(fresh.filter((n) => !n.isRead).length);
  }, []);

  // The unread-messages badge. The socket only tells us about messages that arrive while this tab
  // is connected, so the count would be 0 after a reload or for messages received while away.
  // The chat list's own unread counts are the source of truth: load them on mount, on every
  // page change and whenever a message event arrives.
  const refreshMessageCount = useCallback(async (fallback?: number) => {
    const count = await getUnreadMessageCount();
    if (count !== null) setMessageCount(count);
    else if (fallback !== undefined) setMessageCount(fallback);
  }, []);

  // A conversation was opened (and so read) on the messages page: update the badge.
  useEffect(() => {
    const onChatRead = () => refreshMessageCount();
    window.addEventListener("frafol:chat-read", onChatRead);
    return () => window.removeEventListener("frafol:chat-read", onChatRead);
  }, [refreshMessageCount]);

  // Page change (client navigation) → pick up notifications and messages that arrived meanwhile.
  useEffect(() => {
    if (!token) return;
    refreshNotifications(true);
    refreshMessageCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);



  const isDashboard = path.includes("dashboard");

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? latest;
    const delta = latest - previous;

    // Hide while scrolling DOWN, show again as soon as the user scrolls UP (or is near the
    // top). Events with no real movement are ignored: treating them as "not down" made the
    // bar flip straight back to visible right after it hid.
    if (isDashboard || mobileMenuOpen || latest <= 150) {
      setHidden(false);
    } else if (delta > 2) {
      setHidden(true);
    } else if (delta < -2) {
      setHidden(false);
    }

    if (latest > 10) {
      setScrolled(true);
    } else setScrolled(false);
  });

  useEffect(() => {
    // Calculate the height of the content when it opens or closes
    if (mobileMenuOpen) {
      setHeight(navbarRef.current!.scrollHeight); // Set to the content's height when open
    } else {
      setHeight(0); // Set to 0 when closed
    }
  }, [mobileMenuOpen]);

  const isProfessional = userData?.role === "both" ||
    userData?.role === "videographer" ||
    userData?.role === "photographer";
  const items: MenuProps["items"] = [
    {
      key: "1",
      label:
        userData?.role === "user" || userData?.role === "company" ? (
          <Link href="/dashboard/my-account/overview">Môj účet</Link>
        ) : userData?.role === "photographer" ||
          userData?.role === "videographer" ||
          userData?.role === "both" ? (
          <Link href="/dashboard/professional/overview">Môj účet</Link>
        ) : (
          <Link href="/">Môj účet</Link>
        ),
      icon: <MdOutlineDashboard className="text-secondary-color !text-base" />,
    },
    ...(isProfessional ? [
      {
        key: "2",
        label: <Link href="/helpful-documents">Užitočné dokumenty</Link>,
        icon: (
          <IoDocumentTextOutline className="text-secondary-color !text-base" />
        ),
      },
    ] : []),
  ];

  const notificationMenu = (
    <div className="w-[340px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5">
      <div className="flex items-center justify-between border-b border-base-color/10 px-4 py-3">
        <p className="text-base font-extrabold text-base-color">Upozornenia</p>
        <GoBellFill className="text-secondary-color" />
      </div>
      <div className="flex max-h-[360px] flex-col gap-1 overflow-y-auto p-2">
        {allNotifications?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())?.slice(0, 6)?.map((notification: INotification) => (
          <Link
            href={getNotificationRedirectUrl(notification, userData?.role)}
            className={`block rounded-xl p-2.5 transition duration-200 hover:bg-background-color ${notification?.isRead ? "" : "bg-secondary-color/[0.04]"}`}
            key={notification?._id}
          >
            <div className="flex items-start gap-3">
              {notification?.message?.image ? (
                <Image
                  src={getMediaUrl(notification.message.image)}
                  alt="Avatar"
                  width={36}
                  height={36}
                  className="size-9 shrink-0 rounded-full border border-gray-200 object-cover"
                />
              ) : (
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary-color/10">
                  <GoBellFill className="text-sm text-secondary-color" />
                </span>
              )}
              <div className="flex min-w-0 flex-col items-start">
                <p className="text-sm! text-base-color line-clamp-2">{notification?.message?.text}</p>
                <p className="text-xs! mt-1 text-gray-400">{formatDateTime(notification?.createdAt, "notification")}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="border-t border-base-color/10 p-3">
        <Link
          href={`/notifications`}
          className="flex w-full items-center justify-center gap-2 rounded-full !bg-secondary-color py-2 text-sm font-bold !text-primary-color transition hover:opacity-90"
        >
          Zobraziť viac <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  );

  const handleLogOut = () => {
    logout();
    setTimeout(() => {
      router.push("/");
    });
    dispatch(clearCart());
    dispatch(clearSelectedChatUser());
  };

  const cartProducts = useAppSelector(
    (state: RootState) => state.cart.products
  );

  const totalCart = cartProducts?.length;

  // New socket message handler
  const handleNotification = useCallback((notification: any) => {
    if (!notification?.message?.text) {
      setNotificationCount(notification?.unreadCount);
    } else {
      const newNotification: INotification = {
        _id: Math.random().toString(36).substring(2, 9),
        userId: Math.random().toString(36).substring(2, 9),
        receiverId: Math.random().toString(36).substring(2, 9),
        message: notification?.message,
        type: notification?.type || "",
        isRead: false,
        createdAt: notification?.timestamp,
        updatedAt: notification?.timestamp,
        __v: 0,
      }
      setAllNotifications((prev) => [...prev, newNotification]);
      setNotificationCount((prev) => prev + 1);
      // Replace the placeholder with the stored record (real id, correct order).
      refreshNotifications(false);
    }
  }, [refreshNotifications]);

  // Unread message count from socket. res: { statusCode, success, unreadCount }
  // Re-read the real count from the chat list; the event's own number is only the fallback.
  const handleMessageCount = useCallback((data: any) => {
    const count = typeof data === "number" ? data : data?.unreadCount;
    refreshMessageCount(count ?? 0);
  }, [refreshMessageCount]);

  // A message arrived: the chat list has the new unread total.
  const handleNewMessage = useCallback(() => {
    refreshMessageCount();
  }, [refreshMessageCount]);

  useEffect(() => {
    if (!socket) return;

    if (!socket.connected) {
      socket.connect();
    }

    socket.on(`notification`, handleNotification);
    socket.on(`message_count`, handleMessageCount);
    socket.on(`newMessage`, handleNewMessage);
    // Once connected (also after a reconnect) load the current count.
    socket.on(`connect`, handleNewMessage);

    return () => {
      socket.off(`notification`, handleNotification);
      socket.off(`message_count`, handleMessageCount);
      socket.off(`newMessage`, handleNewMessage);
      socket.off(`connect`, handleNewMessage);
    };
  }, [socket, handleNotification, handleMessageCount, handleNewMessage]);

  const handleResetNotification = async () => {
    if (notificationCount > 0) {
      try {
        socket?.emit("readNotification");
      } catch (error: any) {
        toast.error(
          getFriendlyErrorMessage(error?.data?.message || error?.message),
          { duration: 2000 }
        );
      }
    }
  };

  const handleResetMessage = () => {
    if (messageCount > 0) {
      try {
        socket?.emit("readMessage");
        // No manual reset to 0: the badge follows the unread counts of the conversations, which
        // are refreshed on the page change that follows.
        dispatch(clearSelectedChatUser());
      } catch (error: any) {
        toast.error(
          getFriendlyErrorMessage(error?.data?.message || error?.message),
          { duration: 2000 }
        );
      }
    }
  };

  // Message / bell / cart / avatar. Same on desktop and mobile.
  const userIcons = (
    <div className="flex items-center gap-2 sm:gap-2.5">
      <Link href="/message" onClick={handleResetMessage} aria-label="Správy" className={iconButtonClass}>
        <AiFillMessage className="text-xl" />
        <CountBadge count={messageCount} />
      </Link>

      <Dropdown
        overlay={notificationMenu}
        trigger={["hover"]}
        onOpenChange={(open) => {
          if (open) refreshNotifications(false);
          handleResetNotification();
        }}
        placement="bottomRight"
      >
        <button type="button" aria-label="Upozornenia" className={`${iconButtonClass} cursor-pointer`}>
          <GoBellFill className="text-xl" />
          <CountBadge count={notificationCount} />
        </button>
      </Dropdown>

      <Link href="/cart" aria-label="Košík" className={iconButtonClass}>
        <IoMdCart className="text-xl" />
        <CountBadge count={totalCart} />
      </Link>

      <Dropdown
        menu={{ items }}
        trigger={["hover"]}
        rootClassName="min-w-[200px]! lg:min-w-fit!"
        placement="bottomRight"
      >
        <span className="ml-1 cursor-pointer rounded-full p-0.5 ring-2 ring-white/60 transition hover:ring-third-color">
          <Image
            src={userData?.profileImage ? getMediaUrl(userData?.profileImage) : AllImages.dummyProfile}
            alt="profile_img"
            width={36}
            height={36}
            className="size-8 xl:size-9 rounded-full object-cover"
          />
        </span>
      </Dropdown>
    </div>
  );

  return (
    <motion.div
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`!z-[99999] relative bg-secondary-color text-primary-color transition-shadow duration-300 ${scrolled || mobileMenuOpen ? "shadow-lg shadow-black/15" : ""}`}
      ref={navbarWrapperRef}
    >
      <Container>
        <header className="mx-auto flex h-16 items-center justify-between gap-4 text-base">
          {/* Logo */}
          <Link href="/" aria-label="Frafol" className="flex shrink-0 cursor-pointer items-center transition-transform hover:scale-[1.03]">
            <Image
              src={AllImages.logo}
              alt="logo"
              width={1000}
              height={315}
              sizes="160px"
              priority
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop links */}
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-1 rounded-full bg-black/10 p-1">
              {NavItems.map((navItem) => {
                const active = isActiveRoute(path, navItem.route);
                return (
                  <li key={navItem.id}>
                    <Link
                      href={navItem.route}
                      className={`block rounded-full px-4 xl:px-5 py-2 text-[15px] font-bold transition-all duration-300 ${active
                        ? "bg-white text-secondary-color shadow-sm"
                        : "text-white/90 hover:bg-white/10 hover:text-white"
                        }`}
                    >
                      {navItem.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Desktop right side */}
          <div className="hidden items-center gap-3 lg:flex">
            {userData?.email ? (
              <>
                {userIcons}
                <button
                  type="button"
                  onClick={handleLogOut}
                  className="ml-1 inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/40 py-1.5 pl-4 pr-1.5 text-sm font-bold text-white transition hover:border-white hover:bg-white hover:text-secondary-color"
                >
                  {/* Logout */}Odhlásiť sa
                  <span className="flex size-7 items-center justify-center rounded-full bg-white text-secondary-color">
                    <TbLogout2 className="text-base" />
                  </span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="rounded-full px-4 py-2 text-[15px] font-bold text-white transition hover:bg-white/10"
                >
                  {/* Sign In */}
                  Prihlásenie
                </Link>
                <Link
                  href="/join"
                  className="group inline-flex items-center gap-2 rounded-full bg-white py-1.5 pl-5 pr-1.5 text-[15px] font-extrabold text-secondary-color shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  {/* Join */}
                  Registrácia
                  <span className="flex size-7 items-center justify-center rounded-full bg-secondary-color text-white transition-transform group-hover:translate-x-0.5">
                    <ArrowRight className="size-4" />
                  </span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile right side */}
          <div className="flex select-none items-center gap-2 lg:hidden">
            {userData?.email && <div className="hidden min-[420px]:block">{userIcons}</div>}
            <button
              type="button"
              aria-label={mobileMenuOpen ? "Zavrieť menu" : "Otvoriť menu"}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            >
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </header>
      </Container>

      {/* Mobile / tablet menu */}
      <div
        ref={navbarRef}
        style={{
          height: `${height}px`,
          overflow: "hidden",
          transition: "height 0.3s ease",
        }}
        className="absolute left-0 top-full w-full bg-secondary-color lg:hidden"
      >
        <Container>
          <div className="flex flex-col gap-1.5 border-t border-white/15 py-4">
            {/* Very small phones: the icons live in the menu instead of the bar */}
            {userData?.email && <div className="mb-2 flex justify-center min-[420px]:hidden">{userIcons}</div>}
            {NavItems.map((navItem) => {
              const active = isActiveRoute(path, navItem.route);
              return (
                <Link
                  key={navItem.id}
                  href={navItem.route}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between rounded-2xl px-4 py-3 text-base font-bold transition ${active ? "bg-white text-secondary-color" : "text-white hover:bg-white/10"
                    }`}
                >
                  {navItem.name}
                  <ArrowRight className={`size-4 ${active ? "" : "opacity-50"}`} />
                </Link>
              );
            })}

            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-white/15 pt-4">
              {userData ? (
                <button
                  type="button"
                  onClick={() => { setMobileMenuOpen(false); handleLogOut() }}
                  className="col-span-2 inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-white/40 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-secondary-color"
                >
                  {/* Logout */}Odhlásiť sa <TbLogout2 className="text-lg" />
                </button>
              ) : (
                <>
                  <Link
                    onClick={() => setMobileMenuOpen(false)}
                    href="/sign-in"
                    className="rounded-full border border-white/50 py-3 text-center text-sm font-bold text-white"
                  >
                    {/* Sign In */}
                    Prihlásenie
                  </Link>
                  <Link
                    onClick={() => setMobileMenuOpen(false)}
                    href="/join"
                    className="rounded-full bg-white py-3 text-center text-sm font-extrabold text-secondary-color"
                  >
                    {/* Join */}
                    Registrácia
                  </Link>
                </>
              )}
            </div>
          </div>
        </Container>
      </div>
    </motion.div>
  );
};

export default Navbar;
