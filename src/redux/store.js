import { configureStore } from "@reduxjs/toolkit";
import seatsReducer from "./seatsSlice";

export const store = configureStore({
  reducer: {
    seats: seatsReducer,
  },
});
