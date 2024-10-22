import React, { useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import Offcanvas from 'react-bootstrap/Offcanvas';
import Forms from '../../component/common/Forms';
import { addProductFormElements } from '../../config/data';
import ImageUpload from '../../component/common/ImageUpload';
import { addProductAPI } from '../../api/api';
import { useDispatch, useSelector } from 'react-redux';
import { addAdminProductFailure, addAdminProductStart, addAdminProductSuccess } from '../../redux/admin/productSlice';
import { ToastContainer, toast } from 'react-toastify';


const Products = () => {

  const [showCanvas, setShowCanvas] = useState(false)
  const [formData, setFormData] = useState({
    image: null,
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    salePrice: "",
    totalStock: ""
  })

  const [imageFile, setImageFile] = useState(null)
  const [uploadImageUrl, setUploadImageUrl] = useState('')

  const dispatch = useDispatch()

  const { isLoading, productList, error } = useSelector((state) => state.adminProduct)

  console.log('isloadingg', isLoading)

  console.log('imagefile', imageFile)

  console.log('productformdata', formData)

  const handleShowCanvas = () => {
    setShowCanvas(true)
  }

  const handleHideCanvas = () => {
    setShowCanvas(false)
  }





  /** get products */

  /** Add product */

  const handleAddProduct = async (e) => {
    e.preventDefault()
    setFormData((prevFormData) => ({ ...prevFormData, image: uploadImageUrl }))
    console.log('formdatadddd', formData)


    // try {
    //   dispatch(addAdminProductStart())
    //   const addProductResponse = await addProductAPI(formData)
    //   if (addProductResponse?.success) {
    //     dispatch(addAdminProductSuccess())
    //     toast.success(addProductResponse?.message)
    //   } else {
    //     dispatch(addAdminProductFailure())
    //     toast.success(addProductResponse?.message)
    //   }
    // } catch (error) {
    //   console.log(error)
    //   dispatch(addAdminProductFailure())
    // }
  }


  /** Edit product */

  /** delete product */

  return (
    <>
      <ToastContainer />
      <div className='d-flex justify-content-end mt-4'>
        <button className='border-0 outline-0 bg-transparent' onClick={handleShowCanvas}>
          <GiHamburgerMenu fontSize={20} />
        </button>
      </div>

      <Offcanvas placement='end' show={showCanvas} onHide={handleHideCanvas}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            Add Products
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>
            <div className='image-upload'>
              <ImageUpload
                imageFile={imageFile}
                setImageFile={setImageFile}
                uploadImageUrl={uploadImageUrl}
                setUploadImageUrl={setUploadImageUrl} />
            </div>
            <Forms
              formControls={addProductFormElements}
              formData={formData}
              setFormData={setFormData}
              buttonText="Add Product"
              onSubmit={handleAddProduct}
              isLoading={isLoading}
            />
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default Products