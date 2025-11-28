import { useState } from 'react'
import {  BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Map from './Pages/Map/Map'
import TeamRegister from './Pages/Team-register/TeamRegister'
import ClubRegister from './Pages/Club-register/ClubRegister'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import './App.css'

function App() {

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/map' element={<Map/>}/>
        <Route path='/register' element={<TeamRegister/>}/>
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App
