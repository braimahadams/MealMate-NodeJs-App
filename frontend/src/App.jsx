import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Navbar from "./components/Navbar.jsx"
import HeroSection from "./components/HeroSection.jsx"
import ContentSection from "./components/ContentSection.jsx"
import Footer from "./components/Footer.jsx"
import SignIn from "./components/SignIn.jsx"
import SignUp from "./components/SignUp.jsx"
import Favorites from "./components/Favorites.jsx"
import Details from "./components/Details.jsx"
import RecipePosts from "./components/RecipePosts.jsx"
import RecipeForm from "./components/RecipeForm.jsx"
import UserRecipes from "./components/UserRecipes.jsx"

import RecipeDetails from "./components/RecipeDetails.jsx"
import UpdateRecipeForm from "./components/UpdateRecipeForm.jsx"
import UserProfile from "./components/UserProfile.jsx"

function App() {

  const [signIn, setSignIn] = useState(false) //signin button
  const [lightMode, setLightMode] = useState(() => { 
    const savedTheme = JSON.parse(sessionStorage.getItem('theme'));
    return savedTheme ? savedTheme.lightMode : true
  }) //handle Darkmode
  const toggleMode = () => {
    setLightMode(!lightMode)
    
  }
  //getting theme from sessionStorage
  useEffect(() => {
    sessionStorage.setItem('theme', JSON.stringify({lightMode: lightMode}))
    document.body.style.backgroundColor = lightMode ? '#EDEDF0' : '#0D1734'
    document.body.style.color = lightMode ? 'black' : 'white'
    document.body.style.transition =  '.5s ease all'
   
  }, [lightMode])

//  signIn
  const toggleSignIn = () => {
    setSignIn(!signIn)
  }

  return (
    <>
    <Router>
    <div className="flex flex-col gap-5 h-full w-screen">
      <Navbar lightMode={lightMode} toggleMode={toggleMode} signIn={signIn}  toggleSignIn={toggleSignIn} />
      <Routes>
        <Route path="/" element={<HeroSection lightMode={lightMode}/>}/>
        <Route path="/" element={<ContentSection lightMode={lightMode} />} />
        <Route path="/signup" element={ <SignUp />}/>
        <Route path="/signin" element={<SignIn />}/>
        <Route path="/recipes" element={<RecipePosts />}/>
        <Route path="/user/:id" element={<UserRecipes />}/>
        <Route path="/myrecipedetails/:id" element={<RecipeDetails />}/>
        <Route path="/updaterecipe/:id" element={<UpdateRecipeForm />}/>
        <Route path="/myrecipes" element={<UserProfile />}/>
        <Route path="/recipeform" element={<RecipeForm  lightMode={lightMode}/>}/>
        <Route path="/favorites" element={<Favorites/>}/>
        <Route path="/details/:id" element={<Details/>} />
      </Routes>
      <Footer lightMode={lightMode}/>
      </div>
    </Router>
   
    </>
  )
}

export default App
