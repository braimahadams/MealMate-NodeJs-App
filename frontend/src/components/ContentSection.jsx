import React, { useEffect, useState } from 'react'
import { faHeart} from "@fortawesome/free-regular-svg-icons"
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons"
import { faHeart as FillHeart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"



const ContentSection = ({foodData, handleRegenerate, isLoggedIn}) => {
  const spinnerSectionRef = React.useRef(null); 
  const [isLiked, setIsLiked] = useState(false)
  const [favoriteMessageDisplay, setFavoriteMessageDisplay] = useState(false)
  const [loginMessageDisplay, setLoginMessageDisplay] = useState(false)
 

  const handleToggle = async() => {
    if(!isLoggedIn){
      // display message to login before adding to favorite
      setLoginMessageDisplay(true)
      setTimeout(() => {
        setLoginMessageDisplay(false)
      }, 2000);
      return;
    }

    setIsLiked(!isLiked) //toggle the like button
    // if user likes set add to favorite true
    if(!isLiked){
      await addToFavorites()
    }else{
      await removeFromFavorites()
    }
  
  }
 
   // if user likes add to database
  const addToFavorites = async () => {  
    try {
  

         const response = await axios.post("http://localhost:8000/api/foodrecipe/addtofavorites", {
          // using foodData[0] because it is an array of objects and we only want to access
          // the first item 
          title: foodData[0].title,
          recipe: foodData[0].recipe,
          instruction: foodData[0].instruction,
          image: foodData[0].image,
        
        }, {
          withCredentials: true
        })
        console.log(`foodData: ${foodData}`)
        console.log(response.data)
        if(response.status === 201){
          setFavoriteMessageDisplay(true)
          setTimeout(() => {
            setFavoriteMessageDisplay(false)
          }, 2000);
          console.log("Added to favorites")
        }    
      }  
    catch (error) {
      console.log(`Error adding to favorites: ${error}`)
    }
  }

    // if the user unlikes delete from database
  const removeFromFavorites = async () => {
    try {
  
      const response = await axios.delete(`http://localhost:8000/api/foodrecipe/removefromfavorites/${foodData[0].title}`, {
        withCredentials: true
      })
      console.log(response.data)
      if(response.status === 201){
         console.log("removed from favorites")
      }
    } catch (error) {
      console.log(`Error removing from favoirtes: ${error}`)
    }
  }

  useEffect(() => {
    setIsLiked(false)
  }, [foodData])
  
  return (
    <>
        {foodData.map((food) => (
            <div key={food.id} ref={spinnerSectionRef}>
                 <div className="flex flex-col gap-8 justify-center items-center">
                    <div><h2 className="text-2xl md:text-[48px] md:mt-8">Want to try this?</h2></div>
                    <div className="relative  rounded-bl-2xl rounded-br-2xl md:w-[484px] md:h-[418px]">
                         <div className="absolute right-0 px-4 py-2 bg-red-50 rounded-full"><button onClick={handleToggle}><FontAwesomeIcon icon={isLiked ? FillHeart: faHeart} className="w-6 h-6" style={{color: 'red'}}/></button></div>
                         <img src={food.image} className=" object-cover w-[390px] h-[268px] border-r-2 border-l-2 border-t-2 border-white bg-black rounded-tl-md rounded-tr-md md:w-[484px] md:h-[370px]" alt="food Image"/>
                        <div className="border bg-black h-9 rounded-bl-2xl rounded-br-2xl shadow-md flex items-center justify-center">
                             <p className="font-semibold text-xs text-white">{food.title}</p>
                        </div>
                        {favoriteMessageDisplay && <>
                          <div id="favorites" className="absolute top-20 mx-auto p-3 rounded-2xl  z-10 bg-black opacity-80 w-60 flex items-center justify-center left-0 right-0">
                            <div className="text-green-500">Added to favorites</div>
                          </div>
                        </>}
                        {loginMessageDisplay && <>
                          <div id="favorites" className="absolute top-20 mx-auto p-3 rounded-2xl  z-10 bg-black opacity-80 w-60 flex items-center justify-center left-0 right-0">
                            <div className="text-green-500">Please Login to add item to favorites</div>
                          </div>
                        </>}
                    </div>
                  <div className="flex flex-col gap-5 md:flex md:flex-row md:gap-20  mt-8">
                   <div className="relative ">
                   <div className="border bg-black w-[390px] h-9 rounded-tl-2xl rounded-tr-2xl shadow-md flex items-center justify-center">
                         <h4 className="text-white">Recipes</h4>
                     </div>
                     <div className="bg-white h-[321px] w-[390px] overflow-auto md:h-[478px] md:mt-0">
                         <ul className="list-disc leading-loose text-left text-black px-10 py-2 mt-1">
                             {food.recipe.map((recipeItem, index) => (
                                <li key={index}>{recipeItem.aisle}</li>
                             ))}
                         </ul>
                     </div>
                   </div>
                   <div className="relative  md:w-[680px] md:mt-8">
                   <div className="border bg-black h-9 rounded-tl-2xl rounded-tr-2xl shadow-md flex items-center justify-center">
                         <h4 className="text-white">Instructions</h4>
                     </div>
                     <div className="bg-white h-[321px] w-[390px] overflow-y-scroll md:w-[680px] md:h-[478px] md:mt-0">
                         <ul className="list-disc leading-loose text-left text-black px-10 py-2 mt-1">
                            {food.instruction.map((instructionItem, index) => (
                                <li key={index}>{instructionItem.instruction}</li>
                            ))}
                         </ul>
                     </div>
                    
                   </div>
                </div>
                   <div className="md:mt-8">
                     <button className="bg-green-500 text-white p-2 px-5 rounded-xl w-48 font-semibold" onClick={handleRegenerate}><FontAwesomeIcon icon={faArrowsRotate} className="mr-2"/> Re-generate</button>
                   </div>
                 </div>
            </div>
                   
        ))}    
    </>
    
  )
}

export default ContentSection
