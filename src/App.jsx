import React from "react"
import { PrivateRoutes } from './utils/PrivateRoutes'
import { AuthProvider, useAuth } from './utils/AuthContext'
import { Route, Routes, Navigate, Outlet } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { Profile } from './pages/Profile'
import { ParentPage } from "./pages/ParentPage"
import { Tournaments } from './pages/Tournaments'
import { Announcements } from "./pages/Announcements"


const LoginStatusRouting = () => {
  const { user } = useAuth(); // Get authentication status from context
  return (user ? <Navigate to={'/'} /> : <Outlet />)
};

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<ParentPage Page={<Home />} />} />
          <Route path='/tournaments' element={<ParentPage Page={<Tournaments />} />} />
          <Route path='/announcement' element={<ParentPage Page={<Announcements />} />} />

          <Route element={<LoginStatusRouting />}>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Route>

          {/* private routes  */}
          <Route element={<PrivateRoutes />} >
            <Route path='/profile' element={<ParentPage Page={<Profile />} />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  )
}



export default App
