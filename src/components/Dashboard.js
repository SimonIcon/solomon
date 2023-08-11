import React from 'react'
import styles from "../styles/general.module.scss"
import { IconButton } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const Dashboard = () => {
    return (
        <div className={`${styles.dashboard} w-full`} name="dashboard">
            <div className='w-full flex flex-col h-full justify-between pt-[100px]'>
                <div className='w-full sm:px-40 h-[40%] flex  text-black'>
                    <h3 className='w-full px-2 py-2 font-semibold text-2xl tracking-wider text-center'> JNS technology solution Innovates with Quality Products and Effective Services</h3>
                </div>
                <div className="w-full h-[40%] flex flex-col sm:flex-row justify-center">
                    <div className='w-full sm:w-[45%]'>
                        <p className='font-light font-Poppins text-sm tracking-wide px-7'>
                            JNS Tech Solutions welcomes you to a realm of excellence, where effective, high-quality products redefine standards. With innovation at our core,
                            elevate businesses to new heights. Experience the future of technology-driven success with us
                        </p>
                    </div>
                    <div className='w-full sm:w-[45%] mt-5 flex flex-col justify-center items-center px-6'>
                        <form className='w-[80%] sm:w-full sm:mt-10 flex flex-col justify-center items-center'>
                            <h5 className='text-center capitalize'>contact us</h5>
                            <input type='text' placeholder='email e.g example@gmail.com'
                                className='w-full px-3 py-3 bg-white rounded-lg outline-none font-semibold text-xs lowercase'
                            />
                            <textarea type="text" placeholder='type message...'
                                className='w-full mt-3 px-3 py-3 bg-white rounded-lg outline-none font-semibold text-xs lowercase'
                            ></textarea>
                            <button type='submit'
                                className='w-full px-3 mt-3 py-3 bg-cyan-400 hover:bg-cyan-600 rounded-lg outline-none font-semibold text-xs lowercase'
                            >
                                send email
                            </button>
                        </form>
                        <div className='w-[65%] flex flex-row justify-evenly items-center py-1'>
                            <IconButton className='w-[35%] flex flex-col justify-center items-center'>
                                <FacebookIcon color="primary" fontSize="medium" />
                            </IconButton>
                            <IconButton>
                                <InstagramIcon sx={{ color: "red" }} fontSize="medium" />
                            </IconButton>
                            <IconButton>
                                <WhatsAppIcon color="success" fontSize="medium" />
                            </IconButton>

                        </div>
                    </div>
                </div>

            </div>
        </div >
    )
}

export default Dashboard