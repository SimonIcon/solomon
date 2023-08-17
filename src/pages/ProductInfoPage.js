import React, { useContext, useEffect, useState } from 'react'
import { adminContext } from '../contexts/AdminContext'
import { Drawer, Paper, Typography } from '@mui/material'
import { Toaster } from 'react-hot-toast'
import productCategory from "../utils/products.js"
import ProductChat from '../components/ProductChat'
import styles from "../styles/general.module.scss"


const ProductInfoPage = () => {
    const { products, handleDelete, filteredProducts, setCategory,
        category } = useContext(adminContext)
    const renderedProducts = category === "all" ? products : filteredProducts

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

    return (
        <div className={`w-full pt-[80px] z-30`}>
            <Toaster position='top-right' reverseOrder={false}></Toaster>
            <div className="w-full flex flex-col md:flex-row">
                <div className={`w-full md:w-[20%] md:justify-start z-20`}>
                    <form className={`w-full md:w-[20%] bg-[#0a192f] md:bg-[#fafafa] md:text-black text-white mb-2 
                    md:mb-0 flex flex-col justify-center fixed items-center md:justify-start md:items-center`}>
                        <p className='text-center md:text-start md:px-3 capitalize font-light pt-2'>categories</p>
                        <div className={`${styles.scroll} w-full mb-3 overflow-x-auto flex flex-row
                         md:flex-col`}>
                            {
                                productCategory.map((cat) => (
                                    <div key={cat.id}
                                        className={`w-full flex flex-row justify-between md:justify-start md:pl-2 mt-1 md:mt-3 items-center`}>
                                        <input type="radio" id={cat.value} name="productCategory"
                                            value={cat.value}
                                            onChange={(e) => {
                                                setCategory(e.target.value)

                                            }}
                                            checked={category === cat.value}
                                        />
                                        <Typography variant="p"
                                            className="md:pl-2 px-2 flex flex-row flex-wrap capitalize text-xs font-light">
                                            {cat.name}</Typography>
                                    </div>
                                ))
                            }
                        </div>


                    </form>
                </div>
                <div className={` w-full md:w-[75%] flex flex-col mt-3`}>
                    <div className={`w-full sm:w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 
                sm:gap-1  gap-7 min-h-[100vh]`}>

                        {
                            renderedProducts.length > 0 ? (
                                <>
                                    {
                                        renderedProducts.map((product) => (
                                            <div key={product.id}
                                                className='flex flex-col items-center md:px-5 justify-center h-[430px] mt-3'>
                                                <div className="w-full sm:w-[75%] md:w-full flex flex-col items-start">
                                                    <Typography variant='h6'
                                                        className='font-semibold text-sm text-start px-1 capitalize'
                                                    >{product.title}</Typography>
                                                    <Typography variant="p"
                                                        className='font-light text-start text-sm py-2'
                                                    >{product.description}</Typography>
                                                </div>
                                                <img src={product.productImage} alt="product"
                                                    className='w-full sm:w-[75%] md:w-full h-[300px] object-cover'
                                                />
                                                <div className='w-full sm:w-[75%] md:w-full flex flex-row justify-evenly items-center mt-3'>
                                                    <button onClick={() => handleDelete(product.id)}
                                                        className='w-[40%] py-2  text-center text-xs font-semibold capitalize
                                        rounded-md bg-red-300 hover:bg-red-600'
                                                    >delete</button>
                                                    <button onClick={() => {
                                                        setActiveChat(product)
                                                        setOpenChat(true)
                                                    }}
                                                        className='w-[40%] py-2  text-center text-xs font-semibold capitalize
                                        rounded-md bg-cyan-300 hover:bg-cyan-600'
                                                    >comments
                                                        {
                                                            product.chats === undefined ? 0 : 7

                                                        }
                                                    </button>

                                                </div>
                                            </div>

                                        ))

                                    }


                                </>) : (
                                <div className={`min-h-screen w-full flex flex-col pt-[80px] justify-center items-center`}>
                                    <h5>out of stock</h5>
                                </div>)
                        }

                    </div>
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

export default ProductInfoPage