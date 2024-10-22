import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'
import AdminHeader from './AdminHeader'

const AdminLayout = () => {
  return (
    <div className='d-flex'>
      <AdminSidebar />
      <div className='p-3 w-100'>
        <AdminHeader />
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout