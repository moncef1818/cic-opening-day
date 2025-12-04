import { Routes, Route, Navigate } from 'react-router-dom'  
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />  
      <Route path="*" element={<Navigate to="/login" />} /> {/* for any other paths */}
    </Routes>
  )
}

export default App