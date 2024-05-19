
import mongoose from "mongoose";

const recipePostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    recipes: [{
        type: String,
        required: true
    }],
    recipeInstructions: [{
        type: String,
        required: true
    }],
    recipeImage: {
        type: String,
        required: true
        
    },
    comments: {
        type: String,
     
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
     
    }
}, {timestamps: true})

const recipePostModel = mongoose.model('recipePost', recipePostSchema)

export default recipePostModel