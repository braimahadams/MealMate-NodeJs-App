import React from 'react'
import { useEffect} from "react"
import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


const UserRecipes = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [inputValue, setInputValue] = useState('')
    const [recipes, setRecipes] = useState([])
    const [username, setUsername] = useState('')

    const filteredRecipes = Array.isArray(recipes) ? recipes.filter((recipe) => {
        return recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    }) : []

    const handleSort = (e) => {
      const selectedValue = e.target.value
      if (selectedValue === 'ascending'){
        sortAscending()
      } else if (selectedValue === 'descending'){
        sortDescending()
      }
     setInputValue(selectedValue)
  
    }
    // ascending order
    const sortAscending = () => {
       // sort the items
       const sortedRecipes = [...recipes]
       sortedRecipes.sort((a,b) => {
         return a.title.localeCompare(b.title)
       })
       setRecipes(sortedRecipes);
    }
  
    // sort by descending order
    const sortDescending = () => {
      const sortedRecipes = [...recipes]
      sortedRecipes.sort((a, b) => {
        return b.title.localeCompare(a.title)
      })
      setRecipes(sortedRecipes)
    }
  
    const {id} = useParams()
    const fetchUserRecipes = async () => {
        try {
         
            const response = await axios.get(`http://localhost:8000/api/foodrecipe/getrecipesofuser/${id}`, {
              withCredentials: true
            })
            console.log(response.data)
            console.log(response.data)
            setRecipes(response.data)
            const name = response.data[0]?.user
            if(name){
               const fullName = `${name.firstName} ${name.lastName}`
               setUsername(fullName)
            }
            console.log(username)
        } catch (error) {
            console.log(error)
        }
    }
    // calculate time posted
   const calculateTimeAgo = (createdAt) => {
      const currentTime = new Date()
      const postedTime = new Date(createdAt)
      const timeDifference = currentTime - postedTime

      const seconds = Math.floor(timeDifference / 1000)
      const minutes = Math.floor(seconds / 60)
      const hours = Math.floor(minutes / 60)
      const days = Math.floor(hours / 24)

      if(days > 0){
        return `${days} day${days === 1 ? '' : 's'} ago`
      }else if(hours > 0){
        return `${hours} hour${hours === 1 ? '' : 's'} ago`
      }else if(minutes > 0){
        return `${minutes} min${minutes === 1 ? '' : 's'} ago`
      }else{
        return `${seconds} second${seconds === 1 ? '' : 's'} ago`
      }
   }

    useEffect(() => {
        fetchUserRecipes()
    }, [])
  return (
       <>
      <div><h2 className="text-xl">{username}'s Recipes</h2></div>
      <div className="flex items-center gap-2 justify-center mx-auto md:gap-5 ">
      <div className="bg-white p-1 py-2 rounded-md border border-black text-left text-black">
      <label htmlFor="search-recipe"><FontAwesomeIcon icon={faMagnifyingGlass} className="px-2"/></label>
      <input type="text" placeholder="Search saved recipe..." id="search-recipe" className="px-1 w-64 outline-none md:w-96 b"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      </div>
        <select name="Sort" className="w-16 h-10 bg-white p-1 py-2 rounded-md text-black border border-black cursor-pointer md:w-36" 
        value={inputValue} onChange={handleSort} >
          <option value="" disabled hidden>Sort</option>
          <option value="ascending">A-Z</option>
          <option value="descending">Z-A</option>
        </select>
      </div>
      <div className="flex flex-col items-center justify-center h-full">
      <div className="flex flex-col p-3 items-center justify-center md:grid md:grid-cols-3 gap-10">
      {filteredRecipes.length > 0 && filteredRecipes.map((recipe) => (
             <div className="flex flex-col shadow-2xl rounded-br-xl rounded-bl-xl bg-gray-200"  key={recipe._id}  >
                 <img src={`http://localhost:8000/${recipe.recipeImage}`} className="object-contain w-[390px] h-[268px] border-r-2 border-l-2 border-t-2 border-white rounded-tl-md rounded-tr-md bg-gray-300 " alt="food image"/>
                 <div className="p-1 ">
                    <p className="font-semibold text-xs text-black">{recipe.title} </p>
                </div>
                <div className="p-1">
                    <p className="font-semibold text-sm italic text-black">Posted {calculateTimeAgo(recipe.createdAt)}</p>
                </div>
                <div className="py-1">
                <Link to={`/myrecipedetails/${recipe._id}`}><button className="bg-orange-500 w-60 p-1 rounded-md mx-auto text-white" >View Details</button></Link>
               </div>
              </div>
            ))}
      </div>
        {filteredRecipes.length === 0 && (
             <div className="flex flex-col">
             <h3>No match found.</h3>
         </div>
        )}
        </div>
    </>
  )
}

export default UserRecipes