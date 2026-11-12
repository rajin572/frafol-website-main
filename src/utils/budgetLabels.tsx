export const budgetLabels: { [key: string]: string } = {
  under50: "Pod 50€",
  "50-100": "50€-100€",
  "100-300": "100€-300€",
  "2000-5000": "2000€-5000€",
  over1000: "Nad 1000€",
};
export const eventOrderStatus: { [key: string]: string } = {
  pending: "Čaká na schválenie",
  declined: "Odmietnuté",
  accepted: "Čaká sa na platbu",
  inProgress: "Prebieha",
  deliveryRequestDeclined: "Prebieha",
  deliveryRequest: "Čaká na potvrdenie",
  delivered: "Dokončené",
  cancelRequest: "Žiadosť o zrušenie",
  cancelled: "Zrušené",
};
export const serviceTypeLabels: { [key: string]: string } = {
  photography: "Fotenie",
  videography: "Natáčanie",
};
export const gearOrderStatus: { [key: string]: string } = {
  inProgress: "Čaká na odoslanie",
  toConfirm: "Čaká na potvrdenie",
  deliveryRequest: "Odoslaná",
  delivered: "Doručená",
  cancelled: "Zrušená",
};
