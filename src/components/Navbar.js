import React, { useContext, useState } from 'react'
import { Link } from "react-scroll"
import { businessLogo } from '../utils/images'
import Menu from '@mui/material/Menu';
import { useNavigate } from "react-router-dom"
import { homeContext } from '../contexts/HomeContext';

const Navbar = () => {
    const [openMenu, setOpenMenu] = useState(false)
    // closing menu
    const handleClose = () => {
        setOpenMenu(false)
    }
    // navigating
    const navigate = useNavigate()
    // auth variable
    const { setOpenAuth, activeMember, isLogged, handleLogout } = useContext(homeContext)
    return (
        <div className="fixed z-50 w-full h-[80px] justify-center bg-[#0a192f] text-gray-100">
            <div className="w-full h-full flex flex-row justify-between items-center px-2">

                {
                    activeMember.isAdmin === true && isLogged === true ? (
                        // admin functionality
                        <div className='w-[70%] sm:w-[35%] flex flex-row  justify-center items-center'>
                            <h4 onClick={() => navigate("/addProducts")}
                                className='capitalize font-semibold text-xs tracking-normal hover:text-pink-500 hover:cursor-pointer'>add products</h4>

                        </div>) : (
                        <div className='w-[70%] sm:w-[35%] flex flex-row  justify-center items-center'>
                            <img src={businessLogo} alt='logo'
                                className='w-[50px] h-[50px] object-cover justify-center rounded-full' />
                            <div className='flex flex-col pl-2 w-[70%]'>
                                <h6 className='uppercase font-semibold text-sm flex-wrap'>jns technolgy</h6>
                                <h6 className=' text-start pl-3 font-semibold capitalize text-xs'>store</h6>
                            </div>
                        </div>
                    )
                }

                <div className='w-[25%] sm:w-[55%] flex flex-row justify-between items-center'>
                    <div className=' hidden sm:flex sm:w-[60%] flex-row justify-between items-center '>
                        <h4 onClick={() => navigate('/')}
                            className='capitalize font-semibold text-sm tracking-normal hover:text-pink-500 hover:cursor-pointer'>home</h4>
                        <h4 onClick={() => navigate("/products")}
                            className='capitalize font-semibold text-sm tracking-normal hover:text-pink-500 hover:cursor-pointer'>products</h4>
                    </div>
                    <div className='hidden w-[60%] md:flex flex-row justify-evenly items-center'>
                        <Link to="categories" className='capitalize font-semibold text-sm tracking-normal  hover:text-pink-500 hover:cursor-pointer'
                            spy={true} smooth={true} offset={50} duration={500}>category</Link>
                        <Link to="services" className='capitalize font-semibold text-sm tracking-normal  hover:text-pink-500 hover:cursor-pointer'
                            spy={true} smooth={true} offset={50} duration={500}>services</Link>
                    </div>
                    <div className='w-[10%] sm:w-[20%]  hover:text-pink-500 hover:cursor-pointer'>
                        <button onClick={() => setOpenMenu(true)}
                            className="capitalize font-semibold text-sm tracking-normal md:hidden"
                        > menu</button>
                        <Menu open={openMenu} onClose={handleClose}
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            className="mt-[60px] w-[200px]"
                        >
                            <div className='w-[200px] flex flex-col justify-center items-start' >
                                <button onClick={() => {
                                    navigate('/')
                                    handleClose()
                                }}
                                    className='outline-none px-3 py-3 capitalize font-semibold hover:text-pink-400'
                                >home</button>
                                <button onClick={() => {
                                    navigate("/products")
                                    handleClose()
                                }}
                                    className='outline-none px-3 py-3 capitalize font-semibold hover:text-pink-400'
                                >products</button>
                                <Link to="services" onClick={handleClose}
                                    className='capitalize px-3 py-3  font-semibold text-sm tracking-normal  hover:text-pink-500 hover:cursor-pointer'
                                    spy={true} smooth={true} offset={50} duration={500}>services</Link>
                                {
                                    isLogged === true ? (
                                        <button onClick={() => {
                                            navigate('/')
                                            handleLogout()
                                            handleClose()
                                        }}
                                            className='outline-none px-3 py-3  capitalize font-semibold hover:text-pink-400'
                                        >logout</button>) : (
                                        <button onClick={() => {
                                            navigate('/auth')
                                            setOpenAuth(true)
                                            handleClose()
                                        }}
                                            className='outline-none px-3 py-3  capitalize font-semibold hover:text-pink-400'
                                        >login</button>)
                                }




                            </div>

                        </Menu>
                        {
                            isLogged === true ? (
                                <button onClick={() => {
                                    navigate('/')
                                    handleLogout()
                                }}
                                    className='hidden md:flex capitalize font-semibold text-sm tracking-normal'>
                                    logout</button>

                            ) : (
                                <button onClick={() => {
                                    navigate('/auth')
                                    setOpenAuth(true)
                                }}
                                    className='hidden md:flex capitalize font-semibold text-sm tracking-normal'
                                >login</button>
                            )
                        }

                    </div>


                </div>
            </div>

        </div>
    )
}

export default Navbar