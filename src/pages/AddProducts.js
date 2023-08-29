import React, { useState } from 'react'
import { useFormik } from "formik"
import { storage, db } from "../config/firebase"
import { Toaster, toast } from "react-hot-toast"
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const AddProducts = () => {
    // handling image upload
    const [progress, setProgress] = useState(0)
    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };


    // formik form
    const formik = useFormik({
        initialValues: {
            title: "",
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
            } else if (values.category === "" || !values.category) {
                error.category = toast.error("product category required")
            } else if (image === null) {
                error.image = toast.error("product image required")
            }
            return error;
        },
        onSubmit: async (values, { resetForm }) => {
            //uploadation of image in storage
            const filename = `${Date.now()}-${image.name}`
            const storageRef = ref(storage, `products/${filename}`);
            const uploadTask = uploadBytesResumable(storageRef, image);
            uploadTask.on('state_changed', (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(progress)
            },
                (error) => {
                    toast.error("error while uploading image")
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        const timestamp = serverTimestamp()
                        const productRef = collection(db, "products")
                        addDoc(productRef, {
                            uploadedOn: timestamp,
                            title: values.title,
                            category: values.category,
                            productImage: downloadURL,
                            likes: 0,
                            dislikes: 0
                        }).then(() => {
                            toast.success("product added successfully")
                            setTimeout(() => {
                                setProgress(0)
                                resetForm()
                            }, 1500);
                        }).catch(() => {
                            toast.error("error while adding product")
                            resetForm()
                            setImage(null)
                        })

                    });
                }
            );
        }

    })

    return (
        <div className={` w-full h-[100vh] pt-[80px] z-30`}>
            <Toaster position='top-right' reverseOrder={false}></Toaster>
            <div className='w-full h-full flex flex-col justify-center items-center'>
                <div className='w-[80%] sm:w-[65%] md:w-[50%] h-full flex flex-col pt-2'>
                    <h4 className='capitalize text-center font-semibold text-sm font-Poppins'>add product</h4>
                    <form onSubmit={formik.handleSubmit}
                        className='flex flex-col justify-center items-center'>
                        <div className='w-full flex flex-col justify-center items-center  mt-4 mb-4'>
                            <label htmlFor='file'
                                className='text-center text-sm w-full capitalize font-semibold font-Poppins'
                            >upload file</label>
                            <input type='file' onChange={handleChange} id="file"
                                className='hidden'
                            />
                            <p>
                                {
                                    progress > 1 && progress < 100 ? (
                                        <h6
                                            className='font-semibold text-sm capitalize'>uploading {progress}%</h6>
                                    ) : (
                                        <>
                                            {
                                                progress === 100 || progress > 100 ? (
                                                    <h6 className="text-green-400 capitalize font-semibold">uploaded</h6>
                                                ) : null
                                            }
                                        </>
                                    )
                                }
                            </p>

                        </div>
                        <input type="text" id="title" value={formik.values.title}
                            onChange={formik.handleChange} placeholder='product title'
                            className='w-[80%] px-3 outline-none text-sm text-black py-3 rounded-lg mt-3 border-[1px] font-semibold'
                        />

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