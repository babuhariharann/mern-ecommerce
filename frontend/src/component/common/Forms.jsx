import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useSelector } from 'react-redux';
import Select from 'react-select'


const Forms = ({ formControls, formData, setFormData, buttonText, onSubmit, isLoading }) => {

  console.log('formdatga', formData)


  const selectValued = { value: "men", label: "Men" }


  const [passwordType, setPasswordType] = useState('password')
  const [selectValue, setSelectValue] = useState(null)

  const handlePasswordType = () => {
    setPasswordType(passwordType == 'password' ? "text" : "password")
  }

  const handleSelectChange = (e) => {
    console.log('selectvalkue', e)
    setSelectValue(e.value)
  }

  const renderByComponentType = (getControlItem) => {

    let element = null
    let value = formData[getControlItem.name] || ''


    console.log('valuees', value)

    switch (getControlItem.componentType) {
      case "input":
        element = (
          <input
            type={getControlItem.type}
            value={value}
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            onChange={(e) => setFormData({ ...formData, [getControlItem.name]: e.target.value })}
          />
        )
        break
      case 'textarea':
        element = (
          <textarea
            className='custom_textarea'
            value={value}
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            onChange={(e) => setFormData({ ...formData, [getControlItem.name]: e.target.value })} />
        )
        break
      case "password":
        element = (
          <div className='password'>
            <input
              type={passwordType}
              value={value}
              name={getControlItem.name}
              placeholder={getControlItem.placeholder}
              onChange={(e) => setFormData({ ...formData, [getControlItem.name]: e.target.value })}
            />
            <button
              type='button'
              onClick={handlePasswordType}
            >
              {passwordType == 'password' ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        )
        break

      case 'select':
        element = (
          <Select
            options={getControlItem.options}
            // value={selectValued}
            value={getControlItem.options.find((item) => item.value === formData[getControlItem.name])}
            placeholder={getControlItem.placeholder}
            onChange={(e) => setFormData({ ...formData, [getControlItem.name]: e.value })}
          // onChange={(e) => handleSelectChange(e)}
          />
        )
        break
      default:
        element = (
          <p>hari</p>
        )
        break
    }
    return element
  }
  return (
    <form>
      <div className='d-flex flex-column mb-3'>
        {formControls.map((controlItem) => (
          <div className=' mb-3 d-flex flex-column' key={controlItem.name}>
            <label className='mb-2'>
              {controlItem.label}
            </label>
            {renderByComponentType(controlItem)}
          </div>
        ))}
      </div>
      <button
        className='btn btn-primary w-100'
        type='submit' onClick={onSubmit}>{isLoading ? 'Loading' : buttonText || 'Submit'}</button>
    </form>
  )
}

export default Forms