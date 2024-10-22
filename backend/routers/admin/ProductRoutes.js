import express from 'express'
import { addNewProduct, deleteProduct, editProduct, getAllProducts, handleImageUpload } from '../../controllers/ProductControllers.js'
import { upload } from '../../utils/Cloudinary.js'

const router = express.Router()


router.post('/upload-image', upload.single('image'), handleImageUpload)
router.get('/get-products', getAllProducts)
router.post('/add-product', addNewProduct)
router.delete('/delete/:id', deleteProduct)
router.post('/update-product/:id', editProduct)

export default router