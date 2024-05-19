import Joi from "joi";
import userModel from "../model/userModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import recipePostModel from "../model/recipePostModel.js";
const {validate, User} = userModel // destructure validate and User from userModel file
// create user
export const createUser = async (req, res) => {
    try {
        // check if user already exists
        const {email} = req.body
        const user = await User.findOne({email: email})
        if(user){
            return res.status(409).json({message: "User with given email already exist"})
        }
        // validate the data && check any errors
        const {error} = validate(req.body)
        if(error){
            return res.status(400).json({message: error.details[0].message})
        }
        // using SALT for enhanced security and bcrypt for hashed password
        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hashPassword = await bcrypt.hash(req.body.password, salt)
        // save user
        await new User({...req.body, password: hashPassword}).save()
        return res.status(200).json({message: 'user created successfully'})
    } catch (error) {
        return res.status(400).json({message: "Internal Server Error"})
    }
}

// login user 
export const loginUser = async (req, res) => {
    try {
        // check if user exists so we can authenticate
        const {email} = req.body
        const user = await User.findOne({email: email})
        if(!user){
            return res.status(409).json({message: "Invalid Email or Password"})
        }
        // validate userLogin and check errors
        const {error} = validateUser(req.body)
        if(error){
            return res.status(400).json({message: error.details[0].message})
        }
        // compare passwords
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if(!validPassword){
            return res.status(409).json({message: "Invalid Email or Password"})
        }
        // create token for user
        const token = jwt.sign({userId: user._id}, process.env.JWT_PRIVATE_KEY, {expiresIn: '2d'})
       

        //set token in cookies
        res.cookie('token', token, {
            httpOnly: true,
            // secure: true,
            // maxAge: 8640000
        })
        return res.status(200).json({token: token, message: "Logged in successfully", user: {firstName: user.firstName}})
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"})
        console.log(error)
    }
}

// validate user login func
const validateUser = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password")
    })
    return schema.validate(data)
}

// verify token
export const verifyToken = async (req, res, next) => {
     const token = req.cookies.token
     if(!token){
       return res.status(401).json({message: 'Access denied, no  token provided.'}) 
     }
     try {
        const verifiedToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY)
        req.userId = verifiedToken.userId;
        next()
     } catch (error) {
       return  res.status(403).json({message: 'Invalid Token, please log in again.'})
     }
}

// logout user
export const logout = (req, res) => {
    try {
        res.clearCookie('token')
        return res.status(200).json({message: "Logged out successfully"})
    } catch (error) {
        return res.status(400).json({error: `error logging out ${error}`})
    }

}

// delete account
export const deleteAccount = async (req, res) => {
    try {
        const userId = req.userId
        const deletedUser = await User.findByIdAndDelete(userId)
        if(deletedUser){
            res.clearCookie('token')
            await recipePostModel.deleteMany({user: userId})
        }
        console.log('deleted user', deletedUser)
        return res.status(200).json(deletedUser)
    } catch (error) {
        return res.status(400).json(error)
    }
}



