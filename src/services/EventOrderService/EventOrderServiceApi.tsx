"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */
import TagTypes from "@/helpers/config/TagTypes";
import { fetchWithAuth } from "@/lib/fetchWraper";
import { ICreateEventOrder } from "@/types";
import { updateTag } from "next/cache";

export const createEventOrder = async (req: {
  body: ICreateEventOrder;
  params: any;
}) => {
  try {
    const res = await fetchWithAuth(`/event-order/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Add content type header for JSON
      },
      body: JSON.stringify(req.body),
    });
    const result = await res.json();
    updateTag(TagTypes.eventOrder);

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const acceptDirectOrder = async (req: {
  body: ICreateEventOrder;
  params: any;
}) => {
  try {
    const res = await fetchWithAuth(
      `/event-order/direct/accept/${req.params}`,
      {
        method: "PATCH",
      }
    );
    const result = await res.json();
    updateTag(TagTypes.eventOrder);

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const acceptCustomOrder = async (req: {
  body: ICreateEventOrder;
  params: any;
}) => {
  try {
    const res = await fetchWithAuth(
      `/event-order/custom/accept/${req.params}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json", // Add content type header for JSON
        },
        body: JSON.stringify(req.body),
      }
    );
    const result = await res.json();
    updateTag(TagTypes.eventOrder);

    return result;
  } catch (error: any) {
    return Error(error);
  }
};
export const cancelEventOrder = async (req: {
  body: ICreateEventOrder;
  params: any;
}) => {
  try {
    const res = await fetchWithAuth(
      `/event-order/cancel-request/${req.params}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json", // Add content type header for JSON
        },
        body: JSON.stringify(req.body),
      }
    );
    const result = await res.json();
    updateTag(TagTypes.eventOrder);

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const acceptCancelRequest = async (req: {
  body: ICreateEventOrder;
  params: any;
}) => {
  try {
    const res = await fetchWithAuth(
      `/event-order/approve-cancel/${req.params}`,
      {
        method: "PATCH",
      }
    );
    const result = await res.json();
    updateTag(TagTypes.eventOrder);

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const declineCancelRequest = async (req: {
  body: ICreateEventOrder;
  params: any;
}) => {
  try {
    const res = await fetchWithAuth(
      `/event-order/decline-cancel-request/${req.params}`,
      {
        method: "PATCH",
      }
    );
    const result = await res.json();
    updateTag(TagTypes.eventOrder);

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const declineEventOrder = async (req: {
  body: ICreateEventOrder;
  params: any;
}) => {
  try {
    const res = await fetchWithAuth(
      `/event-order/decline-request/${req.params}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json", // Add content type header for JSON
        },
        body: JSON.stringify(req.body),
      }
    );
    const result = await res.json();
    updateTag(TagTypes.eventOrder);

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const sendDeliveryRequest = async (req: {
  body: ICreateEventOrder;
  params: any;
}) => {
  try {
    const res = await fetchWithAuth(
      `/event-order/request-delivery/${req.params}`,
      {
        method: "PATCH",
      }
    );
    const result = await res.json();
    updateTag(TagTypes.eventOrder);

    return result;
  } catch (error: any) {
    return Error(error);
  }
};
export const sendExtensionRequest = async (req: {
  body: ICreateEventOrder;
  params: any;
}) => {
  try {
    const res = await fetchWithAuth(`/event-order/extension/${req.params}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });
    const result = await res.json();
    updateTag(TagTypes.eventOrder);

    return result;
  } catch (error: any) {
    return Error(error);
  }
};
export const acceptDeliveryRequest = async (req: {
  body: ICreateEventOrder;
  params: any;
}) => {
  try {
    const res = await fetchWithAuth(
      `/event-order/accept-delivery/${req.params}`,
      {
        method: "PATCH",
      }
    );
    const result = await res.json();
    updateTag(TagTypes.eventOrder);

    return result;
  } catch (error: any) {
    return Error(error);
  }
};
export const acceptExtensionRequest = async (req: {
  body: ICreateEventOrder;
  params: any;
}) => {
  try {
    const res = await fetchWithAuth(
      `/event-order/extension/accept/${req.params}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json", // Add content type header for JSON
        },
        body: JSON.stringify(req.body),
      }
    );
    const result = await res.json();
    updateTag(TagTypes.eventOrder);

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const declineExtensionRequest = async (req: {
  body: ICreateEventOrder;
  params: any;
}) => {
  try {
    const res = await fetchWithAuth(
      `/event-order/extension/reject/${req.params}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json", // Add content type header for JSON
        },
        body: JSON.stringify(req.body),
      }
    );
    const result = await res.json();
    updateTag(TagTypes.eventOrder);

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// export const updateGear = async (
//   req = {
//     body: FormData,
//     params: {},
//   }
// ) => {
//   try {
//     const res = await fetchWithAuth(`/marketPlace/update/${req.params}`, {
//       method: "PATCH",
//       body: req.body as any,
//     });
//     const result = await res.json();
//     updateTag(TagTypes.gear);

//     return result;
//   } catch (error: any) {
//     return Error(error);
//   }
// };

// export const deleteGear = async (
//   req = {
//     body: {},
//     params: {},
//   }
// ) => {
//   try {
//     const res = await fetchWithAuth(`/marketPlace/${req.params}`, {
//       method: "DELETE",
//     });
//     const result = await res.json();
//     updateTag(TagTypes.gear);

//     return result;
//   } catch (error: any) {
//     return Error(error);
//   }
// };
