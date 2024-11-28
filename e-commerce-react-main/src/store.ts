import { configureStore } from "@reduxjs/toolkit";

import * as userSlice from  "./features/user-slice";
import { cartSlice } from "./features/cartSlice";
const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    user: userSlice.default,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export default store;