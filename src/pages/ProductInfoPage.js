import React, { useContext } from 'react'
import { adminContext } from '../contexts/AdminContext'
import { Typography } from '@mui/material'
import { Toaster } from 'react-hot-toast'

const ProductInfoPage = () => {
    const { products, handleDelete } = useContext(adminContext)
    return (
        <div className={`w-full pt-[80px] z-30`}>
            <Toaster position='top-right' reverseOrder={false}></Toaster>
            <div className='w-full flex justify-center items center'>
                <div className='w-[90%] grid grid-cols-1 lg:grid-cols-2  gap-5 py-8'>
                    {
                        products.map((product) => (
                            <div key={product.id} className='flex flex-col items-center justify-center h-[400px]'>
                                <div className="w-[80%] flex flex-row justify-between px-4 py-3">
                                    <Typography variant='p'
                                        className='font-semibold text-sm'
                                    >{product.title}</Typography>
                                    <Typography variant="p"
                                        className='font-semibold text-sm capitalize'
                                    >{product.category}</Typography>
                                </div>
                                <img src={product.productImage} alt="product"
                                    className='w-[85%] h-[300px] object-cover'
                                />
                                <div className='w-[85%] flex flex-row justify-between items-center mt-3'>
                                    <button onClick={() => handleDelete(product.id)}
                                        className='w-[40%] py-2 text-center text-xs font-semibold capitalize
                                        rounded-md bg-red-300 hover:bg-red-600'
                                    >delete</button>
                                    <button
                                        className='w-[40%] py-2 text-center capitalize font-semibold text-sm 
                                        rounded-md bg-cyan-300 hover:bg-cyan-600'
                                    >view comments</button>

                                </div>
                            </div>
                        ))
                    }
                </div>

            </div>
        </div>
    )
}

export default ProductInfoPage