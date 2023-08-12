import React, { useContext } from 'react'
import { adminContext } from '../contexts/AdminContext'
import { Typography } from '@mui/material'

const ProductInfoPage = () => {
    const { products } = useContext(adminContext)
    console.log(products)
    return (
        <div className={`w-full pt-[80px] z-30`}>
            <div className='w-full flex justify-center'>
                {
                    products.map((product) => (
                        <div key={product.id} className='w-[400px] h-[300px]'>
                            <div className="w-full flex flex-row justify-between px-4 py-3">
                                <Typography>{product.title}</Typography>
                                <Typography>{product.category}</Typography>
                            </div>
                            <img src={product.productImage} alt="product"
                                className='w-[85%] h-[230px] object-cover'
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ProductInfoPage