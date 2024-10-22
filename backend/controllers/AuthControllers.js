import User from "../modals/UserModel.js"
import { ErrorHandler } from "../utils/ErrorHandler.js"
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'



/** register user */

export const register = async (req, res, next) => {

  const { userName, email, password } = req.body

  console.log('username', userName, email, password)
  try {
    if (!userName || !email || !password || userName == '' || email == '' || password == '') {
      return next(ErrorHandler(400, 'All fields are required'))
    }

    const checkUser = await User.findOne({ email })
    if (checkUser) {
      return next(ErrorHandler(400, 'Email already exists'))
    }

    const hashPassword = await bcryptjs.hashSync(password, 12)

    const newUser = new User({ userName, email, password: hashPassword })
    await newUser.save()
    return res.status(200).json({
      success: true,
      message: "User successfully registered"
    })
  } catch (error) {
    next(error)
  }
}

/** login user */

export const login = async (req, res, next) => {

  const { email, password } = req.body

  console.log('body', email, password)

  try {

    if (!email || !password || email == '' || password == '') {
      return next(ErrorHandler(400, 'All fields are required'))
    }

    const checkUser = await User.findOne({ email });

    if (!checkUser) {
      return next(ErrorHandler(404, 'User not found'))
    }
    const confirmPassword = await bcryptjs.compareSync(password, checkUser.password)

    if (!confirmPassword) {
      return next(ErrorHandler(400, 'Password does not match'))
    }
    console.log('role', checkUser.role)
    const token = jwt.sign({
      id: checkUser._id,
      role: checkUser.role
    },
      process.env.SECRET, { expiresIn: "60m" }
    )

    const { password: pass, ...rest } = checkUser._doc

    console.log('passwordd', pass)

    return res.status(200).cookie('access_token', token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Login Successfully",
      user: rest
    })

  } catch (error) {
    next(error)
  }
}

/** logout */

export const logout = async (req, res, next) => {
  try {
    return res.clearCookie('access_token').json({
      success: true,
      message: "Logout successfully"
    })
  } catch (error) {
    next(error)
  }
}