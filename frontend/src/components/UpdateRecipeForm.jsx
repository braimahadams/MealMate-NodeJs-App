import axios from "axios"
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom"

const UpdateRecipeForm = () => {
    const [recipeForm, setRecipeForm]= useState({
        title: '',
        recipes: [],
        recipeInstructions: [],
        recipeImage: null,
        comments: '',
    })
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const {id} = useParams()
    const [imagePreview, setImagePreview] = useState(null)

    // fetch recipe to edit
    const fetchRecipeDetails = async () => {
        try {
           
            const response = await axios.get(`http://localhost:8000/api/foodrecipe/fetchrecipe/${id}`, {
                withCredentials: true
            })
            setRecipeForm({
                title: response.data.title,
                recipes: response.data.recipes,
                recipeInstructions: response.data.recipeInstructions,
                comments: response.data.comments
            })
            console.log(response.data)
            setImagePreview(`http://localhost:8000/${response.data.recipeImage}`)
        } catch (error) {
            console.log(error)
        }
    }

    const handleUpdateRecipe = async (e) => {
        e.preventDefault();
        try {
      
            const formData = new FormData();
            formData.append('title', recipeForm.title);
            formData.append('recipes', recipeForm.recipes);
            formData.append('recipeInstructions', recipeForm.recipeInstructions);
            formData.append('comments', recipeForm.comments);
    
            if (recipeForm.recipeImage) {
                formData.append('recipeImage', recipeForm.recipeImage);
            }
    
            const response = await axios.patch(`http://localhost:8000/api/foodrecipe/updaterecipe/${id}`, formData, {withCredentials: true}, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
    
            if (response.status === 200) {
                // Assuming the response.data contains the updated recipe
                console.log(response.data)
                navigate("/myrecipes")
            } else {
                // Handle other status codes if necessary
                console.log("Unexpected response status:", response.status);
            }
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status < 500) {
                setError(error.response.data.message);
            }
            console.log(error);
        }
    };
    

    useEffect(() => {
        fetchRecipeDetails()
    }, [])


  return (
    <div className="flex flex-col items-center p-3 md:p-0">
       <h2 className="text-3xl font-bold">Post recipes for other users to explore</h2>
       <form  className="bg-white text-black text-left flex flex-col gap-5 p-5 rounded-md w-full mt-6   md:w-[50rem] md:mt-5" onSubmit={handleUpdateRecipe} >
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
            {imagePreview && <div>Current Image:<div className="flex items-center justify-center"><img src={imagePreview} alt="food image" className="w-28 h-28 border object-contain"/></div></div>}
                <label className="mb-2" htmlFor="recipe-image">Upload Image:</label>
                <input className=" px-3 p-1 rounded-sm border border-black" type="file" accept="image/*" id="recipe-image" onChange={(e) => setRecipeForm({...recipeForm, recipeImage:e.target.files[0]})}/>
            </div>
            <div className="flex flex-col">
                <label className="mb-2" htmlFor="comments">Further comments:</label>
                <textarea className=" h-36 px-3 p-1 rounded-sm border border-black" type="text" id="comments" placeholder="type for example 'lovely recipe, I hope you enjoy it'... " value={recipeForm.comments} onChange={(e) => setRecipeForm({...recipeForm, comments:e.target.value})} />
            </div>
            {error && <div className="border bg-red-500 text-white"> {error} </div>}
            <div className="flex items-center justify-between">
                <button type="submit" className="bg-green-500 text-white w-36 p-2 rounded-md border hover:border-blue-300">Update Recipe</button>
                <Link to="/myrecipes"><button type="submit" className="bg-red-500 text-white w-36 p-2 rounded-md border hover:border-blue-300">Cancel</button></Link>
            </div>
          
        </form> 
    </div>
  )
}

export default UpdateRecipeForm
