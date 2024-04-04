import React from "react"
import { PrivateRoutes } from './utils/PrivateRoutes'
import { AuthProvider } from './utils/AuthContext'
import { Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { Profile } from './pages/Profile'
import { ParentPage } from "./pages/ParentPage"


function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<ParentPage Page={<Home />} />} />


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
