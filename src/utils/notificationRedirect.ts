/* eslint-disable @typescript-eslint/no-explicit-any */
import { INotification } from "@/types";

export type NotificationType =
  | "DirectBookingRequest"
  | "CustomBookingRequest"
  | "BookingAccepted"
  | "DirectBookingAccepted"
  | "CustomBookingAccepted"
  | "BookingRejected"
  | "BookingPaymentPending"
  | "BookingProcessing"
  | "DeliveryRequest"
  | "DeliveryAccepted"
  | "DeliveryRequestDeclined"
  | "OrderDeclined"
  | "OrderCancelled"
  | "BookingCompleted"
  | "DirectBookingInProgress"
  | "CustomBookingInProgress"
  | "WorkshopAdded"
  | "WorkshopApproved"
  | "WorkshopDeclined"
  | "PackageAdded"
  | "PackageApproved"
  | "PackageDeclined"
  | "GearAdded"
  | "GearOrderSold"
  | "GearOrderCancelled"
  | "GearMarketplaceApproved"
  | "GearMarketplaceDeclined"
  | "GearPaymentReceived"
  | "GearDeliveryRequest"
  | "GearDeliveryAccepted"
  | "GearDeliveryDeclined"
  | "WorkshopNewParticipant"
  | "ReviewRequest"
  | "AccountDeleteRequest"
  | "AccountDeleteApproved"
  | "AccountDeleteRejected"
  | "RefundRequired"
  | "CancelRequest"
  | "CancelRequestDeclined"
  | "ExtensionRequest"
  | "ExtensionAccepted"
  | "ExtensionRejected"
  | "CommunityRejected"
  | "CommunityDeleted"
  | "AdminNotice"
  | "added"
  | "newMessage"
  | "ProfileDeclined"
  | "NewComment"
  | "CommentReply";

export const isProfessionalRole = (role?: string): boolean => {
  if (!role) return false;
  const normalized = role.toLowerCase();
  return (
    normalized === "photographer" ||
    normalized === "videographer" ||
    normalized === "both" ||
    normalized === "professional"
  );
};

export const isUserRole = (role?: string): boolean => {
  if (!role) return false;
  const normalized = role.toLowerCase();
  return (
    normalized === "user" ||
    normalized === "company" ||
    normalized === "client"
  );
};

/**
 * Resolves the appropriate redirect URL for a given notification based on its type
 * and whether the receiver is a professional or a standard user/client.
 *
 * @param notification The notification object (or an object containing type and optional metadata)
 * @param role The current user's role ("user" | "company" | "photographer" | "videographer" | "both")
 * @returns The destination URL route with matching tabs and query parameters
 */
