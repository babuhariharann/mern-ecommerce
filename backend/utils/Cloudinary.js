import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer'


cloudinary.config({
  cloud_name: "dlh9o3edb",
  api_key: "154619739422872",
  api_secret: "X6c4AQcUTvnykKCptFFa_a5oYjg",
})

const storage = new multer.memoryStorage()

export const imageUploadUtils = async (file) => {
  const result = await cloudinary.uploader.upload(file, { resource_type: "auto" })
  return result
}

export const upload = multer({ storage })
