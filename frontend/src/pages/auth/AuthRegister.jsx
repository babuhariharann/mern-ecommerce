import React, { useState } from 'react'
import Forms from '../../component/common/Forms'
import { registerFormControls } from '../../config/data'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerFailure, registerStarts, registerSuccess } from '../../redux/authSlice';
import { registerAPI } from '../../api/api';

const AuthRegister = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: ""
  })
  const { isLoading, error } = useSelector((state) => state.auth)


  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      dispatch(registerStarts())
      const registerAPIresponse = await registerAPI(formData)
      console.log('registerapi', registerAPIresponse)
      if (registerAPIresponse?.success) {
        dispatch(registerSuccess(registerAPIresponse))
        toast.success(registerAPIresponse?.message)
        setTimeout(() => navigate('/auth/login'), 1500);
        return
      } else {
        dispatch(registerFailure(registerAPIresponse))
        toast.error(registerAPIresponse?.message)
        return
      }
    } catch (error) {
      console.log('error')
    }
  }
  return (
    <>
      <ToastContainer />
      <div>
        <Forms
          formData={formData}
          setFormData={setFormData}
          formControls={registerFormControls}
          onSubmit={onSubmit}
          buttonText="Register"
        />
        <button className='btn btn-warning mt-3' onClick={() => navigate('/auth/login')}>Login</button>
      </div>
    </>
  )
}

export default AuthRegister