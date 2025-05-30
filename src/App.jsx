import React, { useState } from "react"
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

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GameProfileProvider } from "./utils/GameProfileContext"
import { Feedback } from "./pages/Feedback"
import { Admin } from "./pages/Admin"
import { AdminRoute } from "./utils/AdminRoute"
import { Notifications } from "./pages/Notifications"
import { PrivacyPolicy } from "./pages/EssentialPages/PrivacyPolicy"
import { TermsConditions } from "./pages/EssentialPages/TermsConditions"
import { Disclaimer } from "./pages/EssentialPages/Disclaimer"
import { Contact } from "./pages/EssentialPages/Contact"
import { HelpCenter } from "./pages/EssentialPages/HelpCenter"
import { AccountVerification } from "./pages/AccountVerification"
import { ResetPass } from "./pages/ResetPass"
import { SingleTournament } from "./pages/SingleTournament"
import { NotFound404 } from "./pages/EssentialPages/NotFound404"

const LoginStatusRouting = () => {
  const { user } = useAuth(); // Get authentication status from context
  return (user ? <Navigate to={'/'} /> : <Outlet />)
};

function App() {

  return (
    <>
      <ToastContainer hideProgressBar position='top-center' theme="dark" />
      <AuthProvider>
        <GameProfileProvider>
          <Routes>
            <Route path='/' element={<ParentPage Page={<Home />} />} />
            <Route path='/games' element={<ParentPage Page={<Games />} />} />
            <Route path='/tournaments' element={<ParentPage Page={<Tournaments />} />} />
            <Route path='/tournaments/pubgmobile' element={<ParentPage Page={<PubgTournaments />} />} />
            <Route path='/tournaments/freefire' element={<ParentPage Page={<FFTournaments />} />} />
            <Route path='/announcement' element={<ParentPage Page={<Announcements />} />} />
            <Route path='/feedback' element={<ParentPage Page={<Feedback />} />} />
            <Route path='/privacy-policy' element={<ParentPage Page={<PrivacyPolicy />} />} />
            <Route path='/terms-conditions' element={<ParentPage Page={<TermsConditions />} />} />
            <Route path='/disclaimer' element={<ParentPage Page={<Disclaimer />} />} />
            <Route path='/contact' element={<ParentPage Page={<Contact />} />} />
            <Route path='/help-center' element={<ParentPage Page={<HelpCenter />} />} />
            <Route path='/pass-recovery' element={<ResetPass />} />
            <Route path='/t/:tid' element={<ParentPage Page={<SingleTournament />} />} />

            <Route element={<LoginStatusRouting />}>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </Route>

            {/* private routes  */}
            <Route element={<PrivateRoutes />} >
              <Route path='/profile' element={<ParentPage Page={<Profile />} />} />
              <Route path='/notifications' element={<ParentPage Page={<Notifications />} />} />
              <Route path="/verify-account" element={<AccountVerification />} />


            </Route>

            <Route element={<AdminRoute />}>
              <Route path='/egofficial-admin' element={<Admin />} />
            </Route>

            <Route path="*" element={<NotFound404 />} />

          </Routes>
        </GameProfileProvider>
      </AuthProvider>
    </>
  )
}



export default App
