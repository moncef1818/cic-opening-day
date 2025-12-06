import { Routes, Route, Navigate } from 'react-router-dom'  
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import ClubRegister from './Pages/Club-register/ClubRegister'
import Error from './Pages/Error/Error'
import Leaderboard from './leadboard'
import './App.css'

function App() {

  const gamesFinished = localStorage.getItem('games_finished') === 'true' // temporarely to test

  return (
    <Routes>
      {!gamesFinished ? (
         <Route path='/login' element={<Login/>}/>
        ) :(
          <Route path='/login' element={<Error/>}/>
        ) }
      <Route path="/" element={<Home />} />  
      <Route path="/club-register" element={<ClubRegister />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="*" element={<Navigate to="/login" />} /> {/* for any other paths */}
    </Routes>

    
  )
}

export default App