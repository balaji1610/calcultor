import { configureStore } from "@reduxjs/toolkit";
import calcultorSlice from "../slice/calcultorSlice";

export const store = configureStore({
  reducer: {
    calcultor: calcultorSlice,
  },
});

// Types for usage in TS
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
