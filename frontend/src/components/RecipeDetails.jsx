import axios from "axios"
import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"

const RecipeDetails = () => {
    const [recipeDetails, setRecipeDetails] = useState({
        title: "", 
        recipe: [], 
        image: '', 
        instruction: [],
        comments: ''
    })
    const {id} = useParams() //get th id parameter from url
    // fetch recipe details 
    const fetchRecipeDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/foodrecipe/getrecipedetails/${id}`, {
                withCredentials: true
            })
            console.log(response.data)
            setRecipeDetails({
                title: response.data.title,
                recipe: response.data.recipes,
                image: response.data.recipeImage,
                instruction: response.data.recipeInstructions,
                comments: response.data.comments
            })
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchRecipeDetails()
    }, [])
    return (
        <>
        <div>
             <div className="flex flex-col gap-8 justify-center items-center">
                <div><h2 className="text-2xl md:text-[48px] md:mt-8">Recipe Details</h2></div>
                <div className="relative h-[300px]  shadow-2xl rounded-bl-2xl rounded-br-2xl md:w-[484px] md:h-[418px]">
                     <img src={`http://localhost:8000/${recipeDetails.image}`} className=" object-contain w-[390px] h-[268px] border-r-2 border-l-2 border-t-2 border-white bg-gray-300 rounded-tl-md rounded-tr-md md:w-[484px] md:h-[370px]" alt="food Image"/>
                    <div className=" bg-white  h-[33px] w-[390px] border rounded-bl-2xl rounded-br-2xl shadow-2xl flex items-center justify-center md:w-[484px] md:h-[47px]">
                         <p className="font-semibold text-xs text-black">{recipeDetails.title}</p>
                    </div>
                </div>
              <div className="flex flex-col items-center justify-center mx-auto gap-5 md:flex-row md:gap-20">
               <div className="relative rounded-tl-xl">
                 <div className={"h-[40px] w-[390px]  bg-black rounded-tl-xl rounded-tr-xl flex items-center justify-center" }>
                     <h4 className="text-white">Recipes</h4>
                 </div>
                 <div className="bg-white h-[321px] w-[390px]  overflow-auto  md:h-[378px] md:mt-0">
                     <ul className="list-disc leading-loose text-left text-black px-10 py-5">
                        {recipeDetails.recipe.map((recipeItem, index) => (
                            <p key={index} style={{whiteSpace: 'pre-line'}}>{recipeItem}</p>
                        ))}
                     </ul>
                 </div>
               </div>
               <div className="relative  md:w-[680px] md:mt-8">
                 <div className="h-[40px] w-[390px]  bg-black rounded-tl-xl rounded-tr-xl flex items-center justify-center md:w-[580px]" >
                     <h4 className="text-white">Instructions</h4>
                 </div>
                 <div className="bg-white h-[321px] w-[390px]  overflow-y-scroll  md:w-[580px] md:h-[378px] md:mt-0">
                     <ul className="list-disc leading-loose text-left text-black px-10 py-5">
                       {recipeDetails.instruction.map((instructionItem, index) => (
                        <p key={index} style={{whiteSpace: 'pre-line'}}>{instructionItem}</p>
                       ))}
                     </ul> 
                 </div>
                
               </div>
               
            </div>
            {recipeDetails.comments.length > 0 ? (
                 <div className="relative  md:w-[580px] md:mt-8">
                    <div className="h-[40px] w-[390px]  bg-black rounded-tl-xl rounded-tr-xl flex items-center justify-center md:w-[580px]" >
                        <h4 className="text-white">Comments</h4>
                    </div>
                    <div className="bg-white h-[201px] w-[390px] overflow-y-scroll  md:w-[580px] md:h-[201px]">
                        <p className="py-5 text-left text-black  px-10">{recipeDetails.comments}</p>
                    </div>
                </div>
               ): ''}
             </div>
        </div>   
  </>

      )
}

export default RecipeDetails
