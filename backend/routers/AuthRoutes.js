import express from 'express'
import { login, logout, register } from '../controllers/AuthControllers.js'
import { AuthMiddleware } from '../utils/AuthMiddleware.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)
router.get('/check-auth', AuthMiddleware, (req, res) => {
  const user = req.user
  console.log('user', user)
  return res.status(200).json({
    success: true,
    message: "Authenticated user",
    user,
  })
})
// router.get('/check-auth', (req, res) => {
//   console.log('checkauthreceived')
// })


export default router