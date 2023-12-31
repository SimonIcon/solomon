import React, { useContext, useEffect, useState } from 'react'
import { adminContext } from '../contexts/AdminContext'
import { Toaster, toast } from 'react-hot-toast'
import { Drawer, Paper, Typography } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ProductChat from '../components/ProductChat';
import { homeContext } from '../contexts/HomeContext';
import emailjs from '@emailjs/browser';

const ProductsPage = () => {
    const { products, filteredProducts, HandleLike, handleDislikes, category } = useContext(adminContext)
    const { isLogged, activeMember } = useContext(homeContext)
    // get the width of the browser
    const [browserWidth, setBrowserWidth] = useState(window.innerWidth);
    useEffect(() => {
        const updateWidth = () => {
            setBrowserWidth(window.innerWidth);
        };
        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => {
            window.removeEventListener('resize', updateWidth);
        };
    }, []);
    // handling chat drawer
    const [openChat, setOpenChat] = useState(false)
    const [activeChat, setActiveChat] = useState([])
    // handling place order
    const handlePlaceOrder = (title) => {
        if (isLogged === false) {
            toast.error("login to place order")
        } else {
            const formData = new FormData();
            formData.set('name', activeMember.name);
            formData.set('email', activeMember.email);
            formData.set('message', title);
            var templateParams = {
                user_name: formData.get('name'),
                user_email: formData.get('email'),
                message: formData.get('message')
            };

            emailjs.send(process.env.REACT_APP_SERVICE_ID,
                process.env.REACT_APP_TEMPLATE_ID, templateParams,
                process.env.REACT_APP_PUBLIC_KEY)
                .then((result) => {
                    toast.success("order placed")
                }, (error) => {
                    toast.error("error occurred")
                });
        }

    }
    // rendering products conditionaly
    const itemsRendered = category !== "all" ? filteredProducts : products
    return (
        <div className="w-full pt-[110px] min-h-screen">
            <Toaster position='top-right' reverseOrder={false}></Toaster>
            <div className="w-full h-full flex flex-col top-[120px]">
                <div className='w-[90%] sm:w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
                sm:gap-1  gap-3'>
                    {
                        itemsRendered.length > 0 ? (
                            <>
                                {
                                    itemsRendered.map((product) => (
                                        <div key={product.id}
                                            className='flex flex-col items-center justify-center h-[430px] mt-3'>
                                            <div className="w-[80%] sm:w-[70%] flex flex-col items-center">
                                                <Typography variant='h6'
                                                    className='w-full font-semibold text-sm text-start px-1 capitalize tracking-wide'
                                                >{product.title}</Typography>
                                                <Typography variant="p"
                                                    className='font-light text-sm py-2 tracking-tight text-[#0a192f]'
                                                >{product.description}</Typography>
                                            </div>
                                            <img src={product.productImage} alt="product"
                                                className='w-[80%]  sm:w-[70%] h-[250px] object-cover'
                                            />
                                            <button onClick={() => handlePlaceOrder(product.title)}
                                                className="w-[80%] text-black sm:w-[70%] text-center py-3 rounded-md mt-3
                                bg-cyan-400 hover:bg-cyan-600 capitalize font-semibold text-xs">
                                                place order
                                            </button>
                                            <div className="w-[80%] sm:w-[70%] mt-4 flex flex-row justify-between items-center">
                                                <div onClick={() => {
                                                    HandleLike(product.id)
                                                }}
                                                    className="w-[30%] text-black flex flex-row hover:cursor-pointer hover:bg-[#bdbdbd] justify-evenly items-center py-2 bg-[#eeeeee] rounded-2xl">
                                                    <FavoriteBorderIcon fontSize="10px" />
                                                    <Typography variant="p" className="font-semibold text-xs">{product.likes}</Typography>
                                                </div>
                                                <div onClick={() => {
                                                    handleDislikes(product.id)
                                                }}
                                                    className="w-[30%] text-black flex flex-row hover:cursor-pointer hover:bg-[#bdbdbd] justify-evenly items-center py-2 bg-[#eeeeee] rounded-2xl">
                                                    <ThumbDownOffAltIcon fontSize="10px" />
                                                    <Typography variant="p" className="font-semibold text-xs">{product.dislikes}</Typography>
                                                </div>

                                                <div onClick={() => {
                                                    setActiveChat(product)
                                                    setOpenChat(true)
                                                }}
                                                    className='w-[30%] text-black text-xs font-light capitalize flex flex-row hover:cursor-pointer hover:bg-[#bdbdbd] justify-evenly items-center py-2 bg-[#eeeeee] rounded-2xl'>
                                                    comments
                                                </div>


                                            </div>


                                        </div>
                                    ))
                                }

                            </>) : (
                            <div className='w-full h-full flex justify-center items-center'>
                                <Typography variant="p" className="font-semibold text-sm capitalize text-black"
                                >out of stock</Typography>
                            </div>
                        )
                    }






                </div>
                <Paper elevation={2}>
                    <Drawer
                        anchor={browserWidth > 770 ? "right" : "bottom"}
                        open={openChat} variant='temporary'
                        onClose={() => setOpenChat(false)}

                    >
                        <div className='w-full rounded-t-xl md:rounded-none md:w-[50vw] lg:w-[40vw] h-[70vh] md:h-full'>
                            <ProductChat activeChat={activeChat}
                                setOpenChat={setOpenChat}
                                browserWidth={browserWidth}
                            />
                        </div>
                    </Drawer>

                </Paper>
            </div>
        </div>
    )

}

export default ProductsPage