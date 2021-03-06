import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import cartSlice from "./cart/cartSlice";

const store = configureStore({
  reducer: { auth: authSlice, cart: cartSlice },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
