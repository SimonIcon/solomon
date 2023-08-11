import { Modal, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { homeContext } from '../contexts/HomeContext'
import { Outlet, useNavigate } from 'react-router-dom'

const AuthPage = () => {
    // auth variable
    const { openAuth, setOpenAuth } = useContext(homeContext)
    // navigation
    const navigate = useNavigate()
    // closing modal
    const handleCloseModal = () => {
        navigate('/')
        setOpenAuth(false)
    }

    return (

        <Modal open={openAuth} onClose={() => handleCloseModal()}>
            <div className='w-full h-screen flex justify-center items-center'>
                <div className="w-[80%] sm:w-[65%] md:w-[50%] lg:w-[45%] h-[70%]
                 bg-white flex flex-col justify-between">
                    <div className='w-[90%] flex flex-row justify-between items-center py-3 px-4'>
                        <Typography variant='p' className="font-semibold font-Poppins text-sm">Welcome to JNS technology solution</Typography>
                        <button onClick={() => {
                            setOpenAuth(false)
                            navigate('/')
                        }}
                            className="font-semibold font-Poppins text-sm capitalize hover:text-red-400"
                        >close</button>
                    </div>
                    <Outlet />
                </div>

            </div>
        </Modal >



    )
}

export default AuthPage