"use client"
 
import { useState } from "react"

import { useNavigate } from "react-router-dom"

import { motion } from "framer-motion"

import axios from "axios"
 
const ForgotPasswordPage = () => {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")

  const [newPassword, setNewPassword] = useState("")

  const [confirmPassword, setConfirmPassword] = useState("")

  const [message, setMessage] = useState("")

  const [errors, setErrors] = useState({})

  const [showPopup, setShowPopup] = useState(false)
 
  const validateForm = () => {

    const errors = {}

    if (!email.trim()) {

      errors.email = "Email is required"

    }

    if (!newPassword.trim()) {

      errors.newPassword = "New password is required"

    }

    if (newPassword !== confirmPassword) {

      errors.confirmPassword = "Passwords do not match"

    }

    setErrors(errors)

    return Object.keys(errors).length === 0

  }
 
  const handleSubmit = async (e) => {

    e.preventDefault()

    if (!validateForm()) return
 
    try {

      const response = await axios.post("http://10.192.190.148:5000/forgot-password", {

        email,

        newPassword,

      })

      setMessage(response.data.message)

      setShowPopup(true)

      setTimeout(() => {

        setShowPopup(false)

        navigate("/")

      }, 2000)

    } catch (error) {

      setMessage("Error resetting password")

    }

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

          Forgot Password
</motion.h1>

        {showPopup && (
<motion.div

            initial={{ opacity: 0, y: -20 }}

            animate={{ opacity: 1, y: 0 }}

            exit={{ opacity: 0, y: -20 }}

            className="bg-green-500 text-white p-4 rounded-lg mb-4"
>

            Password reset successful! Redirecting...
</motion.div>

        )}
<form onSubmit={handleSubmit} className="space-y-4">
<motion.input

            whileFocus={{ scale: 1.02 }}

            type="email"

            className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"

            placeholder="Enter your email here..."

            value={email}

            onChange={(e) => setEmail(e.target.value)}

            required

          />

          {errors.email && (
<motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-sm">

              {errors.email}
</motion.p>

          )}
<motion.input

            whileFocus={{ scale: 1.02 }}

            type="password"

            className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"

            placeholder="Enter your new password"

            value={newPassword}

            onChange={(e) => setNewPassword(e.target.value)}

            required

          />

          {errors.newPassword && (
<motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-sm">

              {errors.newPassword}
</motion.p>

          )}
<motion.input

            whileFocus={{ scale: 1.02 }}

            type="password"

            className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"

            placeholder="Confirm your new password"

            value={confirmPassword}

            onChange={(e) => setConfirmPassword(e.target.value)}

            required

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

            className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all"
>

            Reset Password
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
 
export default ForgotPasswordPage
 
 