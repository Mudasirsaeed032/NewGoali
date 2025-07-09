import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

import SignupOrganization from './Pages/Authentication/SignupOrganization'
import Login from './Pages/Authentication/Login'
import JoinTeam from './Pages/Authentication/JoinTeam'
import SendInvite from './Pages/Invites/SendInvite'
import DashboardRedirect from './Pages/DashboardRedirect/DashboardRedirect'
import ProtectedRoute from './Pages/ProtectedRoute/ProtectedRoute'
import Layout from './Boilerplate/Layout'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/signup/org" element={<SignupOrganization />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<JoinTeam />} />

          {/* Admin Tooling (optional protection later) */}
          <Route path="/admin/send-invite" element={<SendInvite />} />

          {/* Protected Role-Based Dashboard */}
          <Route
            path="/dashboard/:role"
            element={
              <ProtectedRoute>
                <DashboardRedirect />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
