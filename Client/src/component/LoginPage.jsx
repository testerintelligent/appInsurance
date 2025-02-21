"use client"
 
import { useState } from "react"

import { useNavigate } from "react-router-dom"

import { motion } from "framer-motion"

import axios from "axios"

import { v4 as uuidv4 } from "uuid"
 
const LoginPage = () => {

  const uuid = uuidv4()

  const navigate = useNavigate()

  const [username, setUsername] = useState("")

  const [password, setPassword] = useState("")

  const [error, setError] = useState("")
 
  const handleLogin = async () => {

    if (username === "" || password === "") {

      setError("Username and password are required")

      return

    }

    try {

      const response = await axios.post(`http://10.192.190.148:5000/home`, {

        username,

        password,

      })
 
      if (response && response.status === 200) {

        const sessionKey = uuid

        sessionStorage.setItem("sessionKey", sessionKey)

        navigate("/Dashboard")

      }

    } catch (error) {

      setError("Invalid username or password")

    }

    setUsername("")

    setPassword("")

  }
 
  return (
<div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
<motion.div

        initial={{ opacity: 0, y: -50 }}

        animate={{ opacity: 1, y: 0 }}

        transition={{ duration: 0.5 }}

        className="border-2 shadow-xl bg-white rounded-xl p-10 max-w-md w-full text-center"
>
<motion.h1 initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-3xl font-bold text-gray-700 mb-6">

          Sign In
</motion.h1>
<div className="space-y-4">
<motion.input

            whileFocus={{ scale: 1.02 }}

            type="text"

            className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"

            placeholder="Email Address"

            value={username}

            onChange={(e) => setUsername(e.target.value)}

          />
<motion.input

            whileFocus={{ scale: 1.02 }}

            type="password"

            className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"

            placeholder="Password"

            value={password}

            onChange={(e) => setPassword(e.target.value)}

          />

          {error && (
<motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500">

              {error}
</motion.p>

          )}
<motion.button

            whileHover={{ scale: 1.02 }}

            whileTap={{ scale: 0.98 }}

            type="submit"

            className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all"

            onClick={handleLogin}
>

            Submit
</motion.button>
</div>
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-4">
<a href="/register" className="text-purple-700 hover:underline">

            Register new account
</a>
</motion.div>
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-2">
<a href="/forgotPassword" className="text-purple-700 hover:underline">

            Forgot password?
</a>
</motion.div>
</motion.div>
</div>

  )

}
 
export default LoginPage
 
 