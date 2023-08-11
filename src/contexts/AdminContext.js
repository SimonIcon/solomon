import { addDoc, collection, getDocs, serverTimestamp } from 'firebase/firestore'
import React, { createContext, useEffect, useState } from 'react'
import { db } from '../config/firebase'
import { toast } from 'react-hot-toast'


// creating context
export const adminContext = createContext({})
const AdminContext = ({ children }) => {
    // adding books
    const handleAddProduct = async (title, description, category, productImage) => {
        const productRef = await collection(db, "products")
        const createdAt = serverTimestamp()
        addDoc(productRef, {
            title,
            createdAt: createdAt,
            description,
            productImage,
            category
        }).then(() => {
            toast.success("product added successfully")
        }).catch(() => {
            toast.error('failed to add product')
        })
    }
    // getting products
    // getting books from database
    const [products, setProducts] = useState([])
    useEffect(() => {
        const getProducts = async () => {
            await getDocs(collection(db, "products")).then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    const fetchedProducts = []
                    querySnapshot.forEach((book) => {
                        fetchedProducts.push({ id: book.id, ...book.data() })
                    })
                    setProducts(fetchedProducts)
                }

            }).catch((error) => {
                toast.error("error while fetching books")
                console.log(error)
            })


        }
        getProducts()
    }, [])
    console.log(products)
    return (
        <adminContext.Provider value={{ handleAddProduct }}>
            {children}
        </adminContext.Provider>
    )
}

export default AdminContext