import recipeModel from "../model/recipeModel.js"
import recipePostModel from "../model/recipePostModel.js"



// add to favorites tab
export const addToFavorites =  async (req, res) => {
    try {
        const {title, image, recipe, instruction} = req.body
        const userId = req.userId // to identify which user added the recipe
        const favorites = await recipeModel.create({
            title,
            image,
            recipe,
            instruction,
            user: userId
            
        })
        return res.status(201).json(favorites);
    } catch (error) {
        console.log(error)
        return res.status(400).json({error, user: userId})
        
    }
}

// remove from favorites
export const removeFromFavorites = async (req, res) => {
    try {
        const { title } = req.params
        const removedRecipe = await recipeModel.findOneAndDelete({title: title})
        return res.status(201).json(removedRecipe)
    } catch (error) {
        return res.status(400).json({error: error})
    }
}
// get user favorites
export const getUserFavorites = async (req, res) => {
    try {
        const userId = req.userId
        const userRecipes = await recipeModel.find({user: userId})
        if(userRecipes.length  === 0){
            return res.status(204).json({message: 'No recipes added yet'})
        }
        return res.status(200).json(userRecipes)
    } catch (error) {
        return res.status(400).json({error: error})
    }
}

// delete from favorites
export const deleteFromFavorites = async (req, res) => {
    try {
        const { id } = req.params
        const deletedRecipe = await recipeModel.findByIdAndDelete({_id: id})
        return res.status(201).json(deletedRecipe)
    } catch (error) {
        return res.status(400).json({error: "Failed to delete recipe"})
    }
}

// get recipe by id
export const getRecipeById = async(req, res) => {
    try {
        const { id } = req.params;
        const foundRecipe = await recipeModel.findById({_id : id})
        return res.status(201).json(foundRecipe);
    } catch (error) {
        return res.status(400).json({error: error})
    }
}

// post recipe by user
export const postRecipe = async (req, res) => {
   try {
    const {title, recipes, recipeInstructions, comments} = req.body
    const userId = req.userId
    const imagePath = req.file ? req.file.path : null
        const newRecipe = await recipePostModel.create({
             title,
             recipes,
             recipeInstructions,
             recipeImage: imagePath,
             comments,
             user: userId
        })
        console.log(newRecipe)
        return res.status(201).json({newRecipe, imagePath: imagePath});
   } catch (error) {
        return res.status(400).status({error: error})
   }
}

// update with based on ID
export const updateRecipePost = async (req, res) => {
    try{
        const {id} = req.params
        const {title, recipes, recipeInstructions, comments} = req.body
        // update image if provided
        let imagePath = null
        if(req.file){
            imagePath =  req.file.path
        }
        const updatedData = {
            title,
            recipes,
            recipeInstructions,
            comments
        }
        if(imagePath){
            updatedData.recipeImage = imagePath
        }
        const updatedRecipe = await recipePostModel.findByIdAndUpdate({_id: id}, updatedData, {new: true})
        console.log(updatedRecipe)
        return res.status(200).json(updatedRecipe);
    }catch(error){
        return res.status(400).json({error: error})
    }   
}

// get user recipes
export const getUserRecipes = async (req, res) => {
    try {
       const userId = req.userId
       const foundUserRecipe = await recipePostModel.find({user: userId}).populate('user', 'firstName lastName')
       if(foundUserRecipe.length === 0){
            return res.status(204).json({message: 'No any posted recipes yet.'})
       }
       return res.status(200).json(foundUserRecipe)
    } catch (error) {
       return res.status(400).json({error: error})
    }
}

// delete user recipe
export const deleteRecipe = async (req, res) => {
    try {
        const {id} = req.params
        const deletePost = await recipePostModel.findByIdAndDelete({_id: id})
        return res.status(200).json(deletePost)
    } catch (error) {
        return res.status(400).json({error: error})
    }
}

// get user recipe details
export const getRecipeDetails = async (req, res) => {
    try {
        const {id} = req.params
        const foundUserRecipe = await recipePostModel.findById({_id: id})
        console.log(foundUserRecipe)
        return res.status(200).json(foundUserRecipe)
    } catch (error) {
        return res.status(400).json({error: error})
    }
}

// fetch recipes for form update
export const fetchRecipesToUpdate = async (req, res) => {
    try {
        const {id} = req.params
        const foundRecipeToUpdate = await recipePostModel.findById({_id: id})
        console.log(foundRecipeToUpdate)
        return res.status(200).json(foundRecipeToUpdate)
    } catch (error) {
        return res.status(400).json({error: error})
    }
}

// get all recipes for users to explore
export const getAllRecipes = async (req, res) => {
    try {
        const {searchTerm} = req.query
        let recipes;
        if(searchTerm){
            recipes = await recipePostModel.find({
                title: { $regex: new RegExp(searchTerm, 'i')},
                user: { $ne: null }
            }).populate('user', 'firstName lastName')
        }else{
            recipes = await recipePostModel.find({
                user: {$ne: null}
            }).populate('user', 'firstName lastName')
        }
        if(recipes.length === 0)
            return res.status(201).json({message: 'No recipes to explore'})
        return res.status(200).json(recipes)
    } catch (error) {
        return res.status(400).json({error: error})
    }
}

// get recipes of User
export const getRecipesOfUser = async (req, res) => {
    try {
        const userId = req.params.id
        const userRecipes = await recipePostModel.find({user: userId}).populate('user', 'firstName lastName')
        return res.status(200).json(userRecipes)
    } catch (error) { 
        console.log(error)
        return res.status(400).json({error: error})
    }
}