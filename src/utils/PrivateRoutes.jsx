import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

export const PrivateRoutes = () => {
    const { user } = useAuth()

    return (user ? <Outlet /> : <Navigate to={'/login'} />)
}
