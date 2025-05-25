import React, { useContext } from 'react'
import {UserContext} from "./GlobalContextApi/User" 
import { json } from 'react-router-dom'
const CheckUserInfo = () => {
    const {User} = useContext(UserContext)
  return (
    <div>{JSON.stringify(User)}</div>
  )
}

export default CheckUserInfo