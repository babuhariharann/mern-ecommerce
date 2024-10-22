
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"

const url = "http://localhost:5000"

axios.defaults.withCredentials = true;

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  error: null
}

/** register user API */

// export const registerUser = createAsyncThunk('/auth/register', async (formData) => {
//   const response = await axios.post(`${url}/api/auth/register`, formData, {
//     headers: {
//       'Content-type': 'application/json'
//     }, withCredentials: true
//   },)
//   return response?.data
// })

// export const registerUser = createAsyncThunk('auth/register', async (formData) => {
//   const { userName, email, password } = formData
//   const response = await axios.post(`${url}/api/auth/register`, { userName, email, password });
//   return response?.data;
// }
// );

// /** login user API */

// export const loginUser = createAsyncThunk('/auth/login', async (formData) => {
//   const { email, password } = formData
//   const response = await axios.post(`${url}/api/auth/login`, { email, password })
//   return response?.data
// })

// /** logout user API */

// export const logoutUser = createAsyncThunk('/auth/logout', async () => {
//   const response = await axios.get(`${url}/api/auth/logout`, { withCredentials: true })
//   return response?.data
// })

// /** check-auth API */

// export const checkAuth = createAsyncThunk('/auth/check-auth', async () => {
//   const response = await axios.get(`${url}/api/auth/check-auth`, {
//     withCredentials: true,
//     headers: {
//       "Cache-Control":
//         "no-store, no-cache, must-revalidate, proxy-revalidate",
//     }
//   })

//   return response?.data
// })


/** reducers */

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     setUser: (state, action) => { }
//   },
//   extraReducers: (builder) => {
//     builder.addCase(registerUser.pending, (state) => {
//       state.isLoading = true
//     })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.isLoading = false
//         state.user = null
//         state.isAuthenticated = false
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.isLoading = false
//         state.user = null
//         state.isAuthenticated = false
//       })
//       .addCase(loginUser.pending, (state, action) => {
//         state.isLoading = true
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.isLoading = false
//         state.user = action.payload.success ? action.payload.user : null
//         state.isAuthenticated = action.payload.success
//       })
//       .addCase(loginUser.rejected, (state, user) => {
//         state.isLoading = false
//         state.user = null
//         state.isAuthenticated = false
//       })
//       .addCase(logoutUser.pending, (state, action) => {
//         state.isLoading = true
//       })
//       .addCase(logoutUser.fulfilled, (state, action) => {
//         state.isLoading = false
//         state.user = null
//         state.isAuthenticated = false
//       })
//       .addCase(logoutUser.rejected, (state, action) => {
//         state.isLoading = false
//         state.user = null
//         state.isAuthenticated = false
//       })
//       .addCase(checkAuth.pending, (state, action) => {
//         state.isLoading = true
//         state.user = null
//         state.isAuthenticated = false
//       })
//       .addCase(checkAuth.fulfilled, (state, action) => {
//         state.isLoading = false
//         state.user = action.payload.success ? action.payload.user : null
//         state.isAuthenticated = action.payload.success
//       })
//       .addCase(checkAuth.rejected, (state, action) => {
//         state.isLoading = false
//         state.user = null
//         state.isAuthenticated = false
//       })
//   }
// })


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerStarts: (state, action) => {
      state.isLoading = true;
      state.user = null
      state.isAuthenticated = false
      state.error = null
    },
    registerSuccess: (state, action) => {
      state.isLoading = false;
      state.user = null
      state.isAuthenticated = false
      state.error = null
    },
    registerFailure: (state, action) => {
      state.isLoading = false;
      state.user = null
      state.isAuthenticated = false
      state.error = action.payload?.message
    },
    loginStart: (state, action) => {
      state.isLoading = true;
      state.user = null
      state.isAuthenticated = false
      state.error = null
    },
    loginSuccess: (state, action) => {
      console.log('action', action)
      state.isLoading = false;
      state.user = action.payload.success ? action.payload.user : null;
      state.isAuthenticated = action.payload.success
      state.error = null
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.user = null
      state.isAuthenticated = false
      state.error = action.payload
    },
    logoutStart: (state, action) => {
      state.isLoading = true;
      state.user = null
      state.isAuthenticated = false
      state.error = null
    },
    logoutSuccess: (state, action) => {
      state.isLoading = false;
      state.user = null
      state.isAuthenticated = false
      state.error = null
    },
    logoutFailure: (state, action) => {
      state.isLoading = false;
      state.user = null
      state.isAuthenticated = false
      state.error = action.payload
    },
    checkAuthStart: (state, action) => {
      state.isLoading = true;
      state.user = null
      state.isAuthenticated = false
      state.error = null
    },
    checkAuthSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.success ? action.payload.user : null;
      state.isAuthenticated = action.payload.success
      state.error = null
    },
    checkAuthFailure: (state, action) => {
      state.isLoading = false;
      state.user = null
      state.isAuthenticated = false
      state.error = action.payload.message
    },
  }
})


export const { registerStarts,
  registerSuccess,
  registerFailure,
  loginStart,
  loginSuccess,
  loginFailure,
  logoutStart,
  logoutSuccess,
  logoutFailure,
  checkAuthStart,
  checkAuthSuccess,
  checkAuthFailure
} = authSlice.actions;

export default authSlice.reducer