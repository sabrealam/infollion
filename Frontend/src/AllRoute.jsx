import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Thankyou from './pages/Thankyou'
import AuthPage from './pages/AuthPage'

export default function AllRoute() {
  return (
    <Routes>
      
        <Route path="/" exact element={<AuthPage />}  />
        <Route path="/thank-you" element={<Thankyou />} />
    </Routes>
  )
}
