import React, { useState } from 'react'
import Forms from '../../component/common/Forms'
import { loginFormControls } from '../../config/data'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginFailure, loginStart, loginSuccess, loginUser } from '../../redux/authSlice';
import { loginAPI } from '../../api/api';

const AuthLogin = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [error, setError] = useState(null)

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const { isLoading } = useSelector((state) => state.auth)
  console.log('formdata', formData)

  const onSubmit = async (e) => {
    // e.preventDefault()

    // try {



    // } catch (error) {
    //   setError(error)
    // }

    // dispatch(loginUser(formData)).then((data) =>
    //   console.log('logindata', data)
    // ).catch((err) =>
    //   console.log('error', err))
    e.preventDefault()
    try {
      dispatch(loginStart())
      const loginResponse = await loginAPI(formData)
      console.log('loginresponse', loginResponse)
      if (loginResponse?.success) {
        dispatch(loginSuccess(loginResponse))
        toast.success(loginResponse?.message)
        return
      } else {
        toast.error(loginResponse?.message)
        dispatch(loginFailure(loginResponse))
        return
      }

    } catch (error) {
      console.log(error)
      dispatch(loginFailure(error))
    }
  }

  return (
    <>
      <ToastContainer />
      <div>
        <Forms
          formData={formData}
          setFormData={setFormData}
          formControls={loginFormControls}
          onSubmit={onSubmit}
          buttonText="Login"
          isLoading={isLoading}
        />
        <button className='btn btn-warning mt-3' onClick={() => navigate('/auth/register')}>Register</button>
      </div>

    </>
  )
}

export default AuthLogin