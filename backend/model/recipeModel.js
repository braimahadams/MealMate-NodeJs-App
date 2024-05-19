import mongoose from "mongoose";


const recipeSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    recipe: [{
        aisle: String
    }],
    instruction: [{
        instruction: String
    }],
    image: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
       
    }
 
})

const recipeModel = mongoose.model("recipe", recipeSchema)

export default recipeModel