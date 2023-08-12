import { addDoc, collection, deleteDoc, doc, getDocs, query, serverTimestamp, where } from 'firebase/firestore'
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
    const [products, setProducts] = useState([])
    useEffect(() => {
        const getProducts = async () => {
            await getDocs(collection(db, "products")).then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    const fetchedProducts = []
                    querySnapshot.forEach((product) => {
                        fetchedProducts.push({ id: product.id, ...product.data() })
                    })
                    setProducts(fetchedProducts)
                }

            }).catch((error) => {
                toast.error("error while fetching products")
                console.log(error)
            })


        }
        getProducts()
    }, [products])
    // deleting documents

    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "products", id)).then(() => {
            toast.success("product deleted successfully")
        }).catch(() => {
            toast.error("error occurred while deleting product")
        })
    }
    // getting products for given category
    const [filteredProducts, setFilteredProducts] = useState([])
    const [activeCategory, setActiveCategory] = useState('')
    useEffect(() => {
        const getFilteredProducts = async () => {
            const products = query(collection(db, "products"), where("category", "==", activeCategory));
            const querySnapshot = await getDocs(products);
            const result = [];
            querySnapshot.forEach((product) => {
                result.push({ id: product.id, ...product.data() })

            });
            setFilteredProducts(result)
        }
        getFilteredProducts()
    }, [activeCategory])

    return (
        <adminContext.Provider value={{
            handleAddProduct, products, handleDelete, setActiveCategory, filteredProducts
        }}>
            {children}
        </adminContext.Provider>
    )
}

export default AdminContext