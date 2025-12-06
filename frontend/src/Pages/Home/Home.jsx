import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Bimo from '../pupup/bimo/bimo'
import Candy from '../pupup/candy/candy'
import Cloud from '../pupup/cloud/cloud'
import Jayk from '../pupup/jayk/jayk'
import King from '../pupup/king/king'
import Marceline from '../pupup/marceline/marceline'
import Sandy from '../pupup/sandy/sandy'
import Lichhome from '../pupup/thelich/lichhome'
import './Home.css';

const Home = () => {
  const navigate = useNavigate()
  
  useEffect(() => {
    // Check authentication (App.js already checked game status)
    const token = localStorage.getItem('access_token')
    if (!token) {
      navigate('/login')
      return
    }
  }, [navigate])
  
  const token = localStorage.getItem('access_token')
  
  return (
    <div className="background">
      <img src="ciclogo.png" alt="" id='mainciclogo' />
      <button id='Games' >Choose Your Game</button>
      <img src="background.jpg" alt="background" id='backgroundimg'/>
      <img src="mainbimo.png" alt="mainbimo" id='mainbimo' />
      <img src="enchrdbook.png" alt="enchrbook" id='enchrbook'/>
      <div className="pop-ups">
        <Candy token={token}/>
        <Marceline token={token}/>
        <Lichhome token={token}/>
        <Jayk token={token}/>
        <King token={token}/>
        <Bimo token={token}/>
        <Cloud token={token}/>
        <Sandy token={token}/>
      </div>
    </div>
  )
}

export default Home