import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trainerInfo: localStorage.getItem("trainerInfo")
    ? JSON.parse(localStorage.getItem("trainerInfo"))
    : null,
};

const trainerAuthSlice = createSlice({
  name: "trainerAuth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.trainerInfo = action.payload;
      localStorage.setItem("trainerInfo", JSON.stringify(action.payload));
    },

    logout: (state, action) => {
      state.trainerInfo = null;
      localStorage.removeItem("trainerInfo");
    },
  },
});

export const { setCredentials, logout } = trainerAuthSlice.actions;

export default trainerAuthSlice.reducer;
