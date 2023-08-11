import React, { createContext, useState } from 'react'
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore"
import { auth, db } from '../config/firebase'
import { toast } from "react-hot-toast"
export const homeContext = createContext({})
const HomeContext = ({ children }) => {
    // opening auth modal
    const [openAuth, setOpenAuth] = useState(false)
    // registering users
    const RegisterUser = async (email, password, name, phone) => {
        // Check if the user exists
        fetchSignInMethodsForEmail(auth, email).then((user) => {
            if (user.length === 0) {
                const timestamp = serverTimestamp();
                createUserWithEmailAndPassword(auth, email, password).then((res) => {
                    setDoc(doc(db, "customers", res.user.uid), {
                        joinedOn: timestamp,
                        email: email,
                        name: name,
                        phone: phone,
                        isAdmin: false
                    });
                    toast.success("registered successfully")
                }).catch((error) => {
                    toast.error(error.message)
                    console.log(error)
                })
            } else {
                toast.error("user already exist")
            }

        }).catch((error) => {
            toast.error(error.message)
        })
    }
    // sign in users

    // login user
    const [activeMember, setActiveMember] = useState([])
    const [isLogged, setIsLogged] = useState(false)
    const handleSignIn = async (email, password) => {
        // Check if the user exists
        fetchSignInMethodsForEmail(auth, email)
            .then((signInMethods) => {
                if (signInMethods.length === 0) {
                    toast.error("invalid user")
                    setIsLogged(false)
                    return;
                }
                signInWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        const user = userCredential.user;
                        if (user) {
                            setIsLogged(true)
                            getDoc(doc(db, "customers", user.uid)).then((fetchedUser) => {
                                setActiveMember({ id: fetchedUser.id, ...fetchedUser.data() })
                            }).catch(() => {
                                toast.error("error while fetching your data")
                                setIsLogged(false)
                            })
                        }
                    })
                    .catch((error) => {
                        setIsLogged(false)
                        toast.error("invalid credentials")

                    });
            }).catch((error) => {
                toast.error("user does not exist")
            })
    }
    // recovering password

    const handleForgotPassword = (email) => {
        fetchSignInMethodsForEmail(auth, email).then((res) => {
            if (res.length === 0) {
                toast.error("invalid user")
                setIsLogged(false)
                return;
            }
            sendPasswordResetEmail(auth, email).then((res) => {
                toast.success('check out your email to reset password')
                setIsLogged(true)
            }).catch(() => {
                toast.error("error while trying to locate your email")
                setIsLogged(true)
            })
        }).catch(() => {
            toast.error("your do not have active account")
            setIsLogged(false)
        })

    }
    // signing out user
    const handleLogout = () => {
        signOut(auth).then(() => {
            toast.success('you have signed out')
            setIsLogged(false)
        }).catch((error) => {
            toast.error("error while loging out")
        });
    }


    return (
        <homeContext.Provider value={{
            openAuth, setOpenAuth, RegisterUser, handleSignIn,
            activeMember, isLogged, handleForgotPassword, handleLogout
        }}>
            {children}
        </homeContext.Provider>
    )
}

export default HomeContext