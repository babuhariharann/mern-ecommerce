import axios from "axios";

const localHostName = "http://localhost:5000";

axios.defaults.withCredentials = true;

/** register api */

export const registerAPI = async (formData) => {
  const { userName, email, password } = formData

  try {
    const response = await axios.post(`${localHostName}/api/auth/register`, { userName, email, password })
    console.log('response', response)
    return response?.data
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message ? error?.response?.data?.message : error?.message
    }
  }
}

/** login api */

export const loginAPI = async (formData) => {

  const { email, password } = formData
  try {

    const response = await axios.post(`${localHostName}/api/auth/login`, { email, password })
    return response?.data

  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message ? error?.response?.data?.message : error?.message
    }
  }
}

/** logout api */

export const logoutAPI = async () => {
  try {
    const response = await axios.get(`${localHostName}/api/auth/logout`)
    return response?.data

  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message ? error?.response?.data?.message : error?.message
    }
  }
}

/** check auth api */

export const checkAuthAPI = async () => {
  try {
    const response = await axios.get(`${localHostName}/api/auth/check-auth`, {
      headers: {
        'Cache-Control': 'no-store, no-cache,must-revalidate,proxy-revalidate',
        Expires: '0'
      }
    }
    )
    return response?.data
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message ? error?.response?.data?.message : error?.message
    }
  }
}


/** cloudinary upload image */

export const cloudinaryImageUploadAPI = async (file) => {
  try {
    const response = await axios.post(`${localHostName}/api/admin/products/upload-image`, file)
    console.log(response)
    return response?.data

  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message ? error?.response?.data?.message : error?.message
    }
  }
}


/** get product */

/** add product */

export const addProductAPI = async (formData) => {

  const { image, title, description, category, brand, price, salePrice, totalStock } = formData

  console.log('imagessssssssss', formData)
  try {

    const response = await axios.post(`${localHostName}/api/admin/products/add-product`, { image, title, description, category, brand, price, salePrice, totalStock })

    return response?.data
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message ? error?.response?.data?.message : error?.message
    }
  }
}

/** edit product */

/** delete product */