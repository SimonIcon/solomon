import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import isValidEmail from '../utils/validateEmail'
import { Typography } from '@mui/material'
import { Toaster, toast } from 'react-hot-toast'
import { homeContext } from '../contexts/HomeContext'

const RecoverPassword = () => {
    const navigate = useNavigate()
    // getting variables
    const { handleForgotPassword, isLogged } = useContext(homeContext)

    const formik = useFormik({
        initialValues: {
            email: ""
        },
        validate: async (values) => {
            const error = {}
            if (!isValidEmail(values.email)) {
                error.email = toast.error("invalid email")
            } else if (values.email.length === "") {
                error.email = toast.error("email required")
            }
            return error
        },
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (values, { resetForm }) => {
            handleForgotPassword(values.email)
            if (isLogged === true) {
                setTimeout(() => {
                    navigate('/auth/')
                    resetForm()
                }, 1400);
            }

        }
    })


    return (
        <div className='w-full h-full flex flex-col justify-center items-center'>
            <Toaster position='top-right' reverseOrder={false}></Toaster>
            <Typography variant="p" className="text-sm font-semibold text-center"
            >Recover your password using registration email</Typography>
            <form className='w-full flex flex-col justify-center items-center' onSubmit={formik.handleSubmit}>
                <input type='text' placeholder='email' id="email"
                    className='w-[85%] outline-none py-3 mt-4 px-4 lowercase bg-gray-200 rounded-md font-semibold text-sm'
                    value={formik.values.email} onChange={formik.handleChange}
                />
                <button type='submit'
                    className='w-[85%] outline-none text-center mt-4 py-3 font-semibold hover:bg-cyan-600
                    capitalize bg-cyan-400 rounded-md'
                >
                    recover now
                </button>
                <div className='w-[80%] pt-5 flex flex-row justify-end'>
                    <Typography variant="p"
                        onClick={() => navigate("/auth/")}
                        className="capitalize font-semibold text-blue-500 text-sm hover:text-pink-400 hover:underline"
                    >login</Typography>
                </div>
            </form>


        </div>


    )
}

export default RecoverPassword