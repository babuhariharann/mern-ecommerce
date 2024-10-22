import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className='container py-5' style={{ height: "100vh" }}>

      <div className='row h-100'>
        <div className='col-6'>
          <div className='bg-dark d-flex align-items-center justify-content-center h-100'>
            <h3 className='text-white'>Welcome to the ecommerce </h3>
          </div>
        </div>
        <div className='col-6'>
          <Outlet />
        </div>
      </div>

    </div>
  )
}

export default AuthLayout