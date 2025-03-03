"use client"
 
import { useState } from "react"

import { NavLink, useNavigate } from "react-router-dom"

import { motion, AnimatePresence } from "framer-motion"

import { HiMenuAlt3, HiX } from "react-icons/hi"

import { RiDashboardLine, RiFileListLine, RiCustomerService2Line, RiAdminLine, RiLogoutBoxLine,  RiBillLine } from "react-icons/ri"
 
const menuItems = [

  { path: "/dashboard", name: "Dashboard", icon: RiDashboardLine },

  { path: "/insurance", name: "New Insurance", icon: RiFileListLine },

  { path: "/contact", name: "Contact", icon: RiCustomerService2Line },

  { path: "/adminPanel", name: "Admin Panel", icon: RiAdminLine },

  { path: "/billing", name: "Billing Information", icon: RiBillLine }

]
 
const Sidebar = () => {

  const [isOpen, setIsOpen] = useState(true)

  const navigate = useNavigate()
 
  const handleLogout = () => {

    sessionStorage.removeItem("sessionKey")

    navigate("/")

  }
 
  const toggleSidebar = () => setIsOpen(!isOpen)
 
  return (
<>

      {/* Mobile Menu Button */}
<button className="fixed top-4 left-4 z-50 p-2 rounded-md lg:hidden bg-white shadow-lg" onClick={toggleSidebar}>

        {isOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
</button>
 
      {/* Backdrop for mobile */}
<AnimatePresence>

        {isOpen && (
<motion.div

            initial={{ opacity: 0 }}

            animate={{ opacity: 0.5 }}

            exit={{ opacity: 0 }}

            className="fixed inset-0 bg-black lg:hidden z-30"

            onClick={toggleSidebar}

          />

        )}
</AnimatePresence>
 
      {/* Sidebar */}
<motion.div

        initial={{ x: -100 }}

        animate={{ x: isOpen ? 0 : -100 }}

        transition={{ duration: 0.3, type: "spring", stiffness: 200 }}

        className={`h-screen text-white fixed top-0 left-0 w-64 bg-opacity-90 bg-gray-900 shadow-lg flex flex-col z-40

          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
>
<motion.div

          initial={{ opacity: 0 }}

          animate={{ opacity: 1 }}

          className="px-4 py-6 flex items-center justify-center border-b border-gray-700"
>
<NavLink to="/">
<motion.p className="text-lg font-bold text-white" whileHover={{ scale: 1.05 }}>

              ExpleoSurance
</motion.p>
</NavLink>
</motion.div>
 
        <motion.ul

          className="flex-1 overflow-y-auto mt-4 space-y-2"

          initial={{ opacity: 0 }}

          animate={{ opacity: 1 }}

          transition={{ delay: 0.2 }}
>

          {menuItems.map((item, index) => (
<motion.li

              key={item.path}

              initial={{ x: -20, opacity: 0 }}

              animate={{ x: 0, opacity: 1 }}

              transition={{ delay: index * 0.1 }}
>
<NavLink

                to={item.path}

                className={({ isActive }) =>

                  isActive

                    ? "flex items-center py-3 px-4 bg-purple-600 text-white rounded-lg transition-all duration-300 ease-in-out"

                    : "flex items-center py-3 px-4 hover:bg-purple-500 rounded-lg text-white transition-all duration-300 ease-in-out"

                }
>
<item.icon className="w-5 h-5 mr-3" />
<span>{item.name}</span>
</NavLink>
</motion.li>

          ))}
</motion.ul>
 
        <motion.div

          className="px-4 py-3 border-t border-gray-700"

          initial={{ opacity: 0 }}

          animate={{ opacity: 1 }}

          transition={{ delay: 0.4 }}
>
<motion.button

            className="w-full py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg flex items-center justify-center transition-all duration-300 ease-in-out"

            onClick={handleLogout}

            whileHover={{ scale: 1.02 }}

            whileTap={{ scale: 0.98 }}
>
<RiLogoutBoxLine className="w-5 h-5 mr-2" />
<span>Logout</span>
</motion.button>
</motion.div>
</motion.div>
</>

  )

}
 
export default Sidebar
 
 