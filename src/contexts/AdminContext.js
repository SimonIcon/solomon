import { collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import React, { createContext, useEffect, useState } from 'react'
import { db } from '../config/firebase'
import { toast } from 'react-hot-toast'


// creating context
export const adminContext = createContext({})
const AdminContext = ({ children }) => {

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
    const [category, setCategory] = useState("all")
    const [filteredProducts, setFilteredProducts] = useState([])
    // getting filtered products
    useEffect(() => {
        const getFilteredProducts = async () => {
            const products = query(collection(db, "products"), where("category", "==", category));
            const querySnapshot = await getDocs(products);
            const result = [];
            querySnapshot.forEach((product) => {
                result.push({ id: product.id, ...product.data() })

            });
            setFilteredProducts(result)
        }
        getFilteredProducts()
    }, [category])
    // handle likes
    const HandleLike = async (id) => {
        await getDoc(doc(db, "products", id)).then((doc) => {
            updateDoc(doc.ref, {
                likes: doc.data().likes + 1
            })
        }).catch(() => {
            console.log("error while updating like section")
        })
    }
    // handle dislikes
    const handleDislikes = async (id) => {
        await getDoc(doc(db, "products", id)).then((doc) => {
            updateDoc(doc.ref, {
                dislikes: doc.data().likes + 1
            })
        }).catch(() => {
            console.log("error while updating like section")
        })
    }
    // 

    return (
        <adminContext.Provider value={{
            HandleLike, handleDislikes, category, setCategory,
            products, handleDelete, filteredProducts,
        }}>
            {children}
        </adminContext.Provider>
    )
}

export default AdminContext