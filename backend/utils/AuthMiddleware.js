import jwt from 'jsonwebtoken'
import { ErrorHandler } from "./ErrorHandler.js"

export const AuthMiddleware = async (req, res, next) => {
  const token = req.cookies.access_token
  console.log('token', token)
  if (!token) {
    return next(ErrorHandler(401, 'Unauthoirzed User!'))
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET)
    console.log('decoded', decoded)
    // if (!decoded) {
    //   return next(ErrorHandler(401, 'Unauthoirzed User!'))
    // }
    req.user = decoded
    next()
  } catch (error) {
    return next(ErrorHandler(401, 'Unauthoirzed User!'))
  }
}