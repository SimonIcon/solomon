import React, { useContext, useState } from 'react'
import styles from "../styles/general.module.scss"
import { useFormik } from "formik"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { storage } from "../config/firebase"
import { Toaster, toast } from "react-hot-toast"
import { adminContext } from '../contexts/AdminContext'

const AddProducts = () => {
    // handling image upload
    const [progress, setProgress] = useState(0)
    const [productImg, setProductimg] = useState('')
    const { handleAddProduct } = useContext(adminContext)


    const handleImageChange = (e) => {
        const img = e.target.files[0].name
        if (img.length !== "") {
            // creating storage ref
            const fileName = `${Date.now()}-${img}`;
            const storageRef = ref(storage, `products/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, img);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProgress(uploadProgress)
                },
                (error) => {
                    toast.error("error while ulpoading product image")
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        toast.success("image uploaded")
                        setProductimg(downloadURL)
                    });
                }
            );
        }
    };


    // formik form
    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            category: ""
        },
        validateOnChange: false,
        validateOnBlur: false,
        validate: async (values) => {
            const error = {};
            if (values.title.length === 0 || !values.title) {
                error.title = toast.error("product title required")
            } else if (values.title.length < 10) {
                error.title = toast.error("too short title")
            } else if (values.description.length === 0 || !values.description) {
                error.description = toast.error("product description required")
            } else if (values.description.length < 20) {
                error.description = toast.error("too short description")
            } else if (values.category === "" || !values.category) {
                error.category = toast.error("product category required")
            } else if (productImg.length === 0) {
                error.productImg = toast.error("product image required")
            }
            return error;
        },
        onSubmit: async (values, { resetForm }) => {
            // Assuming handleAddProduct returns a promise
            try {
                await handleAddProduct(values.title, values.description, values.category, productImg);
                toast.success("Product added successfully");
                setProductimg("")
                resetForm();
            } catch (error) {
                toast.error("An error occurred while adding the product");
            }
        }

    })

    return (
        <div className={`${styles.addproducts} w-full pt-[80px] z-30`}>
            <Toaster position='top-right' reverseOrder={false}></Toaster>
            <div className='w-full flex justify-center'>
                <div className='w-[80%] sm:w-[65%] md:w-[50%] h-full flex flex-col pt-2'>
                    <h4 className='capitalize text-center font-semibold text-sm font-Poppins'>add product</h4>
                    <form onSubmit={formik.handleSubmit}
                        className='flex flex-col justify-center items-center'>
                        <div className='w-full flex flex-row  mt-4 mb-4'>
                            <label htmlFor='file'
                                className='text-center text-sm w-full capitalize font-semibold font-Poppins'
                            >upload file</label>
                            <input type='file' onChange={handleImageChange} id="file"
                                className='hidden'
                            />
                            <p>
                                {
                                    progress > 0 && progress < 100 ? (
                                        <h6 className='font-semibold text-sm capitalize'>uploading {progress}%</h6>
                                    ) : null
                                }
                            </p>

                        </div>
                        <input type="text" id="title" value={formik.values.title}
                            onChange={formik.handleChange} placeholder='product title'
                            className='w-[80%] px-3 outline-none text-sm text-black py-3 rounded-lg mt-3 border-[1px] font-semibold'
                        />
                        <textarea type="text" id='description' placeholder='type description'
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            className='w-[80%] px-3 outline-none text-sm text-black py-3 rounded-lg mt-3 border-[1px] font-semibold'
                            rows={4}
                        > </textarea>
                        <select value={formik.values.category} id='category'
                            className='w-[80%] px-3 outline-none text-sm text-black py-3 rounded-lg mt-3 border-[1px] font-semibold'
                            onChange={formik.handleChange}
                        >
                            <option>select product category</option>
                            <option value="door" className='capitalize font-semibold text-xs py-1'>door</option>
                            <option value="window" className='capitalize font-semibold text-xs py-1'>window</option>
                            <option value="balcony" className='capitalize font-semibold text-xs py-1'>balcony</option>
                            <option value="facades" className='capitalize font-semibold text-xs py-1'>facades</option>
                            <option value="staircase" className='capitalize font-semibold text-xs py-1'>staircase</option>
                            <option value="gate" className='capitalize font-semibold text-xs py-1'>gate</option>
                            <option value="fence" className='capitalize font-semibold text-xs py-1'>fence</option>
                            <option value="signages" className='capitalize font-semibold text-xs py-1'>signages</option>
                            <option value="laserCut" className='capitalize font-semibold text-xs py-1'>laser cut panel</option>
                        </select>
                        <button type='submit'
                            className='w-[80%] px-3 outline-none text-sm bg-cyan-400 py-3 
                            rounded-lg mt-3 border-[1px] font-semibold capitalize hover:bg-cyan-700'
                        >add product</button>
                    </form>
                </div>
            </div>

        </div >
    )
}

export default AddProducts