import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

export const AdminRoute = () => {
    const { user } = useAuth()

    return ((user.labels.includes("admin") && user.email === "esportsgravity7@gmail.com") ? <Outlet /> : <Navigate to={'/'} />)
}
