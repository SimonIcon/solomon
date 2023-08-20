import { Typography } from '@mui/material'
import React, { useRef } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { FacebookShareButton, InstapaperShareButton, LinkedinShareButton, WhatsappShareButton } from 'react-share'
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import emailjs from '@emailjs/browser';
import isValidEmail from "../utils/validateEmail"
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

const FooterUpdate = () => {
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
        <div name="footer" className="bg-[#0a192f] text-gray-100">
            <Toaster position='top-right' reverseOrder={false}></Toaster>
            <div className='w-[95%] md:w-[90%] sm:w-[95%] pb-5 flex flex-col-reverse justify-center items-center
             sm:flex-row sm:justify-between sm:items-center pt-2'>
                <div className='w-full flex flex-col justify-center items-center'>
                    <div className='w-[85%] md:w-[75%] mt-4 sm:mt-1 flex flex-col justify-center items-center'>
                        <Typography variant="h3"
                            className="text-[#f44336] uppercase tracking-wide font-Poppins font-bold"
                        >get in touch</Typography>
                        <Typography variant="h5"
                            className="text-gray-200 uppercase tracking-wide font-Poppins font-bold"
                        >stay in touch</Typography>
                    </div>
                    <div className='w-[35%] flex flex-row justify-evenly items-center py-4'>
                        <FacebookShareButton url='https://www.facebook.com/jxshashava.mwash'>
                            <FacebookIcon fontSize="medium" color="primary" />
                        </FacebookShareButton>
                        <WhatsappShareButton url='https://www.facebook.com/jxshashava.mwash'>
                            <WhatsAppIcon fontSize="medium" color="primary" />
                        </WhatsappShareButton>
                        <LinkedinShareButton url='https://www.facebook.com/jxshashava.mwash'>
                            <LinkedInIcon fontSize="medium" color="primary" />
                        </LinkedinShareButton>
                        <InstapaperShareButton url='https://www.facebook.com/jxshashava.mwash'>
                            <InstagramIcon fontSize="medium" color="primary" />
                        </InstapaperShareButton>
                    </div>
                    <div className='w-[70%] flex flex-col justify-evenly items-center py-3'>
                        <Typography variant="p"
                            className='text-[#f44336] py-2 lowercase font-semibold text-xs tracking-wide'
                        >jnsengineeringltd@gmail.com</Typography>
                        <Typography variant='p' className="text-gray-200 py-2 text-center">
                            <span className=' lowercase font-semibold text-xs tracking-wide'> 0715095679 </span> or
                            <span className=' lowercase font-semibold text-xs tracking-wide'> 0715407398</span>
                        </Typography>
                    </div>
                    <div className='w-[70%] py-2 justify-center items-center'>
                        <Typography variant="p" className='text-gray-200 font-light tracking-wide'>
                            <span className='pr-2'>We are located at</span>
                            <span className="capitalize font-semibold text-cyan-400"> syokiman pacific crest park</span>
                            <span className="capitalize pl-1">(nairobi)</span>
                        </Typography>
                    </div>
                </div>
                <form className='w-[90%] sm:w-[70%] md:w-[75%] lg:w-[60%]  flex flex-col justify-center items-center'
                    ref={form} onSubmit={sendEmail}
                >
                    <h5 className='text-center capitalize py-3'>contact us</h5>
                    <input type='text' placeholder='your name' name="user_name"
                        className='w-full lowercase bg-[#0a192f] text-gray-100 py-1 my-2 border-b-[1px]
                         border-b-white outline-none'
                    />
                    <input type='email' placeholder='email e.g example@gmail.com' name="user_email"
                        className='w-full lowercase bg-[#0a192f] text-gray-100 py-1 my-2 border-b-[1px]
                         border-b-white outline-none'
                    />
                    <input type="text" placeholder='message...' name="message"
                        className='w-full lowercase bg-[#0a192f] text-gray-100 py-1 my-2 border-b-[1px]
                         border-b-white outline-none'
                    />
                    <button type='submit'
                        className='w-full px-3 mt-3 py-3 bg-cyan-400 hover:bg-cyan-600 rounded-lg outline-none font-semibold text-xs lowercase'
                    >
                        send email
                    </button>
                </form>

            </div>


        </div>
    )
}

export default FooterUpdate