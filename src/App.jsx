import React from "react"
import { PrivateRoutes } from './utils/PrivateRoutes'
import { AuthProvider, useAuth } from './utils/AuthContext'
import { Route, Routes, Navigate, Outlet } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { Games } from './pages/Games'
import { Profile } from './pages/Profile'
import { ParentPage } from "./pages/ParentPage"
import { PubgTournaments } from './pages/PubgTournaments'
import { Tournaments } from './pages/Tournaments'
import { FFTournaments } from './pages/FFTournaments'
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
          <Route path='/games' element={<ParentPage Page={<Games />} />} />
          <Route path='/tournaments' element={<ParentPage Page={<Tournaments />} />} />
          <Route path='/tournaments/pubg' element={<ParentPage Page={<PubgTournaments />} />} />
          <Route path='/tournaments/freefire' element={<ParentPage Page={<FFTournaments />} />} />
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
