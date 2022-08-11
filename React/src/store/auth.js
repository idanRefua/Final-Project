import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  loggedIn: localStorage.getItem("tokenKey") ? true : false,
  userData: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.loggedIn = true;
    },
    logout(state) {
      state.loggedIn = false;
    },
    updateUser(state, action) {
      state.userData = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
