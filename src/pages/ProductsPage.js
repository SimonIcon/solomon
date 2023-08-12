import React, { useContext } from 'react'
import { adminContext } from '../contexts/AdminContext'
import { Toaster } from 'react-hot-toast'
import { Typography } from '@mui/material'

const ProductsPage = () => {
    const { products, filteredProducts } = useContext(adminContext)
    // rendering products conditionaly
    const itemsRendered = filteredProducts.length !== 0 ? filteredProducts : products
    return (
        <div className={`w-full pt-[80px] z-30`}>
            <Toaster position='top-right' reverseOrder={false}></Toaster>
            <div className='w-full flex justify-center items center'>
                <div className='w-[90%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5 py-8'>
                    {
                        itemsRendered.map((product) => (
                            <div key={product.id} className='flex flex-col items-center justify-center h-[400px]'>
                                <div className="w-[80%] flex flex-col items-center">
                                    <Typography variant='h6'
                                        className='font-semibold text-sm text-center'
                                    >{product.title}</Typography>
                                    <Typography variant="p"
                                        className='font-light text-xs indent-4'
                                    >{product.description}</Typography>
                                </div>
                                <img src={product.productImage} alt="product"
                                    className='w-[80%] h-[200px] object-cover'
                                />

                            </div>
                        ))
                    }

                </div>
            </div>
        </div>
    )

}

export default ProductsPage