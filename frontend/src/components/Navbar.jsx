import { useEffect, useRef, useState } from 'react'
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faGithub} from "@fortawesome/free-brands-svg-icons"
import {faBars, faUtensils, faMoon, faXmark, faCircle, faChevronDown, } from '@fortawesome/free-solid-svg-icons'
import logo from "../assets/logo.png"
import logoWhite from '../assets/logow.png'
import axios from "axios"
import { TbBrightnessUp } from "react-icons/tb"
import { FaBars, FaXmark, FaGithub, FaMoon } from "react-icons/fa6"
import Modal from "react-modal"


const Navbar = ({lightMode, toggleMode}) => {

  const [burgerMenu, setBurgerMenu] = useState(false) 
  const [dropdown, setDropdown] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const burgerMenuRef = useRef()
  const dropdownRef = useRef()
//  display burger menu
  const displayBurgerMenu = () => {
    setBurgerMenu(!burgerMenu)
  }

// close burger menu on links navigation
 const linkTo = () => {
  setBurgerMenu(false)
 }
// menu dropdown
 const showDropDown = () => {
  setDropdown(!dropdown)
 }
// remove dropdown
 const removeDropdrown = () => {
  setDropdown(false)
 }
//  handle logout

const handleLogout = async () => {
  try {
    const response = await axios.post('http://localhost:8000/api/users/signout', null,{
      withCredentials: true
    })
    if(response.status === 200){
      setFirstName('')
      setIsLoggedIn(false)
      window.location = '/'
    }
  } catch (error) {
     console.log(error)
  }
}

const openModal = () => {
  setIsModalOpen(!isModalOpen)
}
const closeModal =() => {
  setIsModalOpen(false)
}
// handle delete account
const deleteAccount = async () => {
  try {
    const response = await axios.delete('http://localhost:8000/api/users/deleteaccount', {
      withCredentials: true
    })
    console.log({message: 'user successfully deleted'})
    window.location = '/'
  } catch (error) {
    console.log(error)
  }
}
 useEffect(() => {
  const checkLoggedInUser = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/users/auth', {
           withCredentials: true
        });
        if(response.status === 200){
            setIsLoggedIn(true)
            setFirstName(response.data.firstName)
          
        }

    } catch (error) {
        setIsLoggedIn(false)
        console.log(error)
        console.log(`Authentication failed: ${error.message}`)
    }
}
 checkLoggedInUser();
 }, [])
 

 useEffect(() => {
    const handleClickOutside = (event) => {
      if(!burgerMenuRef.current.contains(event.target)){
        setBurgerMenu(false)
      }
      if(!dropdownRef.current.contains(event.target)){
        setDropdown(false)
      }
      
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
 }, [])
 

  return (
    <div className="flex justify-between items-center w-screen py-6 px-2 md:px-12">
       <div><Link to="/"><img src={lightMode ? logo: logoWhite} alt="logo"/></Link></div>
       {/* burger menu */}
       <div className="flex gap-5 items-center justify-center" >
        <Link to="https://github.com/Nabeel-99/FoodRecipe.git" target="_blank"><FaGithub className="w-7 h-7 md:hidden"/></Link>
        {lightMode ? <button id="moon" onClick={toggleMode} ><FaMoon className="w-7 h-7 md:hidden"/></button>: 
          <button id="sun" onClick={toggleMode}>
            <TbBrightnessUp className="w-7 h-7 md:hidden" />
            </button> }
        <button  onClick={displayBurgerMenu} className="transition duration-75 ease-in-out">
          {burgerMenu ?  <FaXmark className="w-7 h-9 md:hidden"/> : <FaBars className="w-7 h-7 md:hidden"/> }
        </button>
       </div>
        {/* burger menu dropdown*/}
        <div  ref={burgerMenuRef} className={burgerMenu ? "z-20 absolute top-20  right-5  text-black  w-72  shadow-md md:hidden" : "hidden"}>
          <div  className={"flex flex-col gap-4 rounded-md border  " + (lightMode ? 'bg-gray-300 border-black ' : 'bg-[#1E293B] text-white')}> 
            <div className={ lightMode? "flex items-center  border-b border-b-black p-2" : "flex items-center border-b p-2"}>
              <FontAwesomeIcon icon={faUtensils} className="px-2"/>
              <p>MealMate</p>
            </div>
            {isLoggedIn ? (<>
              <div className="text-left flex flex-col gap-3 ">
              <div className="flex items-center px-5 gap-1">
                <FontAwesomeIcon icon={faCircle} className="w-7 h-8"/>
                <p className="text-xl">{firstName}</p>
              </div>
              <div className={"flex flex-col items-center justify-center  text-left  rounded-md " + (lightMode ? 'bg-gray-300 text-black' : 'bg-[#1E293B] text-white')}>
                <Link to="/" onClick={linkTo} className={lightMode ? '"   border-b-gray-50   border-b border-t w-full px-5 py-3  hover:bg-slate-400  "': "   border-b-gray-50   border-b border-t w-full px-5 py-3  hover:bg-slate-400  "}>Home</Link>
                <Link to="/recipes" onClick={linkTo} className="  border-b-gray-50   border-b  w-full px-5 py-3  hover:bg-slate-400 ">Explore recipes</Link>
                <Link to="/recipeform" onClick={linkTo} className="   border-b-gray-50   border-b w-full px-5  py-3 hover:bg-slate-400 ">Post recipes</Link>
                <Link to="/myrecipes" onClick={linkTo} className="   border-b-gray-50   border-b  w-full px-5  py-3 hover:bg-slate-400 ">My recipes</Link>
                <Link to="/favorites" onClick={linkTo} className="  border-b-gray-50   border-b  w-full px-5 py-3  hover:bg-slate-400 ">Favorites</Link>
                <button className=" w-full px-5  text-red-500 text-left  py-3 hover:bg-red-200 " onClick={handleLogout}>Log out</button>
                <button onClick={() => {
                  openModal()
                  linkTo()
                }}  className=" border-b-gray-50   border-t w-full px-5 text-left  text-red-500 py-3 hover:bg-red-200">Delete Account</button>
                <Modal
                  isOpen={isModalOpen}
                  onRequestClose={closeModal}
                  contentLabel="Confirmation Modal"
                  style={{
                    overlay: {
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      zIndex: 1000,
                    },
                    content: {
                      top: '50%',
                      left: '50%',
                      right: 'auto',
                      bottom: 'auto',
                      marginRight: '-50%',
                      transform: 'translate(-50%, -50%)',
                      maxWidth: '400px',
                      padding: '20px',
                      borderRadius: '8px',
                      boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.1)',
                    },
                  }}
                >
                 <div className="flex flex-col items-center justify-center">
                 <h2>Are you sure you want to delete your account?</h2>
                  <div className="flex gap-4">
                     <button onClick={deleteAccount} className="bg-gray-50 hover:bg-gray-100 p-1 border rounded-md px-3">Yes</button>
                     <button onClick={closeModal} className="bg-gray-50 hover:bg-gray-100 p-1 border rounded-md px-3">No</button>
                  </div>
                 </div>
                </Modal>
              </div>
            </div>
          
            </>) : (
              <>
              <div className="text-left flex flex-col gap-3 p-1 py-2">
              <p className="text-2xl  px-4">Ready to get started?{}</p>
              <p className={lightMode ? '"text-md text px-4' : "text-md text px-4 text-gray-300"}>Sign in to save your favorite recipes.</p>
            </div>
            <div>
              <Link to="/signin" onClick={linkTo} ><button className={lightMode ? "bg-transparent border border-black  w-64 p-1  mb-6 rounded-md hover:bg-gray-500" :  "bg-transparent border  w-64 p-1  mb-6 rounded-md hover:bg-gray-500"}>Sign in</button></Link>
            </div>
             
              </>
            )}
            
          </div>
        </div>
        {/* menu */}
       <div className="hidden md:flex items-center gap-10">
        <div ref={dropdownRef}>
          {isLoggedIn ? (<>
            <button 
            className={lightMode ? "p-1 w-44 rounded-md bg-gray-300 text-black border border-black" : " bg-[#233147] p-1 w-44 rounded-md bg-transparent border border-gray-50" } 
            onClick={showDropDown}>{firstName} <FontAwesomeIcon icon={faChevronDown}/></button> 
            <div  className={dropdown ? "absolute z-10 top-20 right-30  text-black  w-44 rounded-md border border-gray-50": "hidden"}>
              <div className={"flex flex-col items-center justify-center  text-left  rounded-md " + (lightMode ? 'bg-gray-300 text-black' : 'bg-[#1E293B] text-white')}>
                <Link to="/" onClick={removeDropdrown} className="   border-b-gray-50   border-b w-full px-5 py-2  hover:bg-slate-400 hover:rounded-tl-md hover:rounded-tr-md ">Home</Link>
                <Link to="/recipes" onClick={removeDropdrown} className="  border-b-gray-50   border-b  w-full px-5 py-2  hover:bg-slate-400 ">Explore recipes</Link>
                <Link to="/recipeform" onClick={removeDropdrown} className="   border-b-gray-50   border-b w-full px-5  py-2 hover:bg-slate-400 ">Post recipes</Link>
                <Link to="/myrecipes" onClick={removeDropdrown} className="   border-b-gray-50   border-b  w-full px-5  py-2 hover:bg-slate-400 ">My recipes</Link>
                <Link to="/favorites" onClick={removeDropdrown} className="  border-b-gray-50   border-b  w-full px-5 py-2  hover:bg-slate-400 ">Favorites</Link>
                <button className=" w-full px-5  text-red-500 text-left  py-2 hover:bg-red-200" onClick={handleLogout}>Log out</button>
                <button onClick={openModal} className=" border-b-gray-50   border-t w-full px-5 text-left  text-red-500 py-2 hover:bg-red-200 hover:rounded-bl-md hover:rounded-br-md">Delete Account</button>
                <Modal
                  isOpen={isModalOpen}
                  onRequestClose={closeModal}
                  contentLabel="Confirmation Modal"
                  style={{
                    overlay: {
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      zIndex: 1000,
                    },
                    content: {
                      top: '50%',
                      left: '50%',
                      right: 'auto',
                      bottom: 'auto',
                      marginRight: '-50%',
                      transform: 'translate(-50%, -50%)',
                      maxWidth: '400px',
                      padding: '20px',
                      borderRadius: '8px',
                      boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.1)',
                    },
                  }}
                >
                 <div className="flex flex-col items-center justify-center">
                 <h2>Are you sure you want to delete your account?</h2>
                  <div className="flex gap-4">
                     <button onClick={deleteAccount} className="bg-gray-50 hover:bg-gray-100 p-1 border rounded-md px-3">Yes</button>
                     <button onClick={closeModal} className="bg-gray-50 hover:bg-gray-100 p-1 border rounded-md px-3">No</button>
                  </div>
                 </div>
                </Modal>
              </div> 
          </div>
          </>) : (
              <Link to="/signin" ><button className={lightMode ? "p-1 w-32 rounded-md bg-transparent border border-black" : "p-1 w-32 rounded-md bg-transparent border border-white"}>Sign in</button></Link>
          )}
        </div>
        <div className="flex  gap-3 items-center justify-center">
          {lightMode ? <button id="moon" onClick={toggleMode}><FaMoon className="w-7 h-7"/></button> :  <button id="sun" onClick={toggleMode}><TbBrightnessUp className="w-7 h-7 " /></button>  }
          <Link to="https://github.com/Nabeel-99/FoodRecipe.git" target="_blank"><FaGithub className="w-7 h-7 "/></Link>
        </div>
       </div>
    </div>
  )
}


export default Navbar
