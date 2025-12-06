import { Routes, Route, Navigate } from 'react-router-dom'  
import { useState, useEffect } from 'react';
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import ClubRegister from './Pages/Club-register/ClubRegister'
import Error from './Pages/Error/Error'
import './App.css'

function App() {
  const [gamePhase, setGamePhase] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check game phase once when app loads
    const checkGamePhase = async () => {
      try {
        const response = await fetch('https://cic-opening-day-backend.onrender.com/api/game/phase/');
        const data = await response.json();
        setGamePhase(data);
      } catch (error) {
        console.error('Failed to fetch game phase:', error);
        setGamePhase({ has_ended: false, game_active: true });
      } finally {
        setLoading(false);
      }
    };

    checkGamePhase();
  }, []);

  if (loading) {
    return <div className="app-loading">Loading...</div>;
  }

  const { has_ended, game_active } = gamePhase || { has_ended: false, game_active: true };
  const token = localStorage.getItem('access_token');

  console.log('App Status:', { 
    has_ended, 
    game_active, 
    token: !!token,
    loading 
  });

  return (
    <Routes>
      {/* LOGIN - Show login if no token */}
      <Route path='/login' element={
        !token ? <Login /> : <Navigate to="/" replace />
      } />

      {/* HOME - ONLY if logged in AND game NOT ended */}
      <Route path='/' element={
        token && !has_ended ? <Home /> : <Navigate to={token ? "/club-register" : "/login"} replace />
      } />

      {/* CLUB REGISTER - Show when game ended */}
      <Route path='/club-register' element={
        has_ended ? <ClubRegister /> : <Navigate to="/" replace />
      } />

      {/* ERROR */}
      <Route path='/error' element={<Error />} />

      {/* CATCH ALL - Smart redirect */}
      <Route path='*' element={
        <Navigate to={token ? (has_ended ? "/club-register" : "/") : "/login"} replace />
      } />
    </Routes>
  );
}

export default App