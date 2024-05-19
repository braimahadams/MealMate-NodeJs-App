import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faCircle, faSpinner } from "@fortawesome/free-solid-svg-icons"
import axios from "axios"

const RecipePosts = () => {
  const [allRecipes, setAllRecipes] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [displayMessage, setDisplayMessage] = useState('')
  const [spinner, setSpinner] = useState(false)

  const fetchAllRecipes = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/foodrecipe/getallrecipes`, {
        withCredentials: true
      })
      if(response.status === 201){
        setDisplayMessage(response.data.message)
      }
      setDisplayMessage('')
      setAllRecipes(response.data)
    } catch (error) {
      console.log('Error')
    }
  }

  const handleSearch = async () => {
    setSpinner(true)
    try {
      const response = await axios.get(`http://localhost:8000/api/foodrecipe/getallrecipes?searchTerm=${searchTerm}`, {
        withCredentials: true
      });
      
      if (response.status === 200) {
        if(response.data.length === 0){
          setAllRecipes([])
          setDisplayMessage('No match found')
        } else {
          setTimeout(() => {
            setDisplayMessage('')
            setAllRecipes(response.data);
          }, 3000);
        }
      } else {
        setAllRecipes([])
        setDisplayMessage(response.data.message)
      }
    } catch (error) {
      console.log('Error:', error);
    } finally {
      setTimeout(() => {
        setSpinner(false)
      }, 3000);
    }
  };


  useEffect(() => {
    fetchAllRecipes()
  }, [])

  return (
    <>
      <div className="text-3xl">Explore Recipes</div>
      <div className="flex items-center gap-2 justify-center mx-auto md:gap-5 ">
        <div className="bg-white p-1 py-2 rounded-md border border-black text-left text-black">
          <label htmlFor="search-recipe"><FontAwesomeIcon icon={faMagnifyingGlass} className="px-2"/></label>
          <input type="text" placeholder="Search saved recipe..." id="search-recipe" className="px-1 w-64 outline-none md:w-96 b"
            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="w-16 h-10 bg-white p-1 py-2 rounded-md text-black border border-black cursor-pointer md:w-36 hover:bg-blue-400 hover:text-white"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <div className="flex justify-center items-center">
        {spinner && (
          <button type="button" className="bg-indigo-500 flex justify-center items-center p-1 rounded-md text-white" disabled>
            <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
              <FontAwesomeIcon icon={faSpinner}/>
            </svg>
            Searching...
          </button>
        )}
      </div>
      <div className="flex flex-col items-center justify-center h-full">
        {allRecipes.length > 0 ? (
          <div className="flex flex-col p-3 items-center justify-center md:grid md:grid-cols-3 gap-10">
            {allRecipes.filter(recipe => recipe.user).map((recipe) => (
              <div className="flex flex-col items-center rounded-md bg-gray-300 justify-center w-96 shadow-lg md:w-auto  border" key={recipe._id}>
                <img src={`http://localhost:8000/${recipe.recipeImage}`} alt="image" className="object-contain w-80 h-64"/>
                <div className="flex flex-col gap-2 w-full p-2 bg-white items-center rounded-bl-md rounded-br-md">
                  <h3 className="mt-2 text-black">{recipe.title}</h3>
                  <Link to={`/myrecipedetails/${recipe._id}`}><button className="p-1 bg-orange-400 w-36 rounded-md hover:bg-orange-300 ">View Recipe</button></Link>
                  <div className="">
                    <Link to={`/user/${recipe.user._id}`} className="text-black flex items-center gap-2 underline hover:text-blue-500">
                      <FontAwesomeIcon icon={faCircle} className="w-9 h-9 text-gray-300"/> {recipe.user.firstName} {recipe.user.lastName}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <h3>No recipe to explore</h3>
          </div>
        )}
      </div>
    </>
  )
}

export default RecipePosts
