import React from 'react'
import Navbar from './components/Navbar'
import { Outlet } from "react-router-dom"
import Footer from './components/Footer'
import HomeContext from './contexts/HomeContext'
import AdminContext from "./contexts/AdminContext"
import styles from "./styles/general.module.scss"

const App = () => {
    return (
        <div className={`${styles.app}`}>
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