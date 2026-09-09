/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Container from "@/components/ui/Container";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import useOutsideClick from "@/hook/useOutsideClick";
import { AllImages } from "../../../public/assets/AllImages";
import { usePathname, useRouter } from "next/navigation";
import { Button, Dropdown, MenuProps } from "antd";
import * as motion from "motion/react-client";
import { useScroll, useMotionValueEvent } from "motion/react";
import { TbLogout2 } from "react-icons/tb";
import { HiOutlineLogin } from "react-icons/hi";
import { IoMdCart } from "react-icons/io";
import { GoBellFill } from "react-icons/go";
import { AiFillMessage } from "react-icons/ai";
import { MdOutlineDashboard } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import Cookies from "js-cookie";
import { INotification, ISignInUser } from "@/types";
import { decodedToken } from "@/utils/jwt";
import { logout } from "@/services/AuthService";
import { getServerUrl } from "@/helpers/config/envConfig";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { formatDateTime } from "@/utils/dateFormet";
import { useSocket } from "@/context/socket-context";
import { toast } from "sonner";
import { clearCart } from "@/redux/features/cart/cartSlice";
import { clearSelectedChatUser } from "@/redux/features/conversation/conversationSlice";

const NavItems = [
  /* { id: "1", name: "Photography", route: "/photography" }, */
  { id: "1", name: "Fotografi", route: "/photography" },
  /* { id: "2", name: "Videography", route: "/videography" }, */
  { id: "2", name: "Kameramani", route: "/videography" },
  /* { id: "1", name: "Marketplace", route: "/marketplace" }, */
  { id: "1", name: "Bazár", route: "/marketplace" },
  /* { id: "1", name: "Forums", route: "/forums" }, */
  { id: "1", name: "Fórum", route: "/forums" },
  /* { id: "1", name: "Workshops", route: "/workshops" }, */
  { id: "1", name: "Kurzy", route: "/workshops" },
];



