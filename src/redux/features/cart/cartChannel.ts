import type { Middleware } from "@reduxjs/toolkit";
import type { IGear } from "@/types";
import { addToCart, clearCart, removeFromCart, syncCartFromOtherTab } from "./cartSlice";

// Keeps the cart the same in every open tab of the website. When the cart changes in one tab
// (add, remove, clear after payment), the new list of products is sent on a BroadcastChannel and
// every other tab replaces its cart with it, so the navbar badge and /cart update at once.

const CHANNEL_NAME = "frafol_cart";

type CartMessage = { type: "cart"; products: IGear[] };

let channel: BroadcastChannel | null | undefined;

// One channel per tab, created lazily in the browser only (no BroadcastChannel on the server or
// in very old browsers: then the cart simply is not synced).
const getChannel = () => {
  if (channel !== undefined) return channel;
  channel = typeof window !== "undefined" && "BroadcastChannel" in window ? new BroadcastChannel(CHANNEL_NAME) : null;
  return channel;
};

// Redux middleware: after a local cart change, send the new cart to the other tabs.
// syncCartFromOtherTab is not in the list, so a received cart is never sent back.
export const cartBroadcastMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  if (addToCart.match(action) || removeFromCart.match(action) || clearCart.match(action)) {
    const products: IGear[] = (store.getState() as { cart: { products: IGear[] } }).cart.products;
    try {
      getChannel()?.postMessage({ type: "cart", products } satisfies CartMessage);
    } catch {
      // channel closed (tab unloading): nothing to sync
    }
  }
  return result;
};

// Listen for carts changed in other tabs. Returns the cleanup function (for useEffect).
export const listenToCartFromOtherTabs = (dispatch: (action: ReturnType<typeof syncCartFromOtherTab>) => void) => {
  const current = getChannel();
  if (!current) return () => {};
  const onMessage = (event: MessageEvent<CartMessage>) => {
    if (event.data?.type === "cart") dispatch(syncCartFromOtherTab(event.data.products));
  };
  current.addEventListener("message", onMessage);
  return () => current.removeEventListener("message", onMessage);
};
