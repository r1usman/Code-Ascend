import { children, createContext, useState } from "react";

export const RightBarContextApi = createContext()


export const RightBarProvider = ({ children }) => {
    const [DisplayRightBar, setDisplayRightBar] = useState(true)
    const [Admin, setAdmin] = useState(false)
    return (
        <RightBarContextApi.Provider value={{ DisplayRightBar, setDisplayRightBar, Admin,setAdmin }}>
            {children}
        </RightBarContextApi.Provider>

    )
}