const Navbar = ({ notifications }: { notifications: INotification[] }) => {
  const router = useRouter();
  const serverUrl = getServerUrl();
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

  useEffect(() => {
    setAllNotifications(notifications);
  }, [notifications]);



  const isDashboard = path.includes("dashboard");

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (
      previous !== undefined &&
      latest > previous &&
      latest > 150 &&
      !isDashboard &&
      !mobileMenuOpen
    ) {
      setHidden(true);
    } else {
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

  console.log(userData)

  const isProfessional = userData?.role === "both" ||
    userData?.role === "videographer" ||
    userData?.role === "photographer";
  const items: MenuProps["items"] = [
    {
      key: "1",
      label:
        userData?.role === "user" || userData?.role === "company" ? (
          <Link href="/dashboard/my-account/overview">Dashboard</Link>
        ) : userData?.role === "photographer" ||
          userData?.role === "videographer" ||
          userData?.role === "both" ? (
          <Link href="/dashboard/professional/overview">Dashboard</Link>
        ) : (
          <Link href="/">Dashboard</Link>
        ),
      icon: <MdOutlineDashboard className="text-secondary-color !text-base" />,
    },
    ...(isProfessional ? [
      {
        key: "2",
        label: <Link href="/helpful-documents">Documents</Link>,
        icon: (
          <IoDocumentTextOutline className="text-secondary-color !text-base" />
        ),
      },
    ] : []),
  ];

  const notificationMenu = (
    <div
      className="flex flex-col gap-4 w-full bg-white p-4 rounded-lg"
      style={{ boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.25)" }}
    >
      {allNotifications?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())?.slice(0, 6)?.map((notification: INotification) => (
        <div className="test-start max-w-[300px]" key={notification?._id}>
          <div className="flex items-start gap-2">
            <div className="p-1 bg-secondary-color rounded-full w-fit h-fit mt-1">
              <GoBellFill className="text-white cursor-pointer" />
            </div>
            <div className="flex flex-col items-start">
              <p className="text-sm!">{notification?.message?.text}</p>
              <p className="text-sm! mt-0.5 text-gray-400">{formatDateTime(notification?.createdAt)}</p>
            </div>
          </div>
        </div>
      ))}
      <Link
        href={`/notifications`}
        className="w-2/3 mx-auto text-center !bg-secondary-color !text-primary-color rounded-xl h-8 py-1"
      >
        See More
      </Link>
    </div>
  );

  const handleLogOut = () => {
    logout();
    setTimeout(() => {
      router.push("/");
    });
    dispatch(clearCart());
    dispatch(clearSelectedChatUser());
    // setIsLoading(true);
    // if (protectedRoutes.some((route) => pathname.match(route))) {
    //   router.push("/");
    // }
  };

  const cartProducts = useAppSelector(
    (state: RootState) => state.cart.products
  );

  const totalCart = cartProducts?.length;

  // New socket message handler
  const handleNotification = useCallback((notification: any) => {
    console.log(notification)

    if (!notification?.message?.text) {
      setNotificationCount(notification?.unreadCount);
    } else {
      const newNotification: INotification = {
        _id: Math.random().toString(36).substring(2, 9),
        userId: Math.random().toString(36).substring(2, 9),
        receiverId: Math.random().toString(36).substring(2, 9),
        message: notification?.message,
        type: "",
        isRead: false,
        createdAt: notification?.timestamp,
        updatedAt: notification?.timestamp,
        __v: 0,
      }
      setAllNotifications((prev) => [...prev, newNotification]);
      setNotificationCount((prev) => prev + 1);
    }
  }, []);

  // Unread message count from socket. res: { statusCode, success, unreadCount }
  const handleMessageCount = useCallback((data: any) => {
    console.log(data)
    const count = typeof data === "number" ? data : data?.unreadCount;
    setMessageCount(count ?? 0);
  }, []);

  useEffect(() => {
    if (!socket) return;

    if (!socket.connected) {
      socket.connect();
    }

    socket.on(`notification`, handleNotification);
    socket.on(`message_count`, handleMessageCount);

    return () => {
      socket.off(`notification`, handleNotification);
      socket.off(`message_count`, handleMessageCount);
    };
  }, [socket, handleNotification, handleMessageCount]);

  const handleResetNotification = async () => {
    if (notificationCount > 0) {
      try {
        socket?.emit("readNotification");
      } catch (error: any) {
        toast.error(
          error?.data?.message || error?.message || "Something went wrong!",
          { duration: 2000 }
        );
      }
    }
  };

  const handleResetMessage = () => {
    if (messageCount > 0) {
      try {
        socket?.emit("readMessage");
        setMessageCount(0);
        dispatch(clearSelectedChatUser());
      } catch (error: any) {
        toast.error(
          error?.data?.message || error?.message || "Something went wrong!",
          { duration: 2000 }
        );
      }
    }
  };

  return (
    <motion.div
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`!z-[99999]  ${scrolled ? " !z-[99999] duration-300  py-1.5" : " duration-300  py-1.5"
        } ${mobileMenuOpen || scrolled
          ? "bg-secondary-color !text-primary-color"
          : "bg-secondary-color !text-primary-color"
        }`}
      ref={navbarWrapperRef}
    >
      <Container>
        <header className="text-base mx-auto  flex justify-between items-center z-[99999] ">
          {/* //*Company name */}
          <div>
            <Link
              href="/"
              className=" cursor-pointer flex justify-center items-end gap-1"
            >
              <Image
                src={AllImages.logo}
                alt="logo"
                width={1000}
                height={1000}
                sizes="100vw"
                className="h-10 w-auto"
              />
            </Link>
          </div>
          {/* //*Nav links */}
          <nav>
            {/* //* For Laptop or Desktop */}
            <div className="hidden lg:block">
              <ul className="flex justify-center items-center gap-8 lg:flex-row flex-col lg:py-0 py-10">
                {NavItems.map((navItem, i) => (
                  <li
                    key={i}
                    className={`lg:mb-0 mb-5 cursor-pointer group relative hover:text-third-color transition-all font-semibold duration-300 
                      ${path === navItem.route ? "!text-third-color " : " "}
                      `}
                  >
                    <Link
                      href={navItem.route}
                      className="after-underline-after"
                    >
                      {navItem.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* //*For Tab or Mobile */}
            <div
              style={{
                height: `${height}px`, // Dynamic height
                overflow: "hidden",
                transition: "height 0.3s ease", // Smooth transition effect for height
              }}
              ref={navbarRef}
              className={`block lg:hidden bg-secondary-color w-full lg:static absolute top-[52px] left-0 lg:bg-none transition-all duration-500 lg:z-0 -z-[9999] lg:border-none ${mobileMenuOpen ? "shadow-md" : ""}`}
            >
              <ul className="flex justify-end items-center gap-5 lg:flex-row flex-col lg:py-0 py-5">
                {NavItems.map((navItem, i) => (
                  <li
                    key={i}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className={`lg:mb-0 mb-0 cursor-pointer hover:text-third-color group relative  transition-all duration-300 ${path === navItem.route ? "!text-third-color " : " "
                      }`}
                  >
                    <Link
                      href={navItem.route}
                      className="after-underline-after"
                    >
                      {navItem.name}
                    </Link>
                  </li>
                ))}
                {userData ? (
                  <Button
                    onClick={() => { setMobileMenuOpen(!mobileMenuOpen); handleLogOut() }}
                    className="group flex items-center !py-4 !px-1 gap-1 border-2 !border-secondary-color !bg-secondary-color !text-primary-color rounded-full">
                    <p className="font-semibold">Logout</p>
                    <div className="bg-primary-color p-1 rounded-full">
                      <TbLogout2 className=" text-lg text-secondary-color" />
                    </div>
                  </Button>
                ) : (
                  <div className="flex flex-col items-center gap-3 space-y-3">
                    <Link
                      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                      href="/sign-in"
                      className="px-4 py-1 text-primary-color font-semibold rounded-full border-2 border-primary-color mb-1"
                    >
                      {/* Sign In */}
                      Prihlásenie
                    </Link>
                    <Link
                      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                      href="/join"
                      className="px-4 py-1 rounded-full border-2 border-primary-color bg-primary-color text-secondary-color font-semibold"
                    >
                      {/* Join */}
                      Registrácia
                    </Link>
                  </div>
                )}
              </ul>
            </div>
          </nav>
          <div className="lg:flex items-center gap-2 hidden">
            {userData?.email ? (
              <div className="flex items-center gap-5">
                <div className="relative">
                  <Link href="/message" onClick={handleResetMessage}>
                    <AiFillMessage className="text-2xl cursor-pointer" />
                  </Link>
                  {messageCount > 0 && (
                    <div className="absolute -top-2 -right-2 bg-third-color text-secondary-color rounded-full min-w-4 min-h-4 text-sm font-semibold flex justify-center items-center">{messageCount}</div>
                  )}
                </div>

                <Dropdown
                  overlay={notificationMenu}
                  trigger={["hover"]}
                  onOpenChange={() => {
                    handleResetNotification();
                  }}
                  placement="bottomRight"
                  className="cursor-pointer "
                >
                  <div className="relative">
                    <GoBellFill className="text-2xl cursor-pointer" />
                    {notificationCount > 0 && (
                      <div className="absolute -top-2 -right-2 bg-third-color text-secondary-color rounded-full min-w-4 min-h-4 text-sm font-semibold flex justify-center items-center">{notificationCount}</div>
                    )}
                  </div>
                </Dropdown>
                <div className="relative">
                  <Link href="/cart">
                    <IoMdCart className="text-2xl cursor-pointer" />
                  </Link>
                  {totalCart > 0 && (
                    <div className="absolute -top-2 -right-2 bg-third-color text-secondary-color rounded-full min-w-4 min-h-4 text-sm font-semibold flex justify-center items-center">{totalCart}</div>
                  )}
                </div>
                <Dropdown
                  menu={{ items }}
                  trigger={["hover"]}
                  rootClassName="min-w-[200px]! lg:min-w-fit!"
                  // onOpenChange={(open: boolean) => {
                  //   setOpen(open);
                  // }}
                  placement="bottomRight"
                  className="cursor-pointer"
                >
                  <Image
                    src={userData?.profileImage ? serverUrl + userData?.profileImage : AllImages.dummyProfile}
                    alt="profile_img"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="xl:h-[35px] h-[30px] w-[30px] xl:w-[35px] rounded-full cursor-pointer border-2 border-[#2B4257]"
                  />
                </Dropdown>

                <Button
                  onClick={handleLogOut}
                  className="group flex items-center !py-4 !px-1 gap-1 border-2 !border-secondary-color !bg-secondary-color !text-primary-color rounded-full"
                >
                  <p className="font-semibold">Logout</p>
                  <div className="bg-primary-color p-1 rounded-full">
                    <TbLogout2 className=" text-lg text-secondary-color" />
                  </div>
                </Button>
              </div>
            ) : (
              <div className="w-full flex items-center gap-5">
                <Link
                  href="/sign-in"
                  className={` "!text-lg px-2 py-1 font-semibold  mt-0.5 " ${scrolled ? "text-primary-color" : "text-primary-color"
                    } `}
                >
                  {/* Sign In */}
                  Prihlásenie
                </Link>
                <Link href="/join">
                  <Button
                    className={`group flex items-center !py-4 !px-1 gap-1 border-2 rounded-full ${scrolled
                      ? "!border-primary-color !bg-primary-color !text-secondary-color "
                      : "!border-primary-color !bg-primary-color !text-secondary-color "
                      }`}
                  >
                    {/* <p className="font-semibold text-base">Join</p> */}
                    <p className="font-semibold text-base">Registrácia</p>
                    <div
                      className={`${scrolled ? "bg-secondary-color" : "bg-secondary-color"
                        } p-0.5 rounded-full`}
                    >
                      <HiOutlineLogin
                        className={`text-lg ${scrolled ? "text-primary-color" : "text-primary-color"
                          }`}
                      />
                    </div>
                  </Button>
                </Link>
              </div>
            )}
          </div>
          {/* //*Icons */}
          <div className="lg:hidden select-none flex items-center gap-5">
            {userData?.email && (
              <div className="flex items-center gap-5">
                <div className="relative">
                  <Link href="/message" onClick={handleResetMessage}>
                    <AiFillMessage className="text-2xl cursor-pointer" />
                  </Link>
                  {messageCount > 0 && (
                    <div className="absolute -top-2 -right-2 bg-third-color text-secondary-color rounded-full w-4 h-4 text-sm font-semibold flex justify-center items-center">{messageCount}</div>
                  )}
                </div>

                <Dropdown
                  overlay={notificationMenu}
                  trigger={["hover"]}
                  onOpenChange={() => {
                    handleResetNotification();
                  }}
                  placement="bottomRight"
                  className="cursor-pointer "
                >
                  <div className="relative">
                    <GoBellFill className="text-2xl cursor-pointer" />
                    <div className="absolute -top-2 -right-2 bg-third-color text-secondary-color rounded-full w-4 h-4 text-sm font-semibold flex justify-center items-center">{notificationCount}</div>
                  </div>
                </Dropdown>
                <div className="relative">
                  <Link href="/cart">
                    <IoMdCart className="text-2xl cursor-pointer" />
                  </Link>
                  <div className="absolute -top-2 -right-2 bg-third-color text-secondary-color rounded-full w-4 h-4 text-sm font-semibold flex justify-center items-center">{totalCart}</div>
                </div>
                <Dropdown
                  menu={{ items }}
                  trigger={["hover"]}
                  rootClassName="min-w-[200px]! lg:min-w-fit!"
                  // onOpenChange={(open: boolean) => {
                  //   setOpen(open);
                  // }}
                  placement="bottomRight"
                  className="cursor-pointer"
                >
                  <Image
                    src={userData?.profileImage ? serverUrl + userData?.profileImage : AllImages.dummyProfile}
                    alt="profile_img"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="xl:h-[35px] h-[30px] w-[30px] xl:w-[35px] rounded-full cursor-pointer border-2 border-[#2B4257]"
                  />
                </Dropdown>
              </div>
            )}
            {mobileMenuOpen ? (
              <div onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#ffffff"
                  className="w-8 h-8 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>
            ) : (
              <div onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke={mobileMenuOpen || scrolled ? "#ffffff" : "#ffffff"}
                  className="w-8 h-8 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </div>
            )}
          </div>
        </header>
      </Container>
    </motion.div>
  );
};

export default Navbar;
