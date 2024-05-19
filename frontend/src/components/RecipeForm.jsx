import axios from "axios"
import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"

const RecipeForm = ({lightMode}) => {
    const [recipeForm, setRecipeForm]= useState({
        title: '',
        recipes: [],
        recipeInstructions: [],
        recipeImage: null,
        comments: '',
    })
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const handlePostRecipe = async (e) => {
        e.preventDefault()
        try {
          
            const formData = new FormData()
            formData.append( 'title', recipeForm.title )
            formData.append('recipes', recipeForm.recipes)
            formData.append('recipeInstructions', recipeForm.recipeInstructions)
            formData.append('recipeImage',  recipeForm.recipeImage)
            formData.append('comments', recipeForm.comments)
            

    
            const response = await axios.post('http://localhost:8000/api/foodrecipe/postrecipe', formData, {withCredentials : true}, {
               headers: {
                 "Content-Type": "multipart/form-data",
               }, 
            })
            console.log(response.data)
            if(response.status === 201){
                setRecipeForm({
                    title: '',
                    recipes: '',
                    recipeInstructions: '',
                    recipeImage: null,
                    comments: '',
                })
                navigate('/myrecipes')
            }
            console.log(response.data)
        } catch (error) {
            if(error.response && error.response.status >= 400 && error.response.status < 500){
                setError(error.response.data.message)
            }
            console.log(error)
        }
    }
  return (
    <div className="flex flex-col items-center p-3 md:p-0">
       <h2 className="text-3xl font-bold">Post recipes for other users to explore</h2>
       <form action="POST" className={lightMode ? 'bg-white text-black text-left flex flex-col gap-4 p-5 rounded-md w-full mt-6   md:w-[50rem] md:mt-5"' : " bg-[#1E293B] text-white text-left flex flex-col gap-4 p-5 rounded-md w-full mt-6   md:w-[50rem] md:mt-5"} onSubmit={handlePostRecipe} >
            <h2 className="text-3xl font-bold">Add a new recipe</h2>
            <div className="flex flex-col">
                <label className="mb-2" htmlFor="recipe-title">Title: <span className="text-red-500 font-bold">*</span></label>
                 <input className=" px-3 p-1 rounded-sm border border-black" type="text" id="recipe-title" value={recipeForm.title} onChange={(e) => setRecipeForm({...recipeForm, title: e.target.value})} required/>
            </div>
            <div className="flex flex-col">
                <label className="mb-2" htmlFor="recipes">Recipes: <span className="text-red-500 font-bold">*</span></label>
                 <textarea className=" h-36 px-3 p-1 rounded-sm border border-black" type="text" id="recipes" value={recipeForm.recipes} onChange={(e) => setRecipeForm({...recipeForm, recipes: e.target.value})} required/>
            </div>
            <div className="flex flex-col">
                <label className="mb-2" htmlFor="recipe-instructions">Recipe Instructions: <span className="text-red-500 font-bold">*</span></label>
                 <textarea className=" h-36 px-3 p-1 rounded-sm border border-black" type="text" id="recipe-instructions" value={recipeForm.recipeInstructions} onChange={(e) => setRecipeForm({...recipeForm, recipeInstructions:e.target.value})} required/>
            </div>
            <div className="flex flex-col">
                <label className="mb-2" htmlFor="recipe-image">Upload Image:</label>
                <input className=" px-3 p-1 rounded-sm border border-black bg-white text-black" type="file" accept="image/*" id="recipe-image" onChange={(e) => setRecipeForm({...recipeForm, recipeImage:e.target.files[0]})} required/>
            </div>
            <div className="flex flex-col">
                <label className="mb-2" htmlFor="comments">Further comments:</label>
                <textarea className=" h-36 px-3 p-1 rounded-sm border border-black" type="text" id="comments" placeholder="type for example 'lovely recipe, I hope you enjoy it'... " value={recipeForm.comments} onChange={(e) => setRecipeForm({...recipeForm, comments:e.target.value})} />
            </div>
            {error && <div className="border bg-red-500 text-white"> {error} </div>}
            <div className="flex items-center justify-between">
                <button type="submit" className="bg-green-500 text-white w-36 p-2 rounded-md border hover:border-blue-300">Post Recipe</button>
                <Link to="/myrecipes"><button type="submit" className="bg-red-500 text-white w-36 p-2 rounded-md border hover:border-blue-300">Cancel</button></Link>
            </div>
          
        </form> 
    </div>
  )
}

export default RecipeForm
