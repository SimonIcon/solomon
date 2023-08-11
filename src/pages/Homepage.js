import React from 'react'
import Dashboard from '../components/Dashboard'
import Categories from '../components/Categories'
import HomeContext from '../contexts/HomeContext'
import Services from '../components/Services'

const Homepage = () => {
    return (
        <div className='w-full z-30'>
            <HomeContext>
                <Dashboard />
                <Categories />
                <Services />
            </HomeContext>
        </div>
    )
}

export default Homepage