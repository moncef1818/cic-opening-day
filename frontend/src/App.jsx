import { useState } from 'react'
import { Routes,Route, useLocation} from 'react-router-dom'
import Home from './Pages/Home/Home'
import Map from './Pages/Map/Map'
import Login from './Pages/Login/Login'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import './App.css'

function App() {

  const location = useLocation();
  const hideLayout = location.pathname === "/login"; // pages without navbar/footer

  return (
    <>
      {!hideLayout && <Navbar />}
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/map' element={<Map />} />
        <Route path='/login' element={<Login />} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

export default App
