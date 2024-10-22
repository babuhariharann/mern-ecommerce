import authSlice from "./authSlice";
import adminProductSlice from "./admin/productSlice";
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    auth: authSlice,
    adminProduct: adminProductSlice
  }
})

export default store