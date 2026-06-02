import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    apiLoading: false,
    loading: false,
    authUser: null,
    token: "",
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setApiLoading: (state, action) => {
      state.apiLoading = action.payload;
    },
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
    clearAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

// Export actions for use in components
export const {
  setApiLoading,
  setLoading,
  setAuthUser,
  clearAuthUser,
  setToken,
} = authSlice.actions;

// Export the reducer for store configuration
export default authSlice.reducer;
