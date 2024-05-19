import { useEffect, useRef, useState } from 'react'
import food from "../assets/food.jpg"
import foodRecipe from "../assets/recipe.jpg"
import ContentSection from "./ContentSection"
import { faL, faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"


const HeroSection = ({lightMode}) => {

    const API_KEY='1d604e2dfc3d434a8f8a706d553d9933' // APIKEY from spoonacular
    const [foodData, setFoodData] = useState([]) // array for storing details
    const [showSpinner, setShowSpinner] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const currentSection = useRef(null)
    const spinnerSection = useRef(null)

    //handle Generate recipe
    const handleGenerate = async () => { 
        setShowSpinner(true)
        setFoodData([]) //set food array on re-click generate
     
        const id = Math.floor(Math.random() * 90000) + 1 //generating random number for random recipe
        const foodAPI = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&includeNutrition=true`
    
        try {
            const response = await fetch(foodAPI)
            const data = await response.json()
            
            setTimeout(() => {
                const recipes = []
                const instructions = []
                
                //check if item is already in the list, to get rid of duplicates
                if(data.extendedIngredients){
                    data.extendedIngredients.forEach(ingredient => {
                        if(!recipes.some(recipe => recipe.aisle === ingredient.aisle)){
                            recipes.push({aisle: ingredient.aisle})
                        }
                        if(!instructions.some(instruction => instruction.original === ingredient.original)){
                            instructions.push({instruction: ingredient.original})
                        }
                    })
                }
                
                const timeStamp = new Date().getTime() 
                setFoodData([
                    {  
                        id: timeStamp,
                        image: data.image, 
                        title: data.title, 
                        recipe: recipes,
                        instruction:  instructions,
                        
                    }
                ])
                console.log(foodData)
                //scroll to section
               if(currentSection.current){
                    currentSection.current.scrollIntoView({behavior : 'smooth'})
               }
             
            }, 4000);

            if(spinnerSection.current){
                spinnerSection.current.scrollIntoView({ behavior: "smooth" })
               }
          
        } catch (error) {
            console.log(error)
        }finally{
            setTimeout(() => {
                setShowSpinner(false) //remove spinner
            }, 4000);
           
        }
    }

    // verify authtentication after user's login
    const verifyAuthentication = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/users/auth', {
               withCredentials: true
            });
            if(response.status === 200){
                setIsLoggedIn(true)
                console.log({message: 'Authenticated'})
            }

        } catch (error) {
            setIsLoggedIn(false)
            console.log(error)
            console.log(`Authentication failed: ${error.message}`)
        }
    }

    useEffect(() => {
     //handleGenerate
     console.log(foodData)
      
    }, [foodData])
    
    useEffect(() => {
        // verify authentication
        verifyAuthentication()
    }, [])
  return (
    <>
    <div className="flex flex-col h-full gap-10">
    <div className="flex flex-col gap-3">
       <div className="text-center leading-tight">
         <h2 className="text-[24px] tracking-tight font-semibold font-sans md:text-[48px]">Can't decide what to eat today?</h2>
         <h2 className="text-[24px] tracking-tighter font-semibold font-sans md:text-[48px]">No Worries! I've got you covered</h2>
         <p className="mx-12 font-medium mt-2">Simply your meal decisions and explore delightful suggestios with just a click.</p>
       </div> 
       <div>
        <button onClick={handleGenerate} className={lightMode ? "bg-black text-white p-1 w-72 h-12 rounded-md shadow-xl" : "bg-[#0EA5E9] text-white p-1 w-72 h-12 rounded-md shadow-xl" }>Generate</button>
       </div>
         <div className="relative bgsvg">
            <div className="flex justify-end">
                <img src={food} className="w-[341px] h-[254px] object-cover rounded-tl-[35px] rounded-bl-[8px] md:w-[541px] md:h-[384px] lg:w-[541px] lg:h-[384px]"
                style={{boxShadow: '-10px -10px 20px rgba(60, 65, 64, 0.5)'}} alt="food"/>
            </div>
            <div className="absolute top-14 ">
                <img src={foodRecipe} className="w-[231px] h-[205px] object-cover rounded-tr-[35px] rounded-br-[8px] md:w-[521px] md:h-[343px] lg:w-[521px] lg:h-[343px]" 
                style={{boxShadow: '25px -20px 45px rgba(183, 101, 26, 0.5)' }} alt="foodRecipe"/>
            </div>
        </div>
    </div>
    {foodData.length > 0 ? 
        <div id="content" ref={currentSection}>
            <ContentSection foodData={foodData} handleRegenerate={handleGenerate} isLoggedIn={isLoggedIn}  /> 
        </div> : ( showSpinner &&
            <div id="generate" className="flex items-center justify-center mt-5" ref={spinnerSection}>
             <button type="button" className="bg-green-500 flex text-white p-1 py-2 rounded-md px-4" disabled>
                    <svg className=" animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                         <FontAwesomeIcon icon={faSpinner}/>
                    </svg>
                Generating...
             </button>
            </div>
    )}
    <div className="py-10">
        <p className="text-[24px] font-serif italic leading-tight tracking-tight md:text-[48px]">Click on the button to generate a variety of Recipes</p>
    </div>
    </div>
    </>
  )
}

export default HeroSection
