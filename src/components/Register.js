import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from "formik"
import { Toaster, toast } from "react-hot-toast"
import isValidEmail from "../utils/validateEmail"
import { Typography } from '@mui/material'
import { homeContext } from '../contexts/HomeContext'

const Register = () => {
    // context variables
    const { RegisterUser } = useContext(homeContext)
    // navigation
    const navigate = useNavigate()
    // handling formik
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            username: "",
            phone: ""

        },
        validateOnBlur: false,
        validateOnChange: false,
        validate: async (values) => {
            const error = {}
            if (!isValidEmail(values.email)) {
                error.email = toast.error("invalid email")
            } else if (!values.username || values.username === "") {
                error.username = toast.error("username required")
            } else if (!values.password || values.password.length === "") {
                error.password = toast.error('password required')
            } else if (values.password.length < 6) {
                error.password = toast.error("weak password")
            } else if (values.phone.length === "") {
                error.phone = toast.error("phone number required")
            } else if (values.phone.length > 10 || values.phone.length < 10) {
                error.phone = toast.error('invalid phone number')
            }
            return error
        },
        onSubmit: async (values) => {
            RegisterUser(values.email, values.password, values.username, values.phone)
            setTimeout(() => {
                navigate('/auth/')
            }, 1000);


        }
    })

    return (
        <div className='w-full h-full flex flex-col justify-evenly items-center'>
            <Toaster position='top-right' reverseOrder={false}></Toaster>
            <Typography variant='h6' className="capitalize font-semibold text-sm text-center">sign up</Typography>
            <form onSubmit={formik.handleSubmit} className='w-full flex flex-col items-center'>
                <input type='text' placeholder='username' id="username"
                    className='w-[85%] outline-none py-3 mt-4 px-4 lowercase bg-gray-200 rounded-md font-semibold text-sm'
                    value={formik.values.username} onChange={formik.handleChange}
                />
                <input type='text' placeholder='phone i.e 0700 000 000' id='phone'
                    value={formik.values.phone} onChange={formik.handleChange}
                    className='w-[85%] outline-none py-3 mt-4 px-4 lowercase bg-gray-200 rounded-md font-semibold text-sm'
                />
                <input type='text' placeholder=' email' id="email"
                    className='w-[85%] outline-none py-3 mt-4 px-4 lowercase bg-gray-200 rounded-md font-semibold text-sm'
                    value={formik.values.email} onChange={formik.handleChange}
                />
                <input type='password' placeholder='password' id='password'
                    value={formik.values.password} onChange={formik.handleChange}
                    className='w-[85%] outline-none py-3 mt-4 px-4 lowercase bg-gray-200 rounded-md font-semibold text-sm'
                />
                <button type='submit'
                    className='w-[85%] outline-none text-center mt-4 py-3 font-semibold hover:bg-cyan-600
                    capitalize bg-cyan-400 rounded-md'
                >
                    register
                </button>
                <div className='w-[70%] mt-6 flex flex-row justify-between items-center'>
                    <Typography variant='p' className="tracking-tight font-light text-sm">Already have an account</Typography>
                    <Typography variant="p"
                        onClick={() => navigate("/auth/")}
                        className="capitalize font-semibold text-cyan-500 text-sm hover:text-pink-500 hover:underline"
                    >login</Typography>
                </div>
            </form>
        </div>


    )
}

export default Register