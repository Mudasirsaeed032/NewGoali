import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import SignupOrganization from './Authentication/SignupOrganization'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/signup/org" element={<SignupOrganization />} />
      </Routes>
    </Router>
  )
}

export default App
