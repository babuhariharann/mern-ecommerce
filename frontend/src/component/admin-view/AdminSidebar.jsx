import React from 'react'
import { adminSidebarMenuItems } from '../../config/data'
import { NavLink } from 'react-router-dom'

const AdminSidebar = () => {
  return (
    <div className='sidebar-admin '>
      <h5 className='fw-bold'>Admin</h5>
      {adminSidebarMenuItems.map((menuItem) => (
        <ul key={menuItem.id}>
          <li>
            <NavLink to={menuItem.path}>
              {menuItem.label}
            </NavLink>
          </li>
        </ul>
      ))}
    </div>
  )
}

export default AdminSidebar