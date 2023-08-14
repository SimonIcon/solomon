import { Typography } from '@mui/material'
import React from 'react'
import { useFormik } from "formik"
import styles from "../styles/general.module.scss"
import { Toaster, toast } from 'react-hot-toast'

const ProductChat = ({ activeChat, setOpenChat, browserWidth }) => {

    const formik = useFormik({
        initialValues: {
            message: ""
        },
        validateOnChange: false,
        validateOnBlur: false,
        validate: async (values) => {
            const error = {}
            if (!values.message) {
                error.message = toast.error("you cannot send empty message")
            }
            return error
        },
        onSubmit: async (values, { resetForm }) => {
            console.log(values.message)
            setTimeout(() => {
                resetForm()
            }, 1500);
        }

    })

    return (
        <div className='w-full h-full flex justify-center  bg-[#f9fbe7]'>
            <Toaster position="top-right" reverseOrder={false}></Toaster>
            <div className='w-[90%]  sm:w-[65%] md:w-[90%] h-full flex flex-col'>
                <div className='w-full h-[30px] flex flex-row px-2 justify-between items-center'>
                    <Typography variant="p" className="font-semibold text-xs capitalize">{activeChat.likes} likes</Typography>
                    <Typography variant="p" className="font-semibold text-sm capitalize">{activeChat.title}</Typography>
                    <Typography variant="p" onClick={() => setOpenChat(false)}
                        className="font-semibold text-xs capitalize hover:text-red-400 hover:cursor-pointer"
                    >close chat</Typography>

                </div>
                <div className={`${browserWidth < 770 ? styles.mobile : styles.laptop} flex flex-col`}>
                    <h4>list of chats</h4>
                    <h4>list of chats</h4>

                </div>
                <form className=' h-[50px] w-full flex flex-row justify-evenly items-center' onSubmit={formik.handleSubmit}>
                    <input type="text" placeholder='type message' id="message"
                        value={formik.values.message} onChange={formik.handleChange}
                        className='w-[80%] px-3 py-3 outline-none bg-white rounded-lg text-xs 
                        font-semibold border-[1px]'
                    />
                    <button type="submit"
                        className='w-[15%] text-center capitalize font-semibold text-xs outline-none
                        bg-cyan-400 hover:bg-cyan-600 py-3 rounded-lg'
                    >send</button>

                </form>


            </div>
        </div>
    )
}

export default ProductChat