import { useEffect, useState } from "react";
import { User, Mail, Lock, UserPlus } from "lucide-react";
import AnimatedBorder from "../component/BorderAnimat.jsx";
import Input from "../component/Input.jsx";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {toast} from 'react-hot-toast'

import  userStore  from "../store/User.store.js";




 export default function Signup() {
  const navigate=useNavigate()
  const {isSignIn,loading,signIn,user}=userStore()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
const handleSubmit= async(e)=>{
  const {name,email,password}=formData
  e.preventDefault()
  await signIn({name,email,password})
  setFormData({
    name:"",
    email:"",
    password:""
  })
   const user = userStore.getState().user;
   setTimeout(()=>{
     if(user){
      navigate('/login')
     }
   },2000)
}
 
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#0b1220]">
      <div className="w-full max-w-md">
        {/* TITLE */}
        <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <h2 className="mb-8 text-center text-3xl font-bold text-cyan-400">
          Create Account
        </h2>

        <AnimatedBorder>
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* NAME */}
            <Input
             autoComplete="false"
            placeholder="Enter your full name"
              icon={<User />}
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />

            {/* EMAIL */}
            <Input
             autoComplete="false"
              placeholder="Enter your Email"
              icon={<Mail />}
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />

            {/* PASSWORD */}
            <Input
             autoComplete="false"
              icon={<Lock />}
              placeholder="Enter your Password"
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />

            {/* BUTTON */}
            <button
              disabled={isSignIn}
              type="submit"
              className="
                w-full flex items-center justify-center gap-2
                rounded-lg bg-cyan-600/10 border border-cyan-500/30
                py-2.5 text-cyan-300 font-medium
                hover:bg-cyan-500/20 transition
              "
            >
              
             {isSignIn ?   <svg
      className="animate-spin h-5 w-5 text-cyan-300"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 000 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
      />
    </svg>  : <><UserPlus className="h-5 w-5"/>Sign Up</>} 
              
            </button>

          </form>
        </AnimatedBorder>
         {/* LOGIN LINK */}
        <p className="mt-4 text-center text-sm text-cyan-400/80">
          Already have Acount?
          <span
            onClick={() => navigate("/login")}
            className="text-cyan-400 font-semibold cursor-pointer hover:underline"
          >
            Log In
          </span>
        </p>
        </motion.div>
      </div>
    </div>
  );
}
