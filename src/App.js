import React from 'react'
import Navbar from './components/Navbar'
import { Outlet } from "react-router-dom"
import Footer from './components/Footer'
import HomeContext from './contexts/HomeContext'
import AdminContext from "./contexts/AdminContext"

const App = () => {
    return (
        <div className='bg-[#fafafa] w-full min-h-screen'>
            <AdminContext>
                <HomeContext>
                    <Navbar />
                    <Outlet />
                    <Footer />
                </HomeContext>
            </AdminContext>
        </div>
    )
}

export default App