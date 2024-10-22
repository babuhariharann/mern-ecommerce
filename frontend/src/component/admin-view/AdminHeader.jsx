import React from 'react'
import { logoutAPI } from '../../api/api'
import { useDispatch } from 'react-redux'
import { logoutFailure, logoutStart, logoutSuccess } from '../../redux/authSlice'

const AdminHeader = () => {

  const dispatch = useDispatch()

  const handleLogout = async () => {
    try {
      dispatch(logoutStart())
      const logoutResponse = await logoutAPI()
      if (logoutResponse?.success) {
        dispatch(logoutSuccess())

      } else {
        dispatch(logoutFailure())
      }

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='d-flex align-items-center justify-content-between'>
      <p className='fw-bold'>Admin</p>
      <button className='btn btn-warning' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default AdminHeader