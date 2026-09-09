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
        toast.success(`${action.payload.name} added to cart`);
      } else {
        toast.error("Product already exists in cart");
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
  },
});

// Actions
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

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
