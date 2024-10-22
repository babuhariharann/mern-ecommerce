import React from 'react'
import { Outlet } from 'react-router-dom'

const ShoppingLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default ShoppingLayout