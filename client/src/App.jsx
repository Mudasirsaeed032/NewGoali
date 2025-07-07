import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import SignupOrganization from './Authentication/SignupOrganization'
import Login from './Authentication/Login'
import JoinTeam from './Authentication/JoinTeam'
import SendInvite from './Invites/SendInvite'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/signup/org" element={<SignupOrganization />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<JoinTeam />} />
        <Route path="/admin/send-invite" element={<SendInvite />} />
      </Routes>
    </Router>
  )
}

export default App
