import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom'
import AuthLayout from './component/auth/AuthLayout'
import AuthLogin from './pages/auth/AuthLogin'
import AuthRegister from './pages/auth/AuthRegister'
import ShoppingLayout from './component/shopping-view/ShoppingLayout'
import Home from './pages/shopping-view/Home'
import AdminLayout from './component/admin-view/AdminLayout'
import Dashboard from './pages/admin-view/Dashboard'
import CheckAuth from './component/common/CheckAuth'
import NotFound from './pages/common/NotFound'
import UnAuthPage from './pages/common/UnAuthPage'

import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuthFailure, checkAuthStart, checkAuthSuccess } from './redux/authSlice'
import { checkAuthAPI } from './api/api'
import Listing from './pages/shopping-view/Listing';
import Products from './pages/admin-view/Products';

const App = () => {

  const dispatch = useDispatch()

  const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth)




  const checkAuth = async () => {
    try {
      dispatch(checkAuthStart())
      const checkAuthResponse = await checkAuthAPI()
      if (checkAuthResponse?.success) {
        dispatch(checkAuthSuccess(checkAuthResponse))
        // toast.success(checkAuthResponse?.message)
      } else {
        dispatch(checkAuthFailure(checkAuthResponse))
        toast.error(checkAuthResponse?.message)
      }
    } catch (error) {
      toast.error(error)
      console.log('Error while check auth', error)
    }
  }

  useEffect(() => {
    checkAuth()
  }, [dispatch])

  if (isLoading) {
    return <div className='d-flex align-items-center justify-content-center'>Loading...</div>
  }


  console.log('isloading', isLoading)

  return (
    <div>
      <ToastContainer />
      <Routes>

        <Route path='/' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          </CheckAuth>
        } />

        {/* auth routes */}

        <Route path='/auth' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>
        }>
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        {/* shopping routes */}

        <Route path='/shop' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}><ShoppingLayout />
          </CheckAuth>
        }>
          <Route path='home' element={<Home />} />
          <Route path='listing' element={<Listing />} />
        </Route>

        {/* admin routes */}

        <Route path='/admin' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </CheckAuth>}
        >
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='products' element={<Products />} />
        </Route>



        <Route path='/unauth-page' element={<UnAuthPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes >

    </div >
  )
}

export default App