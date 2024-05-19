import  { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import {  faXmark, } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"


const SignUp = () => {

  const navigate = useNavigate()
  const [formData, setFormData] = useState({
     email: '',
     firstName: '',
     lastName: '',
     password: '',
  }) //form data
  const [error, setError] = useState("") //display error message

//  handle sign up func
  const handleSignUpSubmit = async(e) => {
    e.preventDefault()
    try {
        const response = await axios.post('http://localhost:8000/api/users/signup', {
            email: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
            password: formData.password
        })
        console.log(response.data);
        console.log(response.message)
        navigate("/signin") //navigate to sign in page
    } catch (error) {
        if(error.response && error.response.status >= 400 && error.response.status < 500){
            setError(error.response.data.message)
        }
        console.log(error)
    }
  }
  return (
    <>
    <div className="flex flex-col items-center justify-center h-full">
        <div className="<"><Link to="/"><FontAwesomeIcon icon={faXmark} className="w-8 h-8 border rounded-full p-1 text-red-500 bg-white "/></Link></div>
         <form action="POST" className="bg-white text-black text-left flex flex-col gap-4 p-5 rounded-md w-full z-10  md:w-[30rem] md:mt-5" onSubmit={handleSignUpSubmit}>
            <h2 className="text-3xl font-bold">Create account</h2>
            <div className="flex flex-col">
                <label className="mb-2" htmlFor="email">Email Address</label>
                 <input className=" px-3 p-1 rounded-sm border border-black" type="email" id="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required/>
            </div>
            <div className="flex flex-col">
                <label className="mb-2" htmlFor="firstname">First Name</label>
                 <input className=" px-3 p-1 rounded-sm border border-black" type="text" id="firstname" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} required/>
            </div>
            <div className="flex flex-col">
                <label className="mb-2" htmlFor="lastname">Last Name</label>
                 <input className=" px-3 p-1 rounded-sm border border-black" type="text" id="lastname" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName:e.target.value})} required/>
            </div>
            <div className="flex flex-col">
                <label className="mb-2" htmlFor="password">Password</label>
                 <input className=" px-3 p-1 rounded-sm border border-black" type="password" id="password" value={formData.password} onChange={(e) => setFormData({...formData, password:e.target.value})} required/>
            </div>
            {error && <div className="border bg-red-500 text-white"> {error} </div>}
            <div className="flex items-center justify-center">
                <button type="submit" className="bg-green-500 text-white w-36 p-2 rounded-md border hover:border-blue-300">Sign up</button>
            </div>
            <div className="flex gap-1 items-center justify-center">
                <p>Already have an account?</p>
                <Link to="/signin" className="font-bold  border text-blue-500">Login</Link>
            </div>
        </form>
    </div>
    </>
  )
}

export default SignUp
