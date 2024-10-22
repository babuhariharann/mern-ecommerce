import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  isLoading: false,
  productList: [],
  error: null
}


const adminProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addAdminProductStart: (state, action) => {
      state.isLoading = true
      state.error = null
    },
    addAdminProductSuccess: (state, action) => {
      state.isLoading = false
      state.error = null
    },
    addAdminProductFailure: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    getAdminProductStart: (state, action) => {
      state.isLoading = true
      state.error = null
    },
    getAdminProductSuccess: (state, action) => {
      state.isLoading = false
      state.productList = action.payload
      state.error = null
    },
    getAdminProductFailure: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    updateAdminProductStart: (state, action) => {
      state.isLoading = true
      state.error = null
    },
    updateAdminProductSuccess: (state, action) => {
      state.isLoading = false
      state.error = null
    },
    updateAdminProductFailure: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    deleteAdminProductStart: (state, action) => {
      state.isLoading = true
      state.error = null
    },
    deleteAdminProductSuccess: (state, action) => {
      state.isLoading = false
      state.error = null
    },
    deleteAdminProductFailure: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
  }
})

export const {
  addAdminProductStart,
  addAdminProductSuccess,
  addAdminProductFailure,
  getAdminProductStart,
  getAdminProductSuccess,
  getAdminProductFailure,
  updateAdminProductStart, updateAdminProductSuccess, updateAdminProductFailure, deleteAdminProductStart, deleteAdminProductSuccess, deleteAdminProductFailure } = adminProductSlice.actions

export default adminProductSlice.reducer