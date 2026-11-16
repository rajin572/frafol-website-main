import { IGear } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";

// Define the Product interface as per your previous request

// Cart Slice State
interface CartState {
  products: IGear[];
}

const initialState: CartState = {
  products: [],
};

// Cart Slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IGear>) => {
      // Check if product already exists in cart
      const existingProduct = state.products.find(
        (product) => product._id === action.payload._id
      );

      // If not exists, add the product to the cart
      if (!existingProduct) {
        state.products.push(action.payload);
        toast.success(`${action.payload.name} pridané do košíka`);
      } else {
        toast.error("Produkt je už v košíku");
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      // Remove the product by its ID
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    },
    clearCart: (state) => {
      // Clear the entire cart
      state.products = [];
    },
    // The cart changed in another browser tab (BroadcastChannel, see cartChannel.ts): take it over
    // as is. No toast here, and this action is never broadcast again (no echo between tabs).
    syncCartFromOtherTab: (state, action: PayloadAction<IGear[]>) => {
      state.products = Array.isArray(action.payload) ? action.payload : [];
    },
  },
});

// Actions
export const { addToCart, removeFromCart, clearCart, syncCartFromOtherTab } = cartSlice.actions;

// Selectors
export const selectSubTotalPrice = (state: { cart: CartState }) => {
  return parseFloat(
    state.cart.products
      .reduce((total, product) => total + product.mainPrice, 0)
      .toFixed(2)
  );
};

export const selectTotalShippingPrice = (state: { cart: CartState }) => {
  return parseFloat(
    state.cart.products
      .reduce(
        (total, product) =>
          total + (product.shippingCompany ? product.shippingCompany.price : 0),
        0
      )
      .toFixed(2)
  );
};

export const selectTotalPrice = (state: { cart: CartState }) => {
  return parseFloat(
    state.cart.products
      .reduce(
        (total, product) =>
          total +
          (product.mainPrice +
            (product.shippingCompany ? product.shippingCompany.price : 0)),
        0
      )
      .toFixed(2)
  );
};

// Reducer
export default cartSlice.reducer;
