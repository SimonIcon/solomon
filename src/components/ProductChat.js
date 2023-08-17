import { Typography } from '@mui/material'
import React, { useContext } from 'react'
import { useFormik } from "formik"
import styles from "../styles/general.module.scss"
import { Toaster, toast } from 'react-hot-toast'
import { homeContext } from '../contexts/HomeContext'
import { adminContext } from '../contexts/AdminContext'
import ScrollToBottom from 'react-scroll-to-bottom';

const ProductChat = ({ setOpenChat, browserWidth, activeChat }) => {
    const { isLogged, activeMember } = useContext(homeContext)
    const { sendMessage } = useContext(adminContext)


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
            if (isLogged === false) {
                toast.error("login to drop your comment")
            } else {
                sendMessage(values.message, activeMember.name, activeMember.id, activeChat.id)
                setTimeout(() => {
                    resetForm()
                }, 1500);
            }

        }

    })


    return (
        <div className='w-full h-full flex justify-center  bg-[#f9fbe7]'>
            <Toaster position="top-right" reverseOrder={false}></Toaster>
            <div className='w-[90%]  sm:w-[65%] md:w-[90%] h-full flex flex-col'>
                <div className='w-full h-[30px] flex flex-row px-2 justify-between items-center'>
                    <Typography variant="p" className="font-semibold text-sm capitalize">{activeChat.title}</Typography>
                    <Typography variant="p" onClick={() => setOpenChat(false)}
                        className="font-semibold text-xs capitalize hover:text-red-400 hover:cursor-pointer"
                    >close chat</Typography>

                </div>
                <ScrollToBottom className={`${browserWidth < 770 ? styles.mobile : styles.laptop} flex flex-col`}>
                    {
                        activeChat.chats === undefined ? (
                            <>
                                <div className='flex justify-center items-center'>
                                    <h5>no active chats</h5>
                                </div>
                            </>
                        ) : (
                            <>
                                {
                                    activeChat.chats.map((chat) => (
                                        <div key={chat.id}>
                                            {
                                                chat.sender === activeMember.id ? (
                                                    <div className='w-full mt-1 flex flex-row justify-end'>
                                                        <div className="w-[50%] pt-2 px-2 bg-green-200 mr-2 py-1 rounded-lg">
                                                            {/* <p className="w-full flex justify-end text-xs font-extralight py-1"> {chat.createdAt.toDate().toDateString()}</p> */}
                                                            <p className="font-light text-sm py-1">{chat.message}</p>
                                                            <div className='w-[80%] flex flex-row justify-between mt-2 items-center'>
                                                                <p className="text-xs font-extralight capitalize">{chat.senderName}</p>
                                                                <p className="text-xs font-extralight text-black">
                                                                    {/* {chat.createdAt.toDate().getHours() + ":" + chat.createdAt.toDate().getMinutes()} */}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="w-full mt-1 flex flex-row justify start">
                                                        <div className="w-[50%] pt-2 px-2 bg-cyan-50 py-1 mr-2 rounded-lg">
                                                            {/* <p className="w-full flex justify-end text-xs font-extralight py-1"> {chat.createdAt.toDate().toDateString()}</p> */}
                                                            <p className="font-light text-sm">{chat.message}</p>
                                                            <div className='w-full flex flex-row justify-between mt-2 items-center'>
                                                                <p className="text-xs font-extralight capitalize">{chat.senderName}</p>
                                                                <p className="text-xs font-extralight text-black">
                                                                    {/* {chat.createdAt.toDate().getHours() + ":" + chat.createdAt.toDate().getMinutes()} */}
                                                                </p>
                                                            </div>
                                                        </div>

                                                    </div>
                                                )
                                            }
                                        </div>
                                    ))
                                }
                            </>
                        )

                    }

                </ScrollToBottom>

                <form className=' h-[50px] w-full mt-5 pb-3 flex flex-row justify-evenly items-center'
                    onSubmit={formik.handleSubmit}>
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