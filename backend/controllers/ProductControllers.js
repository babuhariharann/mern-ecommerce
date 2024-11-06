import { Product } from "../modals/ProductModel.js";
import { imageUploadUtils } from "../utils/Cloudinary.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";



/** image upload */

export const handleImageUpload = async (req, res, next) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtils(url);

    return res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    next(error)
  }
}

/** get all products */

export const getAllProducts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.start);
    const limit = parseInt(req.query.limit)
    const sortDirection = req.query.sort == 'asc' ? 1 : -1;

    const fetchProducts = await Product.find().sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    if (!fetchProducts) {
      return next(ErrorHandler(404, 'Products not found'))
    }

    const totalProducts = await Product.countDocuments()
    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      products: fetchProducts,
      totalProducts
    })
  } catch (error) {
    next(error)
  }
}

/** add new product */

export const addNewProduct = async (req, res, next) => {

  console.log('addnewproduct', req.body)
  const { image, title, description, category, brand, price, salePrice, totalStock } = req.body

  console.log('imageee', image)

  // Fields to validate
  const requiredFields = { image, title, description, category, brand, price, salePrice, totalStock };

  // Loop over required fields
  for (const [key, value] of Object.entries(requiredFields)) {
    if (!value || value === '') {
      return next(ErrorHandler(400, `${key.charAt(0).toUpperCase() + key.slice(1)} field is required`));
    }
  }

  try {

    const newProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock
    })

    await newProduct.save()
    return res.status(200).json({
      success: true,
      message: "Successfully added new product",
      product: newProduct
    })

  } catch (error) {
    next(error)
  }
}

/** edit product */

export const editProduct = async (req, res, next) => {

  const { id } = req.params

  const { image, title, description, category, brand, price, salePrice, totalStock } = req.body

  const requiredFields = { image, title, description, category, brand, price, salePrice, totalStock }

  if (!id) {
    return next(ErrorHandler(400, 'You must provide id for edit this product'))
  }
  try {

    const findProducts = await Product.findById(id)
    if (!findProducts) {
      return next(ErrorHandler(400, 'Product not found'))
    }

    for (const [key, value] of Object.entries(requiredFields)) {
      if (value == "" || !value) {
        return next(ErrorHandler(400, `${key.charAt(0).toUpperCase() + key.slice(1)} field is required`))
      }
    }

    const newUpdateData = { image, title, description, category, brand, price, salePrice, totalStock }

    const updatedProduct = await Product.findByIdAndUpdate(id, newUpdateData)

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct
    })
  } catch (error) {
    next(error)
  }
}

/** delete a product */

export const deleteProduct = async (req, res, next) => {

  const { id } = req.params



  if (!id) {
    return next(ErrorHandler(400, 'You must provide id for delete the product'))
  }
  try {

    const findProducts = await Product.findById(id)

    if (!findProducts) {
      return next(ErrorHandler(404, 'Product not found'))
    }

    await findProducts.deleteOne()
    return res.status(200).json({
      success: true,
      message: "Product deleted successfully"
    })

  } catch (error) {
    next(error)
  }
}