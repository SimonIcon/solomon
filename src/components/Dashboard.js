import React from 'react'
import styles from "../styles/general.module.scss"
import { Typography } from "@mui/material"


const Dashboard = () => {
    return (
        <div className={`${styles.dashboard} w-full`} name="dashboard">
            <div className='w-full flex flex-col h-full pl-[14px] sm:pl-[30px] md:pl-[50px] pt-[30px]'>
                <div className='w-[95%] sm:w-[75%] md:w-[65%]'>
                    <p className='font-semibold md:font-bold md:tracking-wider font-Rubik text-xl 
                    tracking-wide px-3 text-white'>
                        Dedicated to enhancing customer experiences, our engineering company prioritizes
                        unparalleled quality. Through innovation, collaboration, and meticulous attention to detail,
                        we create solutions that exceed expectations. We are committed to setting new industry standards
                        and consistently delivering elevated, exceptional experiences to our valued customers.
                    </p>
                </div>
                <div className="flex flex-col w-[90%] md:flex-row-reverse md:justify-between">
                    <div className='w-full  flex flex-row md:flex-row-reverse text-cyan-800'>
                        <div className='w-[90%] md:w-[40%] flex flex-col md:justify-end'>
                            <h6 className='capitalize text-center text-xl font-Poppins font-bold tracking-normal py-2'>services</h6>
                            <div className='w-full flex flex-row  flex-wrap md:flex-col'>
                                <Typography variant="p" className="capitalize font-bold px-2 py-1 text-sm">Sheet metal bending</Typography>
                                <Typography variant="p" className="capitalize px-2 py-1 font-bold text-sm">Pipe bending</Typography>
                                <Typography variant="p" className="capitalize px-2 py-1 font-bold text-sm"> Sheet metal rolling</Typography>
                                <Typography variant="p" className="capitalize px-2 py-1 font-bold text-sm">Installation</Typography>
                                <Typography variant="p" className="capitalize px-2 py-1 font-bold text-sm">Laser cutting</Typography>
                                <Typography variant="p" className="capitalize px-2 py-1 font-bold text-sm">Signage</Typography>
                                <Typography variant="p" className="capitalize px-2  py-1 font-bold text-sm">Powder coating</Typography>
                                <Typography variant="p" className="capitalize px-2 py-1 font-bold text-sm">Design services</Typography>

                            </div>
                        </div>
                    </div>
                    <div className="w-[70%] flex justify-center items-center md:w-[30%] 
                    md:flex-col md:justify-end md:items-end pt-5">
                        <button className="w-full py-3 text-center font-semibold rounded-lg
                        bg-pink-400 capitalize hover:bg-pink-700">our products</button>

                    </div>
                </div>

            </div>
        </div >
    )
}

export default Dashboard