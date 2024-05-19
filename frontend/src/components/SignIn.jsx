import  { useEffect, useState } from 'react'
import { Link, useNavigate} from "react-router-dom"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"



const SignIn = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
     email: '',
     password: ''
  })
  const [error, setError] = useState("")//display error message

  // handle Login func
 const handleLoginSubmit = async(e) => {
  e.preventDefault()
  try {
    const response = await axios.post("http://localhost:8000/api/users/signin", {
      email: formData.email,
      password: formData.password
    }, {withCredentials: true})

    console.log(response.data)
    window.location = "/"
  } catch (error) {
      if(error.response && error.response.status >= 400 && error.response.status < 500){
        setError(error.response.data.message)
      }
  }
 }

 useEffect(() => {
  // check if user already logged in go to the home page
   const checkLoggedInUser = async () => {
     try {
        const response = await axios.get("http://localhost:8000/api/users/auth", {
          withCredentials: true
        })
        if(response.status === 200){
          window.location = '/'
          console.log('alread logged in')
          console.log(response.data)
        }else{
           navigate('/signin')
        }
     } catch (error) {
        console.log(error)
     }
   }
   checkLoggedInUser()
 }, [])
  return (
    <>
    <div className="flex flex-col items-center justify-center h-full">
        <div className=""><Link to="/"><FontAwesomeIcon icon={faXmark} className="w-8 h-8 border rounded-full p-1 text-red-500 bg-white "/></Link></div>
          <form action="POST" className="bg-white text-black text-left flex flex-col gap-4 p-5 rounded-md w-full md:w-[30rem]" onSubmit={handleLoginSubmit}>
            <h2 className="text-3xl font-bold">Sign in</h2>
            <div className="flex flex-col">
                <label className="mb-2" htmlFor="email">Email Address</label>
                 <input 
                    className=" px-3 p-1 rounded-sm border border-black" 
                    type="email" 
                    id="email"
                     value={formData.email} 
                     onChange={(e) => setFormData({...formData, email: e.target.value})} 
                     required/>
            </div>
           
            <div className="flex flex-col">
                <label className="mb-2" htmlFor="password">Password</label>
                 <input 
                    className=" px-3 p-1 rounded-sm border border-black" 
                    type="password" 
                    id="password"  
                    value={formData.password} 
                    onChange={(e) => setFormData({...formData, password:e.target.value})} 
                    required/>
            </div>
            {error && <div className="border bg-red-500 text-white">{error}</div>}
            <div className="flex items-center justify-center">
                <button className="bg-green-500 text-white w-36 p-2 rounded-md border hover:border-blue-300">Login</button>
            </div>
            <div className="flex items-center justify-center">
                <p> Don't have an account?</p>
                <Link to="/signup" className="font-bold  border text-blue-500">Sign up</Link>
        </div>
        </form>
    </div>
    </>
  )
}

export default SignIn
