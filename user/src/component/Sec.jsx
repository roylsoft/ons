import React from 'react'
import { Navigate } from 'react-router-dom'

function Sec({children}) {
  return localStorage.getItem("valid")? children : <Navigate to="/"/>
  
}

export default Sec