import React from 'react'
import productCategory from '../utils/products'
import { Card } from '@mui/material';

const Categories = () => {
    return (
        <div className='w-full flex flex-col justify-center items-center pt-[130px]' name="categories">
            <h2 className='text-center capitalize py-1 text-xl font-semibold tracking-wider underline'>products categories</h2>
            <div className='w-[90%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 items-center py-8'>
                {
                    productCategory.map((category) => (
                        <Card key={category.id} className='h-[250px] flex flex-col justify-center items-center'>
                            <h4 className="font-semibold capitalize text-sm tracking-wide">{category.name}</h4>
                            <img src={category.productImage} alt='category'
                                className='h-[200px] w-[75%] object-fit'
                            />
                            <p className="text center font-semibold text-xs capitalize tracking-tight">view all</p>
                        </Card>
                    ))
                }

            </div>
        </div>
    )
}

export default Categories
