import React, { useRef, useState } from 'react'
import './Login.css'
import { AiOutlineTeam } from "react-icons/ai";
import { CiLock } from "react-icons/ci";
import axios from 'axios';

const Login = () => {
  const teamNameRef = useRef(null);
  const passwordRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const Submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const team_name = teamNameRef.current.value.trim();
    const password = passwordRef.current.value;
    
    // Frontend validation
    if (!team_name) {
      setError('Team name is required');
      teamNameRef.current.focus();
      setLoading(false);
      return;
    }
    
    if (team_name.length > 100) {
      setError('Team name must be 100 characters or less');
      teamNameRef.current.focus();
      setLoading(false);
      return;
    }
    
    if (!password) {
      setError('Password is required');
      passwordRef.current.focus();
      setLoading(false);
      return;
    }
    
    try {
      const res = await axios.post(
        'https://cic-opening-day-backend.onrender.com/api/team/login/', 
        { team_name, password },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log('Login successful:', res.data);
      
      const { access, refresh, team } = res.data;
      
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      localStorage.setItem('team_id', team.id);
      localStorage.setItem('team_name', team.name);
      localStorage.setItem('team_created_at', team.created_at);
      
      window.location.href = '/';
      
    } catch (err) {
      console.error('Login error details:', {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message
      });
      
      const errorData = err.response?.data;
      
      if (errorData?.team_name) {
        setError(errorData.team_name);
      } else if (errorData?.password) {
        setError(errorData.password);
      } else if (err.response?.status === 400) {
        setError('Invalid credentials. Please try again.');
      } else if (err.response?.status === 401) {
        setError('Invalid credentials. Please try again.');
      } else if (!err.response) {
        setError('Network error. Please check your connection.');
      } else {
        setError('Login failed. Please try again.');
      }
      
      passwordRef.current.value = '';
      passwordRef.current.focus();
      
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      Submit(e);
    }
  };

  const clearError = () => {
    if (error) setError('');
  };

  return (
    <main className='login-container'>
      <div className='Login-page'>
        <div className='logo'>
          <img src="/cic-logo.png" alt="CIC Logo"/>
        </div>
        <form onSubmit={Submit}>
          <h2>Log in to Play</h2>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          <div className='input-box'>
            <input 
              type="text" 
              ref={teamNameRef}
              name="team_name"
              placeholder='Team Name' 
              required
              maxLength={100}
              disabled={loading}
              onKeyPress={handleKeyPress}
              onChange={clearError}
              autoFocus
            />
            <AiOutlineTeam className='icon'/>
          </div>
          <div className='input-box'>
            <input 
              type="password" 
              ref={passwordRef}
              name="password"
              placeholder='Password' 
              required
              disabled={loading}
              onKeyPress={handleKeyPress}
              onChange={clearError}
            />
            <CiLock className='icon'/>
          </div>

          <button type="submit" id='login-btn' disabled={loading}>
            {loading ? (
              <>
                <span className="spinner"></span>
                Logging in...
              </>
            ) : 'Log in'}
          </button>
        </form>
      </div>
    </main>
  )
}

export default Login