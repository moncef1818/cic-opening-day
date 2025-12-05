import { Routes, Route, Navigate } from 'react-router-dom'  
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import ClubRegister from './Pages/Club-register/ClubRegister'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />  
      <Route path="/club-register" element={<ClubRegister />} />
      <Route path="*" element={<Navigate to="/login" />} /> {/* for any other paths */}
    </Routes>
  )
}

export default App