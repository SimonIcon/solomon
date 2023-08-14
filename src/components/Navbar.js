import React, { useContext, useState } from 'react'
import { Link } from "react-scroll"
import Menu from '@mui/material/Menu';
import { useNavigate } from "react-router-dom"
import { homeContext } from '../contexts/HomeContext';
import { Typography } from '@mui/material';

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
            <div className="w-full h-full flex flex-row justify-between items-center">
                {/* left side */}
                {
                    activeMember.isAdmin === true && isLogged === true ? (
                        // admin dashboard
                        <div className='w-[40%] sm:w-[35%] flex flex-row  justify-evenly items-center'>
                            <h4 onClick={() => navigate("/productInfo")}
                                className='capitalize font-semibold text-xs tracking-normal
                                 hover:text-pink-500 hover:cursor-pointer'>product managment</h4>
                            <h4 onClick={() => navigate("/addProducts")}
                                className='capitalize font-semibold text-xs tracking-normal
                                 hover:text-pink-500 hover:cursor-pointer'>add products</h4>

                        </div>) : (
                        // client dashboard
                        <div className='w-[70%] sm:w-[45%] md:w-[35%] flex flex-col justify-center items-center'>
                            <Typography variant='h6'
                                className=" w-[80%] text-center font-semibold text-xs uppercase tracking-tighter"
                            >JNS technology</Typography>
                            <Typography varint="p"
                                className="w-[40%] font-extralight text-xs text-center tracking-tighter"
                            > solution</Typography>
                        </div>


                    )
                }

                <div className='w-[25%] sm:w-[55%] md:w-[70%] flex flex-row justify-between items-center'>
                    <div className=' hidden sm:flex sm:w-[60%] md:w-[30%] flex-row justify-between items-center '>
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
                        <Link to="footer" className='capitalize font-semibold text-sm tracking-normal  hover:text-pink-500 hover:cursor-pointer'
                            spy={true} smooth={true} offset={50} duration={500}>contacts</Link>
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
                                    className='outline-none px-3 py-3 sm:hidden capitalize font-semibold hover:text-pink-400'
                                >home</button>
                                <button onClick={() => {
                                    navigate("/products")
                                    handleClose()
                                }}
                                    className='outline-none sm:hidden px-3 py-3 capitalize font-semibold hover:text-pink-400'
                                >products</button>

                                <Link to="categories" onClick={handleClose}
                                    className='capitalize px-3 py-3  font-semibold text-sm tracking-normal  hover:text-pink-500 hover:cursor-pointer'
                                    spy={true} smooth={true} offset={50} duration={500}>categories</Link>
                                <Link to="services" onClick={handleClose}
                                    className='capitalize px-3 py-3  font-semibold text-sm tracking-normal  hover:text-pink-500 hover:cursor-pointer'
                                    spy={true} smooth={true} offset={50} duration={500}>services</Link>
                                <Link to="footer" onClick={handleClose}
                                    className='capitalize px-3 py-3  font-semibold text-sm tracking-normal  hover:text-pink-500 hover:cursor-pointer'
                                    spy={true} smooth={true} offset={50} duration={500}>contact us</Link>
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