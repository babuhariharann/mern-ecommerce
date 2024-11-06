import React, { useEffect, useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import Offcanvas from 'react-bootstrap/Offcanvas';
import Forms from '../../component/common/Forms';
import { addProductFormElements } from '../../config/data';
import ImageUpload from '../../component/common/ImageUpload';
import { addProductAPI, getProductAPI } from '../../api/api';
import { useDispatch, useSelector } from 'react-redux';
import { addAdminProductFailure, addAdminProductStart, addAdminProductSuccess, getAdminProductFailure, getAdminProductStart, getAdminProductSuccess, updateAdminProductFailure, updateAdminProductStart } from '../../redux/admin/productSlice';
import { ToastContainer, toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

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
  const [currentProduct, setCurrentProduct] = useState(null)

  const [adminProductsList, setAdminProductsList] = useState([])
  const [imageFile, setImageFile] = useState(null)
  const [uploadImageUrl, setUploadImageUrl] = useState('')


  const dispatch = useDispatch()

  const { isLoading, productList, error } = useSelector((state) => state.adminProduct)


  const handleShowCanvas = () => {
    setShowCanvas(true)
  }

  const handleHideCanvas = () => {
    setShowCanvas(false)
    setCurrentProduct(null)
  }




  /** get products */

  const getAllProducts = async () => {
    try {
      dispatch(getAdminProductStart())
      const getProductsResponse = await getProductAPI()
      console.log('getproductss', getProductsResponse)
      if (getProductsResponse?.success) {
        dispatch(getAdminProductSuccess(getProductsResponse?.products))
        // setAdminProductsList(getProductsResponse?.products || [])
        console.log('getproductssress', getProductsResponse?.products)

        // setAdminProductsList([getProductsResponse?.products, ...adminProductsList])
        setAdminProductsList([...getProductsResponse?.products, ...adminProductsList]);
        console.log('adminproductlist', adminProductsList)
      }
    } catch (error) {
      console.log(error)
      dispatch(getAdminProductFailure())
      toast.error(error || 'An error occurred while adding the product ')
    }
  }



  /** Add product */

  const handleAddProduct = async (e) => {

    if (e) e.preventDefault()

    try {
      dispatch(addAdminProductStart())

      const addProductResponse = await addProductAPI(formData)
      if (addProductResponse?.success) {
        dispatch(addAdminProductSuccess())
        toast.success(addProductResponse?.message)
        setFormData({
          image: null,
          title: "",
          description: "",
          category: "",
          brand: "",
          totalStock: "",
          salePrice: "",
          price: ""
        })
        setImageFile(null)
        handleHideCanvas()
        getAllProducts()

      } else {
        dispatch(addAdminProductFailure())
        toast.error(addProductResponse?.message || 'Failed to add product')
      }
    } catch (error) {
      console.log(error)
      dispatch(addAdminProductFailure())
      toast.error(error || 'An error occurred while adding the product ')
    }
  }



  /** Edit product */

  const handleEditProducts = async (getItem) => {
    console.log('getitem', getItem)
    handleShowCanvas()
    // setFormData({
    //   image: getItem?.image,
    //   title: getItem?.title,
    //   description: getItem?.description,
    //   category: getItem?.category,
    //   brand: getItem?.brand,
    //   totalStock: getItem?.totalStock,
    //   salePrice: getItem?.salesPrice,
    //   price: getItem?.price
    // })
    setCurrentProduct(getItem)
    setFormData({
      image: getItem?.image,
      title: getItem?.title,
      description: getItem?.description,
      category: getItem?.category,
      brand: getItem?.brand,
      totalStock: getItem?.totalStock,
      salePrice: getItem?.salesPrice,
      price: getItem?.price
    })
  }

  console.log('currentproduct', currentProduct)

  /** delete product */

  useEffect(() => {
    setFormData((prevData) => ({ ...prevData, image: uploadImageUrl }))
  }, [uploadImageUrl]);

  useEffect(() => {
    getAllProducts()
  }, [])

  if (isLoading) {
    return <div>Fetching...</div>
  }


  return (
    <>
      <ToastContainer />
      <div>


        <div className='d-flex justify-content-end mt-4'>
          <button className='border-0 outline-0 bg-transparent' onClick={handleShowCanvas}>
            <GiHamburgerMenu fontSize={20} />
          </button>
        </div>

        <div>
          <p>Products</p>

          {adminProductsList && adminProductsList.length ?
            <div className='row mt-5'>
              {adminProductsList.map((item) => (
                <div className='col-4 mb-3' key={item?._id}>
                  <Card >
                    <Card.Img variant="top" src={item?.image} style={{ minHeight: "200px", height: "200px", maxHeight: "200px", objectFit: "cover" }} />
                    <Card.Body>
                      <Card.Title>{item?.title}</Card.Title>
                      <Card.Text>
                        {item?.description}
                      </Card.Text>
                      <div className='mt-4 d-flex align-items-center gap-3'>
                        <Button variant="primary" onClick={() => handleEditProducts(item)}>Edit</Button>
                        <Button variant="danger">Delete</Button>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div> : <p>No products</p>}
        </div>
      </div>



      <Offcanvas placement='end' show={showCanvas} onHide={handleHideCanvas}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {currentProduct !== null ? 'Edit Product' : "Add Product"}
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
              buttonText={currentProduct !== null ? 'Update' : 'Add'}
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