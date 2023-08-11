import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from "formik"
import { Toaster, toast } from "react-hot-toast"
import isValidEmail from "../utils/validateEmail"
import { Typography } from "@mui/material"
import { homeContext } from '../contexts/HomeContext'



const Login = () => {
    // getting variables
    const { handleSignIn, isLogged, activeMember } = useContext(homeContext)
    // handling formik
    const navigate = useNavigate()
    // formik form
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validateOnBlur: false,
        validateOnChange: false,
        validate: async (values) => {
            const error = {}
            if (!isValidEmail(values.email)) {
                error.email = toast.error("invalid email")
            } else if (!values.password || values.password.length === "") {
                error.password = toast.error('password required')
            } else if (values.password.length < 6) {
                error.password = toast.error("weak password")
            }
            return error
        },
        onSubmit: async (values) => {
            handleSignIn(values.email, values.password)
            if (isLogged === true) {
                toast.success(`welcome ${activeMember.name}`)
                setTimeout(() => {
                    navigate('/')
                }, 1500);
            }
        }
    })

    return (
        <div className='w-full h-full flex flex-col justify-evenly items-center'>
            <Toaster position='top-right' reverseOrder={false}></Toaster>
            <Typography variant='h6' className="capitalize font-semibold text-sm text-center">sign in</Typography>
            <form className='w-full flex flex-col justify-center items-center' onSubmit={formik.handleSubmit}>
                <input type='text' placeholder='your email' id="email"
                    className='w-[85%] outline-none py-3 mt-4 px-4 lowercase bg-gray-200 rounded-md font-semibold text-sm'
                    value={formik.values.email} onChange={formik.handleChange}
                />
                <input type='password' placeholder='password' id='password'
                    value={formik.values.password} onChange={formik.handleChange}
                    className='w-[85%] outline-none py-3 mt-4 px-4 lowercase bg-gray-200 rounded-md font-semibold text-sm'
                />
                <div className='w-[85%] mt-4 flex  flex-row justify-end items-center font-semibold text-xs'>
                    <Typography variant="p"
                        className="text-xs font-semibold text-gray-600">
                        Forgot password</Typography>
                    <Typography variant="p" onClick={() => navigate("/auth/recover")}
                        className="capitalize px-3 text-cyan-400 text-xs font-light hover:underline hover:text-pink-500"
                    >recover</Typography>
                </div>
                <button type='submit'
                    className='w-[85%] outline-none text-center mt-4 py-3 font-semibold hover:bg-cyan-600
                    capitalize bg-cyan-400 rounded-md'
                >
                    login
                </button>
                <div className='w-[85%] mt-6 flex flex-row justify-evenly items-center'>
                    <Typography variant='p'
                        className="tracking-tight text-xs font-semibold text-gray-600">
                        Dont`t have an account</Typography>
                    <Typography variant="p" onClick={() => navigate("/auth/register")}
                        className="capitalize font-light text-cyan-500 text-sm hover:text-pink-500 hover:underline"
                    >register</Typography>
                </div>
            </form>

        </div>

    )
}

export default Login