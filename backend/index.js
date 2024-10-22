import express from 'express'
import ConnectDatabase from './database/ConnectDatabase.js'
import { config } from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'


import AuthRoutes from './routers/AuthRoutes.js'
import productRoutes from './routers/admin/ProductRoutes.js'
const app = express()

config({
  path: './config/config.env'
})


const corsOption = {
  origin: process.env.FRONT_URL,
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    "Cache-Control",
    "Expires",
    "Pragma",
  ],
  credentials: true
}

app.use(cors(corsOption))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

/** routes */

app.use('/api/auth', AuthRoutes)
app.use('/api/admin/products', productRoutes)


/** connect database and server start */

ConnectDatabase().then(() => app.listen(process.env.PORT, console.log('Server running on 5000'))).catch((error) => console.log('Error while start the server', error))


/** error handling middleware */

app.use((err, req, res, next) => {

  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal server error'
  return res.status(statusCode).json({
    success: false,
    message
  })
})