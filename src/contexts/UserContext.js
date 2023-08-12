import React, { createContext } from 'react'

export const userContext = createContext({})
const UserContext = ({ children }) => {
    return (
        <userContext.Provider value={{}}>
            {children}
        </userContext.Provider>
    )
}

export default UserContext