export const getNotificationRedirectUrl = (
  notification: INotification | any,
  role?: string
): string => {
  const type = notification?.type as NotificationType | string;
  const isProfessional = isProfessionalRole(role);

  // Extract optional identifiers if provided in notification payload
  const roomId =
    notification?.roomId ||
    notification?.message?.roomId ||
    notification?.chatId ||
    notification?.data?.roomId;
  const postId =
    notification?.communityId ||
    notification?.postId ||
    notification?.message?.communityId ||
    notification?.message?.postId ||
    notification?.data?.communityId ||
    notification?.data?.postId;
  const workshopId =
    notification?.workshopId ||
    notification?.message?.workshopId ||
    notification?.data?.workshopId;

  // ----------------------------------------------------
  // PROFESSIONAL REDIRECTS
  // ----------------------------------------------------
  if (isProfessional) {
    switch (type) {
      // 1. Booking / Event Orders (New requests from clients)
      case "DirectBookingRequest":
      case "CustomBookingRequest":
        return "/dashboard/professional/event-orders?tab=pending";

      // 2. Booking accepted / waiting for client's payment
      case "BookingAccepted":
      case "DirectBookingAccepted":
      case "CustomBookingAccepted":
      case "BookingPaymentPending":
        return "/dashboard/professional/event-orders?tab=accepted";

      // 3. Paid / Upcoming shoots
      case "BookingProcessing":
        return "/dashboard/professional/event-orders?tab=upcoming";

      // 4. In progress / Shoot active / Post-production
      case "DirectBookingInProgress":
      case "CustomBookingInProgress":
      case "DeliveryRequestDeclined":
      case "CancelRequestDeclined":
      case "ExtensionAccepted":
      case "ExtensionRejected":
        return "/dashboard/professional/event-orders?tab=inProgress";

      // 5. Work submitted / Awaiting client delivery confirmation
      case "DeliveryRequest":
        return "/dashboard/professional/event-orders?tab=toConfirm";

      // 6. Delivery confirmed / Completed
      case "DeliveryAccepted":
      case "BookingCompleted":
        return "/dashboard/professional/event-orders?tab=delivered";

      // 7. Cancellation requests
      case "CancelRequest":
        return "/dashboard/professional/event-orders?tab=cancelRequest";

      // 8. Rejected / Cancelled orders
      case "BookingRejected":
      case "OrderDeclined":
      case "OrderCancelled":
        return "/dashboard/professional/event-orders?tab=cancelled";

      // 9. Refund required / Payments
      case "RefundRequired":
        return "/dashboard/professional/payments";

      // 10. Extension request
      case "ExtensionRequest":
        return "/dashboard/professional/event-orders?tab=inProgress";

      // 11. Workshops management
      case "WorkshopAdded":
      case "WorkshopDeclined":
        return "/dashboard/professional/workshop?tab=pending";

      case "WorkshopApproved":
        return "/dashboard/professional/workshop?tab=approved";

      case "WorkshopNewParticipant":
        return workshopId
          ? `/dashboard/professional/workshop?tab=approved&workshop=${workshopId}`
          : "/dashboard/professional/workshop?tab=approved";

      // 12. Service Packages management
      case "PackageAdded":
      case "PackageDeclined":
        return "/dashboard/professional/packages?tab=pending";

      case "PackageApproved":
        return "/dashboard/professional/packages?tab=approved";

      // 13. Marketplace & Gear (Seller side)
      case "GearAdded":
      case "GearMarketplaceDeclined":
        return "/dashboard/professional/gear-marketPlace";

      case "GearMarketplaceApproved":
        return "/dashboard/professional/gear-marketPlace?filter=In%20Stock";

      case "GearOrderSold":
      case "GearPaymentReceived":
      case "GearDeliveryRequest":
      case "GearDeliveryAccepted":
      case "GearDeliveryDeclined":
      case "GearOrderCancelled":
        return "/dashboard/professional/gear-order";

      // 14. Reviews received from clients
      case "ReviewRequest":
        return "/dashboard/professional/review";

      // 15. Account management & profile
      case "AccountDeleteRequest":
      case "AccountDeleteRejected":
        return "/dashboard/professional/profile-settings?tab=deleteAccount";

      case "AccountDeleteApproved":
        return "/sign-in";

      case "ProfileDeclined":
        return "/dashboard/professional/profile-settings?tab=profile";

      // 16. Forum & Community
      case "CommunityRejected":
      case "CommunityDeleted":
        return "/dashboard/professional/my-community-posts";

      case "NewComment":
      case "CommentReply":
        return postId
          ? `/forums/${postId}`
          : "/dashboard/professional/my-community-posts";

      // 17. Messages & Chat
      case "newMessage":
        return roomId ? `/message?room=${roomId}` : "/message";

      // 18. Admin notices & General updates
      case "AdminNotice":
      case "added":
        return "/dashboard/professional/overview";

      default:
        return "/dashboard/professional/overview";
    }
  }

  // ----------------------------------------------------
  // CLIENT / STANDARD USER REDIRECTS (role: user | company)
  // ----------------------------------------------------
  switch (type) {
    // 1. Booking sent / Pending review by professional
    case "DirectBookingRequest":
    case "CustomBookingRequest":
      return "/dashboard/my-account/orders?tab=pending";

    // 2. Booking accepted by creator / Waiting for client payment
    case "BookingAccepted":
    case "DirectBookingAccepted":
    case "BookingPaymentPending":
      return "/dashboard/my-account/orders?tab=accepted";

    // 2b. Custom booking proposal accepted / Creator sent order offer
    case "CustomBookingAccepted":
      return "/dashboard/my-account/orders?tab=orderOffer";

    // 3. Paid orders / Work in progress
    case "BookingProcessing":
    case "DirectBookingInProgress":
    case "CustomBookingInProgress":
    case "DeliveryRequestDeclined":
    case "CancelRequestDeclined":
    case "ExtensionAccepted":
    case "ExtensionRejected":
      return "/dashboard/my-account/orders?tab=currentOrder";

    // 4. Professional submitted files / Client needs to confirm delivery
    case "DeliveryRequest":
      return "/dashboard/my-account/orders?tab=toConfirm";

    // 5. Work accepted / Completed shoot
    case "DeliveryAccepted":
    case "BookingCompleted":
      return "/dashboard/my-account/orders?tab=delivered";

    // 6. Cancellation requests
    case "CancelRequest":
      return "/dashboard/my-account/orders?tab=cancelRequest";

    // 7. Rejected or cancelled orders
    case "BookingRejected":
    case "OrderDeclined":
    case "OrderCancelled":
      return "/dashboard/my-account/orders?tab=cancelled";

    // 8. Refunds & Payments
    case "RefundRequired":
      return "/dashboard/my-account/payments";

    // 9. Extension requested by professional
    case "ExtensionRequest":
      return "/dashboard/my-account/extension-requests";

    // 10. Workshops
    case "WorkshopNewParticipant":
      return "/dashboard/my-account/my-workshop";

    case "WorkshopAdded":
    case "WorkshopApproved":
    case "WorkshopDeclined":
      return "/workshops";

    // 11. Packages
    case "PackageAdded":
    case "PackageApproved":
    case "PackageDeclined":
      return "/";

    // 12. Marketplace / Gear (Buyer side)
    case "GearAdded":
    case "GearMarketplaceApproved":
    case "GearMarketplaceDeclined":
      return "/marketplace";

    case "GearOrderSold":
    case "GearPaymentReceived":
      return "/dashboard/my-account/gear-order?tab=currentOrder";

    case "GearDeliveryRequest":
      return "/dashboard/my-account/gear-order?tab=toConfirm";

    case "GearDeliveryAccepted":
      return "/dashboard/my-account/gear-order?tab=delivered";

    case "GearDeliveryDeclined":
      return "/dashboard/my-account/gear-order?tab=currentOrder";

    case "GearOrderCancelled":
      return "/dashboard/my-account/gear-order?tab=cancelled";

    // 13. Review requested from client
    case "ReviewRequest":
      return "/dashboard/my-account/reviews?tab=pendingReviews";

    // 14. Account management & profile
    case "AccountDeleteRequest":
    case "AccountDeleteRejected":
      return "/dashboard/my-account/profile-settings?tab=deleteAccount";

    case "AccountDeleteApproved":
      return "/sign-in";

    case "ProfileDeclined":
      return "/dashboard/my-account/profile-settings?tab=profile";

    // 15. Forum & Community
    case "CommunityRejected":
    case "CommunityDeleted":
      return "/dashboard/my-account/my-community-posts";

    case "NewComment":
    case "CommentReply":
      return postId ? `/forums/${postId}` : "/dashboard/my-account/my-community-posts";

    // 16. Messages & Chat
    case "newMessage":
      return roomId ? `/message?room=${roomId}` : "/message";

    // 17. Admin notices & General updates
    case "AdminNotice":
    case "added":
      return "/dashboard/my-account/overview";

    default:
      return "/dashboard/my-account/overview";
  }
};
