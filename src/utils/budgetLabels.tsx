export const budgetLabels: { [key: string]: string } = {
  under50: "Pod 50€",
  "50-100": "50€-100€",
  "100-300": "100€-300€",
  "2000-5000": "2000€-5000€",
  over1000: "Nad 1000€",
};
export const eventOrderStatus: { [key: string]: string } = {
  pending: "Čaká na schválenie",
  declined: "Declined",
  accepted: "Čaká sa na platbu",
  inProgress: "Prebieha",
  deliveryRequestDeclined: "Prebieha",
  deliveryRequest: "Čaká na potvrdenie",
  delivered: "Dokončené",
  cancelRequest: "Cancel Requested",
  cancelled: "Cancelled",
};
export const serviceTypeLabels: { [key: string]: string } = {
  photography: "Fotenie",
  videography: "Natáčanie",
};
export const gearOrderStatus: { [key: string]: string } = {
  inProgress: "In Progress",
  toConfirm: "To Confirm",
  deliveryRequest: "Delivery Request",
  delivered: "Delivered",
  cancelled: "Cancelled",
};
