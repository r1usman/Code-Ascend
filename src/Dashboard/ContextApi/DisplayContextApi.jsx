import { children, createContext, useState } from "react";

export const RightBarContextApi = createContext()


export const RightBarProvider = ({ children }) => {
    const [DisplayRightBar, setDisplayRightBar] = useState(true)
    const [isAdmin, setisAdmin] = useState(false)
    return (
        <RightBarContextApi.Provider value={{ DisplayRightBar, setDisplayRightBar, isAdmin,setisAdmin }}>
            {children}
        </RightBarContextApi.Provider>

    )
}