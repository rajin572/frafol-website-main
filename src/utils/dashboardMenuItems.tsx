"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import overview from "../../public/assets/svg/overview.svg";
import orders from "../../public/assets/svg/orders.svg";
import payments from "../../public/assets/svg/payments.svg";
import workshop from "../../public/assets/svg/workshop.svg";
import review from "../../public/assets/svg/review.svg";
import profile from "../../public/assets/svg/profile.svg";
import myCommunityPost from "../../public/assets/svg/myCommunityPost.svg";

// Profesional Dashboard Icons
import event from "../../public/assets/svg/event.svg";
import calendar from "../../public/assets/svg/calender.svg";
import earning from "../../public/assets/svg/earning.svg";
import gearOrder from "../../public/assets/svg/gearOrder.svg";
import gearMarketplace from "../../public/assets/svg/gearMarketplace.svg";
import packages from "../../public/assets/svg/packages.svg";
import { useAppDispatch } from "@/redux/hooks";
import { toggleCollapse } from "@/redux/features/sidebar/sidebarSlice";

export const useAdminPaths = () => {
  const pathname = usePathname();

  const dispatch = useAppDispatch();
  const handleToggleCollapse = () => {
    dispatch(toggleCollapse());
  };

  return [
    {
      key: "overview",
      label: <Link
        onClick={handleToggleCollapse}
        href="/dashboard/my-account/overview">{/* Overview */}Prehľad</Link>,
      icon: (
        <Image
          src={overview}
          alt="icon"
          width={20}
          className="mr-2"
          style={{
            filter: pathname.includes("/overview")
              ? "invert(1) sepia(1) saturate(0) brightness(200%) contrast(100%)"
              : undefined,
          }}
        />
      ),
    },
    {
      key: "orders",
      icon: (
        <Image
          src={orders}
          alt="icon"
          width={20}
          className="mr-2"
          style={{
            filter: pathname.includes("/orders")
              ? "invert(1) sepia(1) saturate(0) brightness(200%) contrast(100%)"
              : undefined,
          }}
        />
      ),
      label: <Link onClick={handleToggleCollapse}
        href="/dashboard/my-account/orders">{/* Event Orders */}Foto/video objednávky</Link>,
    },
    {
      key: "gear-order",
      icon: (
        <Image
          src={gearOrder}
          alt="icon"
          width={20}
          className="mr-2"
          style={{
            filter: pathname.includes("/gear-order")
              ? "invert(1) sepia(1) saturate(0) brightness(200%) contrast(100%)"
              : undefined,
          }}
        />
      ),
      label: <Link onClick={handleToggleCollapse}
        href="/dashboard/my-account/gear-order">{/* Gear Orders */}Objednávky z bazáru</Link>,
    },
    {
      key: "extension-requests",
      icon: (
        <Image
          src={orders}
          alt="icon"
          width={20}
          className="mr-2"
          style={{
            filter: pathname.includes("/extension-requests")
              ? "invert(1) sepia(1) saturate(0) brightness(200%) contrast(100%)"
              : undefined,
          }}
        />
      ),
      label: (
        <Link onClick={handleToggleCollapse}
          href="/dashboard/my-account/extension-requests">
          {/* Extension Requests */}
          Žiadosti o predĺženie
        </Link>
      ),
    },
    {
      key: "payments",
      icon: (
        <Image
          src={payments}
          alt="icon"
          width={20}
          className="mr-2"
          style={{
            filter: pathname.includes("/payments")
              ? "invert(1) sepia(1) saturate(0) brightness(200%) contrast(100%)"
              : undefined,
          }}
        />
      ),
      label: <Link onClick={handleToggleCollapse}
        href="/dashboard/my-account/payments">{/* My Payments */}Moje platby</Link>,
    },
    {
      key: "my-workshop",
      icon: (
        <Image
          src={workshop}
          alt="icon"
          width={20}
          className="mr-2"
          style={{
            filter: pathname.includes("/my-workshop")
              ? "invert(1) sepia(1) saturate(0) brightness(200%) contrast(100%)"
              : undefined,
          }}
        />
      ),
      label: <Link onClick={handleToggleCollapse}
        href="/dashboard/my-account/my-workshop">{/* My Workshop */}Prihlásené kurzy</Link>,
    },
    {
      key: "reviews",
      icon: (
        <Image
          src={review}
          alt="icon"
          width={20}
          className="mr-2"
          style={{
            filter: pathname.includes("/reviews")
              ? "invert(1) sepia(1) saturate(0) brightness(200%) contrast(100%)"
              : undefined,
          }}
        />
      ),
      label: <Link onClick={handleToggleCollapse}
        href="/dashboard/my-account/reviews">{/* My Reviews */}Recenzie</Link>,
    },
    {
      key: "my-community-posts",
      icon: (
        <Image
          src={myCommunityPost}
          alt="icon"
          width={20}
          className="mr-2"
          style={{
            filter: pathname.includes("/my-community-posts")
              ? "invert(1) sepia(1) saturate(0) brightness(200%) contrast(100%)"
              : undefined,
          }}
        />
      ),
      label: (
        <Link href="/dashboard/my-account/my-community-posts">
          {/* My Community Posts */}
          Príspevky vo fóre
        </Link>
      ),
    },
    {
      key: "profile-settings",
      icon: (
        <Image
          src={profile}
          alt="icon"
          width={20}
          className="mr-2"
          style={{
            filter: pathname.includes("/profile-settings")
              ? "invert(1) sepia(1) saturate(0) brightness(200%) contrast(100%)"
              : undefined,
          }}
        />
      ),
      label: <Link onClick={handleToggleCollapse}
        href="/dashboard/my-account/profile-settings">{/* Profile */}Profil</Link>,
    },
  ];
};
export const useProfessionalPaths = () => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const handleToggleCollapse = () => {
    setTimeout(() => dispatch(toggleCollapse()), 100);
  };
  return [
    {
      key: "overview",
      label: <Link onClick={handleToggleCollapse}
        href="/dashboard/professional/overview">{/* Overview */}Prehľad</Link>,
      icon: (
        <Image
          src={overview}
          alt="icon"
          width={20}
          className="mr-2"
          style={{
            filter: pathname.includes("/overview")
              ? "invert(1) sepia(1) saturate(0) brightness(200%) contrast(100%)"
              : undefined,
          }}
        />
      ),
    },
    {
      key: "event-orders",
      label: (
        <Link onClick={handleToggleCollapse}
          href="/dashboard/professional/event-orders">{/* Event Orders */}Foto/video objednávky</Link>
      ),
      icon: (
        <Image
          src={event}
          alt="icon"
          width={20}
          className="mr-2"
          style={{
            filter: pathname.includes("/event-orders")
              ? "invert(1) sepia(1) saturate(0) brightness(200%) contrast(100%)"
              : undefined,
          }}
        />
      ),
    },
    {
      key: "gear-order",
      label: <Link onClick={handleToggleCollapse}
        href="/dashboard/professional/gear-order">{/* Gear Order */}Objednávka z bazáru</Link>,
      icon: (
        <Image
          src={gearOrder}
          alt="icon"
          width={20}
          className="mr-2"
          style={{
            filter: pathname.includes("/gear-order")
              ? "invert(1) sepia(1) saturate(0) brightness(200%) contrast(100%)"
              : undefined,
          }}
        />
      ),
    },
    {
      key: "gear-purchases",
      label: <Link onClick={handleToggleCollapse}
        href="/dashboard/professional/gear-purchases">{/* Gear Purchases */}Nákupy z bazáru</Link>,
      icon: (
        <Image
          src={gearOrder}
          alt="icon"
          width={20}
          className="mr-2"
          style={{
            filter: pathname.includes("/gear-purchases")
              ? "invert(1) sepia(1) saturate(0) brightness(200%) contrast(100%)"
              : undefined,
          }}
        />
      ),
    },
    {
      key: "gear-marketPlace",
      label: (
        <Link onClick={handleToggleCollapse}
          href="/dashboard/professional/gear-marketPlace">
          {/* MarketPlace */}
          Bazár
        </Link>
      ),
      icon: (
        <Image
          src={gearMarketplace}
          alt="icon"
          width={20}
          className="mr-2"
          style={{
            filter: pathname.includes("/gear-marketPlace")
              ? "invert(1) sepia(1) saturate(0) brightness(200%) contrast(100%)"
              : undefined,
          }}
        />
      ),
    },
    {
      key: "workshop",
      label: <Link onClick={handleToggleCollapse}
        href="/dashboard/professional/workshop">{/* Workshop */}Kurz</Link>,
      icon: (
        <Image
          src={workshop}
          alt="icon"
          width={20}
          className="mr-2"
          style={{
            filter: pathname.includes("/workshop")
              ? "invert(1) sepia(1) saturate(0) brightness(200%) contrast(100%)"
              : undefined,
          }}
        />
      ),
    },
    {
      key: "my-workshop",
      icon: (
        <Image
          src={workshop}
          alt="icon"
          width={20}
          className="mr-2"
          style={{
            filter: pathname.includes("/my-workshop")
              ? "invert(1) sepia(1) saturate(0) brightness(200%) contrast(100%)"
              : undefined,
          }}
        />
      ),
      label: (
        <Link onClick={handleToggleCollapse}
          href="/dashboard/professional/my-workshop">{/* My Workshop */}Prihlásené kurzy</Link>
      ),
    },
    {
      key: "packages",
      label: <Link onClick={handleToggleCollapse}
        href="/dashboard/professional/packages">{/* Packages */}Balíky</Link>,
      icon: (
        <Image
          src={packages}
          alt="icon"
          width={20}
          className="mr-2"
          style={{
            filter: pathname.includes("/packages")
              ? "invert(1) sepia(1) saturate(0) brightness(200%) contrast(100%)"
              : undefined,
          }}
        />
      ),
    },
    {
      key: "calendar",
      label: <Link onClick={handleToggleCollapse}
        href="/dashboard/professional/calendar">{/* Calendar */}Kalendár</Link>,
      icon: (
        <Image
          src={calendar}
          alt="icon"
          width={20}
          className="mr-2"
          style={{
            filter: pathname.includes("/calendar")
              ? "invert(1) sepia(1) saturate(0) brightness(200%) contrast(100%)"
              : undefined,
          }}
        />
      ),
    },
    {
      key: "review",
      label: <Link onClick={handleToggleCollapse}
        href="/dashboard/professional/review">{/* Review */}Recenzie</Link>,
      icon: (
        <Image
          src={review}
          alt="icon"
          width={20}
          className="mr-2"
          style={{
            filter: pathname.includes("/review")
              ? "invert(1) sepia(1) saturate(0) brightness(200%) contrast(100%)"
              : undefined,
          }}
        />
      ),
    },
    {
      key: "my-community-posts",
      icon: (
        <Image
          src={myCommunityPost}
          alt="icon"
          width={20}
          className="mr-2"
          style={{
            filter: pathname.includes("/my-community-posts")
              ? "invert(1) sepia(1) saturate(0) brightness(200%) contrast(100%)"
              : undefined,
          }}
        />
      ),
      label: (
        <Link href="/dashboard/professional/my-community-posts">
          {/* My Community Posts */}
          Príspevky vo fóre
        </Link>
      ),
    },
    {
      key: "frafol-choice",
      label: <Link onClick={handleToggleCollapse}
        href="/dashboard/professional/frafol-choice">{/* Frafol Choice */}Odporúča Frafol</Link>,
      icon: (
        <Image
          src={packages}
          alt="icon"
          width={20}
          className="mr-2"
          style={{
            filter: pathname.includes("/frafol-choice")
              ? "invert(1) sepia(1) saturate(0) brightness(200%) contrast(100%)"
              : undefined,
          }}
        />
      ),
    },
    {
      key: "earning",
      label: <Link onClick={handleToggleCollapse}
        href="/dashboard/professional/earning">{/* Earning */}Zárobky</Link>,
      icon: (
        <Image
          src={earning}
          alt="icon"
          width={20}
          className="mr-2"
          style={{
            filter: pathname.includes("/earning")
              ? "invert(1) sepia(1) saturate(0) brightness(200%) contrast(100%)"
              : undefined,
          }}
        />
      ),
    },
    {
      key: "payments",
      label: <Link onClick={handleToggleCollapse}
        href="/dashboard/professional/payments">{/* Payments */}Platby</Link>,
      icon: (
        <Image
          src={payments}
          alt="icon"
          width={20}
          className="mr-2"
          style={{
            filter: pathname.includes("/payments")
              ? "invert(1) sepia(1) saturate(0) brightness(200%) contrast(100%)"
              : undefined,
          }}
        />
      ),
    },







    {
      key: "profile-settings",
      icon: (
        <Image
          src={profile}
          alt="icon"
          width={20}
          className="mr-2"
          style={{
            filter: pathname.includes("/profile-settings")
              ? "invert(1) sepia(1) saturate(0) brightness(200%) contrast(100%)"
              : undefined,
          }}
        />
      ),
      label: (
        <Link href="/dashboard/professional/profile-settings">{/* Profile */}Profil</Link>
      ),
    },
  ];
};
