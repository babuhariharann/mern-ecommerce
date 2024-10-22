import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  salePrice: {
    type: String,
    required: true
  },
  totalStock: {
    type: String,
    required: true
  }
})

export const Product = mongoose.model('Product', productSchema)