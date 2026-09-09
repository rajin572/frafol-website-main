export const budgetLabels: { [key: string]: string } = {
  under50: "Under 50€",
  "50-100": "50€-100€",
  "100-300": "100€-300€",
  "2000-5000": "2000€-5000€",
  over1000: "Over 1000€",
};
export const eventOrderStatus: { [key: string]: string } = {
  pending: "Pending",
  declined: "Declined",
  accepted: "Waiting for Payment",
  inProgress: "In Progress",
  deliveryRequestDeclined: "In Progress",
  deliveryRequest: "Delivery Request",
  delivered: "Delivered",
  cancelRequest: "Cancel Requested",
  cancelled: "Cancelled",
};
export const gearOrderStatus: { [key: string]: string } = {
  inProgress: "In Progress",
  toConfirm: "To Confirm",
  deliveryRequest: "Delivery Request",
  delivered: "Delivered",
  cancelled: "Cancelled",
};
