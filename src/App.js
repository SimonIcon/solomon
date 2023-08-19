import React from 'react'
import Navbar from './components/Navbar'
import { Outlet } from "react-router-dom"
import HomeContext from './contexts/HomeContext'
import AdminContext from "./contexts/AdminContext"
import styles from "./styles/general.module.scss"
import FooterUpdate from './components/FooterUpdate'

const App = () => {
    return (
        <div className={`${styles.app}`}>
            <AdminContext>
                <HomeContext>
                    <Navbar />
                    <Outlet />
                    <FooterUpdate />
                </HomeContext>
            </AdminContext>
        </div>
    )
}

export default App