import React from 'react'
import { isUserLogged } from '../../context/user-context'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({Component}) => {
    return isUserLogged() ? <Component/> : <Navigate to="/login" />
}

export default PrivateRoute