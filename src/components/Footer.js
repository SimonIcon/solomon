import React, { useRef } from 'react'
import { Typography } from '@mui/material';
import { Link } from "react-scroll"
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import emailjs from '@emailjs/browser';
import { Toaster, toast } from "react-hot-toast"
import isValidEmail from "../utils/validateEmail"
import { FacebookShareButton, WhatsappShareButton } from "react-share"



const Footer = () => {
    const form = useRef();
    const sendEmail = (e) => {
        e.preventDefault();
        // Access form values
        const formData = new FormData(form.current);
        const name = formData.get('user_name');
        const email = formData.get('user_email');
        const message = formData.get('message')
        if (name.length < 1) {
            toast.error("username required")
        } else if (email.length < 1) {
            toast.error('email required')
        } else if (!isValidEmail(email)) {
            toast.error("invalid email")
        } else if (message.length < 1) {
            toast.error("cannot send empty message")
        } else {
            emailjs.sendForm(process.env.REACT_APP_SERVICE_ID,
                process.env.REACT_APP_TEMPLATE_ID, form.current,
                process.env.REACT_APP_PUBLIC_KEY)
                .then((result) => {
                    toast.success("message sent")
                    setTimeout(() => {
                        form.current.reset();
                    }, 2000);
                }, (error) => {
                    toast.error("your encountered an error")
                });
        };
    }



    return (
        <div name="footer"
            className='w-full bg-[rgb(245,245,245)] flex flex-col z-50 absolute justify-center items-center pb-10'>
            <Toaster position='top-right' reverseOrder={false}></Toaster>
            <div className='w-full md:w-[80%] sm:w-[70%] flex flex-col md:flex-row md:justify-between pt-4'>
                <div className='w-full sm:w-full md:w-[45%] flex flex-col'>
                    <form className='w-full flex flex-col justify-center items-center'
                        ref={form} onSubmit={sendEmail}
                    >
                        <h5 className='text-center capitalize py-3'>contact us</h5>
                        <input type='text' placeholder='your name' name="user_name"
                            className='w-full px-3 py-3 mb-3 bg-white rounded-lg outline-none font-semibold text-xs lowercase'
                        />
                        <input type='email' placeholder='email e.g example@gmail.com' name="user_email"
                            className='w-full px-3 py-3 bg-white rounded-lg outline-none font-semibold text-xs lowercase'
                        />
                        <textarea type="text" placeholder='type message...' name="message"
                            className='w-full mt-3 px-3 py-3 bg-white rounded-lg outline-none font-semibold text-xs lowercase'
                        ></textarea>
                        <button type='submit'
                            className='w-full px-3 mt-3 py-3 bg-cyan-400 hover:bg-cyan-600 rounded-lg outline-none font-semibold text-xs lowercase'
                        >
                            send email
                        </button>
                    </form>
                    <div className='w-[65%] flex flex-row justify-evenly items-center py-3'>
                        <FacebookShareButton url='https://www.facebook.com/jxshashava.mwash'>
                            <FacebookIcon color="primary" fontSize="medium" />
                        </FacebookShareButton>
                        <WhatsappShareButton url="https://wa.link/bqhfxu">
                            <WhatsAppIcon color="primary" fontSize="medium" />
                        </WhatsappShareButton>

                    </div>
                </div>
                <div className='w-full sm:w-full md:w-[45%] justify-center items-center'>
                    {/* links */}
                    <div className="w-full flex flex-row justify-between md:pt-5 md:pb-3 sm:py-5">
                        <Link to="dashboard" className='capitalize font-semibold text-xs tracking-normal  hover:text-pink-500 hover:cursor-pointer'
                            spy={true} smooth={true} offset={50} duration={500}>home</Link>
                        <Link to="categories" className='capitalize font-semibold text-xs tracking-normal  hover:text-pink-500 hover:cursor-pointer'
                            spy={true} smooth={true} offset={50} duration={500}>categories</Link>
                        <Link to="services" className='capitalize font-semibold text-xs tracking-normal  hover:text-pink-500 hover:cursor-pointer'
                            spy={true} smooth={true} offset={50} duration={500}>services</Link>

                    </div>
                    {/* servces */}
                    <div className='w-full flex flex-col mt-4'>
                        <Typography variant="p"
                            className="text-center capitalize font-semibold text-sm underline">Services</Typography>
                        <div className=" w-full flex flex-row flex-wrap sm:py-3">
                            <Typography variant='p' className='text-xs px-3 py-2 font-semibold capitalize'>installation</Typography>
                            <Typography variant='p' className='text-xs px-3 py-2 font-semibold capitalize'>deliver</Typography>
                            <Typography variant='p' className='text-xs px-3 py-2 font-semibold capitalize'>consultations</Typography>
                            <Typography variant='p' className='text-xs px-3 py-2 font-semibold capitalize'>repairs</Typography>
                            <Typography variant='p' className='text-xs px-3 py-2 font-semibold capitalize'>product demonstartion</Typography>
                            <Typography variant='p' className='text-xs px-3 py-2 font-semibold capitalize'>project planning</Typography>
                            <Typography variant='p' className='text-xs px-3 py-2 font-semibold capitalize'>wholesale</Typography>
                        </div>
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