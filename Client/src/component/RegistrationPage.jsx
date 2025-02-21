"use client"
 
import { useState } from "react"

import { useNavigate } from "react-router-dom"

import { motion } from "framer-motion"

import axios from "axios"
 
const RegistrationPage = () => {

  const navigate = useNavigate()

  const [message, setMessage] = useState("")

  const [formData, setFormData] = useState({

    email: "",

    password: "",

    confirmPassword: "",

  })

  const [errors, setErrors] = useState({})

  const [submitted, setSubmitted] = useState(false)

  const [showPopup, setShowPopup] = useState(false)
 
  const handleChange = (e) => {

    const { name, value } = e.target

    setFormData({

      ...formData,

      [name]: value,

    })

  }
 
  const validateForm = () => {

    const errors = {}

    if (!formData.email.trim()) {

      errors.email = "Email is required"

    }

    if (!formData.password.trim()) {

      errors.password = "Password is required"

    }

    if (formData.password !== formData.confirmPassword) {

      errors.confirmPassword = "Passwords do not match"

    }

    setErrors(errors)

    return Object.keys(errors).length === 0

  }
 
  const handleSubmit = (event) => {

    event.preventDefault()

    if (!validateForm()) return
 
    axios

      .post("http://10.192.190.148:5000/register", formData)

      .then((response) => {

        setMessage(response.data.message)

        setSubmitted(true)

        setShowPopup(true)

        setTimeout(() => {

          setShowPopup(false)

          navigate("/")

        }, 2000)

      })

      .catch((error) => {

        setMessage(error.response ? error.response.data.message : "An error occurred")

      })

  }
 
  return (
<div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
<motion.div

        initial={{ opacity: 0, y: -50 }}

        animate={{ opacity: 1, y: 0 }}

        transition={{ duration: 0.5 }}

        className="border-2 shadow-xl bg-white rounded-xl p-10 max-w-md w-full text-center"
>
<motion.h1 initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-3xl font-bold text-gray-700 mb-6">

          Create an Account
</motion.h1>

        {submitted && showPopup && (
<motion.div

            initial={{ opacity: 0, y: -20 }}

            animate={{ opacity: 1, y: 0 }}

            exit={{ opacity: 0, y: -20 }}

            className="bg-green-500 text-white p-4 rounded-lg mb-4"
>

            Registration successful! Redirecting...
</motion.div>

        )}
<form onSubmit={handleSubmit} className="space-y-4">
<motion.input

            whileFocus={{ scale: 1.02 }}

            type="email"

            name="email"

            className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-700"

            placeholder="Email Address"

            value={formData.email}

            onChange={handleChange}

          />

          {errors.email && (
<motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-sm">

              {errors.email}
</motion.p>

          )}
<motion.input

            whileFocus={{ scale: 1.02 }}

            type="password"

            name="password"

            className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-700"

            placeholder="Password"

            value={formData.password}

            onChange={handleChange}

          />

          {errors.password && (
<motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-sm">

              {errors.password}
</motion.p>

          )}
<motion.input

            whileFocus={{ scale: 1.02 }}

            type="password"

            name="confirmPassword"

            className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-700"

            placeholder="Confirm Password"

            value={formData.confirmPassword}

            onChange={handleChange}

          />

          {errors.confirmPassword && (
<motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-sm">

              {errors.confirmPassword}
</motion.p>

          )}
<motion.button

            whileHover={{ scale: 1.02 }}

            whileTap={{ scale: 0.98 }}

            type="submit"

            className="w-full py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-all"
>

            Register
</motion.button>
</form>

        {message && (
<motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-red-500">

            {message}
</motion.p>

        )}
</motion.div>
</div>

  )

}
 
export default RegistrationPage
 
 