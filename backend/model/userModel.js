import mongoose from "mongoose";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity"

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})



// validate user data on sign up
const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().required().email().label("Email"),
        firstName: Joi.string().required().label("First Name"),
        lastName: Joi.string().required().label("Last Name"),
        password: passwordComplexity().required().label("Password")    
    })
    return schema.validate(data)
}
const User = mongoose.model("user", userSchema)

export default {User, validate}