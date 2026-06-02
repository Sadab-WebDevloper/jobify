import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    allCompanies: [],
    singleCompany: null,
    searchCompanyByText: "",
  },

  reducers: {
    setAllCompanies: (state, action) => {
      state.allCompanies = action.payload;
    },
    setSingleComapny: (state, action) => {
      state.singleCompany = action.payload;
    },
    setSearchCompanyByText: (state, action) => {
      state.searchCompanyByText = action.payload;
    },
  },
});

export const { setAllCompanies, setSingleComapny, setSearchCompanyByText } =
  companySlice.actions;
export default companySlice.reducer;
