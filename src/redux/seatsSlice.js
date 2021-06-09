import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  numberOfSeats: 1,
  connected: true,
  chosenSeats: [],
  refreshed: true 
};

export const seatsSlice = createSlice({
  name: "seats",
  initialState,
  reducers: {
    setNumberOfSeats: (state, action) => {
      state.numberOfSeats = action.payload;
    },
    setConnected: (state, action) => {
      state.connected = action.payload;
    },
    setChosenSeats: (state, action) => {
      state.chosenSeats = action.payload;
    },
    setRefreshed: (state,action) => {
      state.refreshed =action.payload
    }
  },
});


export const selectNumberOfSeats = (state) => state.seats.numberOfSeats
export const selectConnected = (state) => state.seats.connected
export const selectChosenSeats = (state) => state.seats.chosenSeats
export const selectRefreshed = (state) => state.seats.refreshed

export const { setNumberOfSeats, setConnected, setChosenSeats,setRefreshed } = seatsSlice.actions;

export default seatsSlice.reducer