import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, limit, onSnapshot, orderBy, query, serverTimestamp, updateDoc, where } from 'firebase/firestore'
import React, { createContext, useEffect, useState } from 'react'
import { db } from '../config/firebase'
import { toast } from 'react-hot-toast'


// creating context
export const adminContext = createContext({})
const AdminContext = ({ children }) => {

    // getting products
    const [products, setProducts] = useState([])
    useEffect(() => {
        const fetchedProducts = async () => {
            const querySnapshot = await getDocs(collection(db, "products"));
            if (querySnapshot.docs.length) {
                if (querySnapshot.docs.length) {
                    const fetchedProduct = [];
                    for (const doc of querySnapshot.docs) {
                        const productData = { id: doc.id, ...doc.data() };
                        const messageRef = collection(doc.ref, "messages");
                        const orderedMessages = query(messageRef, orderBy("createdAt"), limit(100));
                        onSnapshot(orderedMessages, (snapshot) => {
                            const fetchedChats = [];
                            snapshot.forEach((chat) => {
                                fetchedChats.push({ id: chat.id, ...chat.data() });
                            });
                            productData.chats = fetchedChats;
                        })
                        fetchedProduct.push(productData);
                    }
                    setProducts(fetchedProduct)
                }
            }
        }
        fetchedProducts()
    }, [products])




    // end

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
            if (querySnapshot.docs.length) {
                if (querySnapshot.docs.length) {
                    const fetchedProduct = [];
                    for (const doc of querySnapshot.docs) {
                        const productData = { id: doc.id, ...doc.data() };
                        const chatsCollection = await getDocs(collection(doc.ref, "messages"));
                        if (chatsCollection.docs.length) {
                            const fetchedChats = [];
                            chatsCollection.forEach((chat) => {
                                fetchedChats.push({ id: chat.id, ...chat.data() });
                            });
                            productData.chats = fetchedChats;
                        }
                        fetchedProduct.push(productData);
                    }
                    setFilteredProducts(fetchedProduct)
                }
            }
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
    //send message
    const sendMessage = (message, name, customerId, activeChatId) => {
        const productRef = doc(db, "products", activeChatId);
        const messageRef = collection(productRef, "messages")
        const createdAt = serverTimestamp()
        addDoc(messageRef, {
            message: message,
            createdAt: createdAt,
            sender: customerId,
            senderName: name
        }).then(() => {
            toast.success("sent")
        }).catch((error) => {
            console.log(error)
        })

    }


    return (
        <adminContext.Provider value={{
            HandleLike, handleDislikes, category, setCategory,
            products, handleDelete, filteredProducts, sendMessage
        }}>
            {children}
        </adminContext.Provider>
    )
}

export default AdminContext