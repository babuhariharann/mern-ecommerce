import React, { useEffect, useRef, useState } from 'react'
import { cloudinaryImageUploadAPI } from '../../api/api'

const ImageUpload = ({ imageFile, setImageFile, uploadImageUrl, setUploadImageUrl }) => {

  const inputRef = useRef(null)
  const [imageUploading, setImageUploading] = useState(false)

  /** image upload function */

  const handleImageUpload = (e) => {
    console.log('uploadimage', e.target.files?.[0])
    const selectedImage = e.target.files?.[0]
    if (selectedImage) {
      setImageFile(selectedImage)
    }
  }

  /** image drag function */

  const handleImageDrag = (e) => {
    e.preventDefault()
  }

  /** image drop function */

  const handleImageDrop = (e) => {
    const droppedFile = e.dataTransfer.files?.[0]
    if (droppedFile) {
      setImageFile(droppedFile)
    }
  }


  /** image remove function */

  const handleRemoveImage = () => {
    setImageFile(null)
    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  /** upload cloudinary */

  const handleCloudinaryUpload = async () => {
    try {
      const data = new FormData();
      if (!imageFile) return
      console.log('imagefile', imageFile)
      setImageUploading(true)
      data.append("image", imageFile)
      console.log('datas', data)
      const cloudinaryUploadResponse = await cloudinaryImageUploadAPI(data)
      console.log('clod', cloudinaryUploadResponse)
      if (cloudinaryUploadResponse?.success) {
        setImageUploading(false)
        setUploadImageUrl(cloudinaryUploadResponse?.result?.url)
      }
      setImageUploading(false)
    } catch (error) {
      console.log(error)
      setImageUploading(false)
    }
  }


  console.log('imageupload url', uploadImageUrl, imageUploading)

  useEffect(() => {
    handleCloudinaryUpload()
  }, [imageFile])

  return (
    <div className='mb-3'>
      <label>
        Upload Image
      </label>

      <div className='mt-2' onDragOver={handleImageDrag} onDrop={handleImageDrop}>
        <input
          id='upload-image'
          type='file'
          className='d-none'
          ref={inputRef} onChange={handleImageUpload} />

        {!imageFile ? <label htmlFor='upload-image' className='rounded border p-4'>
          <span>Drag and drop or click to upload image</span>

        </label> : <div className='d-flex align-items-center justify-content-between gap-3 border p-2 rounded'>
          {imageUploading ? <p>Uploading...</p> : <div className='d-flex align-items-center justify-content-between gap-3'>
            <p>{imageFile.name}</p>
            <button className=' border-0 outline-0 bg-transparent' onClick={handleRemoveImage}>
              x
            </button></div>}

        </div>}



      </div>
    </div>
  )
}

export default ImageUpload