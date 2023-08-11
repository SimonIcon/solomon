import React from 'react'
import { Typography } from '@mui/material';
import { Link } from "react-scroll"

const Footer = () => {
    return (
        <div className='w-full bg-[rgb(245,245,245)] flex flex-col justify-center items-center'>
            <div className='w-full flex flex-col justify-center items-center  pt-4'>
                {/* links */}
                <div className="w-[80%] sm:w-[70%] md:w-[60%] flex flex-row justify-evenly items-center">
                    <Link to="dashboard" className='capitalize font-semibold text-sm tracking-normal  hover:text-pink-500 hover:cursor-pointer'
                        spy={true} smooth={true} offset={50} duration={500}>home</Link>
                    <Link to="categories" className='capitalize font-semibold text-sm tracking-normal  hover:text-pink-500 hover:cursor-pointer'
                        spy={true} smooth={true} offset={50} duration={500}>categories</Link>
                    <Link to="services" className='capitalize font-semibold text-sm tracking-normal  hover:text-pink-500 hover:cursor-pointer'
                        spy={true} smooth={true} offset={50} duration={500}>services</Link>

                </div>
                {/* servces */}
                <div className=' w-full flex justify-center items-center'>
                    <div className=" w-[80%] flex flex-row flex-wrap">
                        <Typography variant='p' className='text-xs px-1 py-1 font-semibold capitalize'>installation</Typography>
                        <Typography variant='p' className='text-xs px-1 py-1 font-semibold capitalize'>deliver</Typography>
                        <Typography variant='p' className='text-xs px-1 py-1 font-semibold capitalize'>consultations</Typography>
                        <Typography variant='p' className='text-xs px-1 py-1 font-semibold capitalize'>repairs</Typography>
                        <Typography variant='p' className='text-xs px-1 py-1 font-semibold capitalize'>product demonstartion</Typography>
                        <Typography variant='p' className='text-xs px-1 py-1 font-semibold capitalize'>project planning</Typography>
                        <Typography variant='p' className='text-xs px-1 py-1 font-semibold capitalize'>wholesale</Typography>
                    </div>
                </div>

            </div>

            <div className='w-full flex flex-row justify-evenly items-center'>
                <h2 className='uppercase font-semibold tracking-wide text-sm'>jns engineering technology</h2>
                <div>location</div>
            </div>

        </div>


    )
}

export default Footer