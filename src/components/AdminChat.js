import { Typography } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import { Toaster, toast } from 'react-hot-toast'
import styles from "../styles/general.module.scss"

const AdminChat = ({ activeChat }) => {
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
        <div className='w-full h-full flex justify-center flex-col  bg-[#f9fbe7]'>
            <Toaster position="top-right" reverseOrder={false}></Toaster>
            <div className='w-[80%] h-[30px] flex flex-row px-2 justify-between items-center'>
                <Typography variant="p" className="font-semibold text-xs capitalize">{activeChat.likes} likes</Typography>
                <Typography variant="p" className="font-semibold text-sm capitalize">{6} comments</Typography>
            </div>
            <div className={`${styles.adminChatContainer} w-full  flex flex-col px-3`}>
                <h4>list of chats</h4>
                <h4>list of chats</h4>

            </div>
            <form className=' h-[40px] w-[80%] flex flex-row justify-evenly items-center' onSubmit={formik.handleSubmit}>
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
    )
}

export default AdminChat