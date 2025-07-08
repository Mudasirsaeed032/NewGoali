import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import SignupOrganization from './Pages/Authentication/SignupOrganization'
import Login from './Pages/Authentication/Login'
import JoinTeam from './Pages/Authentication/JoinTeam'
import SendInvite from './Pages/Invites/SendInvite'
import DashboardRedirect from './Pages/DashboardRedirect/DashboardRedirect'


function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/signup/org" element={<SignupOrganization />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<JoinTeam />} />
        <Route path="/admin/send-invite" element={<SendInvite />} />
        <Route path="/dashboard/:role" element={<DashboardRedirect />} />
      </Routes>
    </Router>
  )
}

export default App
