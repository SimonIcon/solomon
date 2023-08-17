import React, { useRef } from 'react'
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
            className='w-full bg-[#0a192f] text-gray-100 flex flex-col z-50 justify-center items-center pb-10'>
            <Toaster position='top-right' reverseOrder={false}></Toaster>
            <div className='w-[95%] md:w-[90%] sm:w-[70%] flex flex-col justify-center items-center md:flex-row md:justify-between pt-2'>
                <div className='w-[80%] sm:w-[80%] md:w-[45%] flex flex-col'>
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
                <div className='w-full flex sm:w-full md:w-[45%] flex-col md:flex-row'>
                    <div className="w-[90%] md:w-35%] flex flex-col pt-3 md:pt-1">
                        <Link to="categories"
                            className='capitalize py-3 md:py-1  text-center md:text-start font-semibold text-sm tracking-normal  hover:text-pink-500 hover:cursor-pointer'
                            spy={true} smooth={true} offset={50} duration={500}>categories</Link>
                        <ul className='w-full flex flex-row px-3 flex-wrap md:flex-col md:py-1'>
                            <li className='font-semibold capitalize text-xs md:py-1 px-2'>windows</li>
                            <li className='font-semibold capitalize text-xs md:py-1 px-2'>doors</li>
                            <li className='font-semibold capitalize text-xs md:py-1 px-2'>staircases</li>
                            <li className='font-semibold capitalize text-xs md:py-1 px-2'>facades</li>
                            <li className='font-semibold capitalize text-xs md:py-1 px-2'>Signages</li>
                            <li className='font-semibold capitalize text-xs md:py-1 px-2'>lacer cutter</li>
                            <li className='font-semibold capitalize text-xs md:py-1 px-2'>balconies</li>
                            <li className='font-semibold capitalize text-xs md:py-1 px-2'>fences</li>
                        </ul>
                    </div>
                    <div className='w-[90%] md:w-[65%] flex flex-col pt-3 md:pt-1 pb-5'>
                        <Link to="dashboard"
                            className='capitalize py-2 text-center md:text-start font-semibold text-sm tracking-normal  hover:text-pink-500 hover:cursor-pointer'
                            spy={true} smooth={true} offset={50} duration={500}>services</Link>
                        <ul className='w-full flex flex-row flex-wrap  text-start md:flex-col md:py-1'>
                            <li className='font-semibold capitalize text-xs md:py-1 px-2'>Sheet metal bending</li>
                            <li className='font-semibold capitalize text-xs md:py-1 px-2'>Pipe bending</li>
                            <li className='font-semibold capitalize text-xs md:py-1 px-2'>Sheet metal rolling</li>
                            <li className='font-semibold capitalize text-xs md:py-1 px-2'>Installation</li>
                            <li className='font-semibold capitalize text-xs md:py-1 px-2'>Laser cutting</li>
                            <li className='font-semibold capitalize text-xs md:py-1 px-2'>Signage</li>
                            <li className='font-semibold capitalize text-xs md:py-1 px-2'>Powder coating</li>
                            <li className='font-semibold capitalize text-xs md:py-1 px-2'>Design services</li>
                        </ul>
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