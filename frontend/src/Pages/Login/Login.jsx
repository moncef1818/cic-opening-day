import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Login.css'
import { AiOutlineTeam } from "react-icons/ai";
import { FaLock } from "react-icons/fa";
import axios from 'axios';

const Login = () => {
  const teamNameRef = useRef(null);
  const passwordRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const Submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const team_name = teamNameRef.current.value.trim(); // use trim to remove white spaces (" test " === "test")
    const password = passwordRef.current.value;
    
    // Frontend validation (matching backend rules)
    if (!team_name) {
      setError('Team name is required');
      teamNameRef.current.focus(); // 'focus' controls the cursor / Moves cursor to team name field
      setLoading(false); //stop loading
      return;
    }
    
    if (team_name.length > 100) {
      setError('Team name must be 100 characters or less'); //verify if team name larger then 100
      teamNameRef.current.focus(); //move the cursor to team name field again
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
        'http://localhost:8000/api/team/login/', 
        { team_name, password },  // send the team name/ password to back-end
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
      
      // Redirect to home/game page
      navigate('/');
      
    } catch (err) {
      console.error('Login error details:', {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message
      });
      
     
      const errorData = err.response?.data;
      //errors

      if (errorData?.team_name) {
        setError(errorData.team_name);  // "Team not found.", ndiw message te3 django response

      } else if (errorData?.password) {
        setError(errorData.password);  // "Invalid password."

      } else if (err.response?.status === 400) {
        setError('Something went wrong. Please check your input.'); //bad request

      } else if (err.response?.status === 401) {
        setError('something went wrong');  // Unauthorized

      } else if (!err.response) {
        setError('something went wrong');

      } else {
        setError('Login failed. Please try again.'); // Unknown error
      }
      
      passwordRef.current.value = '';
      passwordRef.current.focus(); //re-focus on password field
      
    } finally {
      setLoading(false); //stop loading
    }
  };

  const handleKeyPress = (e) => {
    // if not loading and the pressed key is enter so submit
    if (e.key === 'Enter' && !loading) {
      Submit(e);
    }
  };
 

  //clear error when start typing
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

          <h2>Log in</h2>

          {/* show error if it exists */}
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
              maxLength={100}  // Matches serializer max_length
              disabled={loading} // if loading is true , make the field disabled
              onKeyPress={handleKeyPress}
              onChange={clearError}
              autoFocus //focus automaticly on this field
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
            <FaLock className='icon'/>
          </div>

          <button  type="submit" id='login-btn' disabled={loading}>
             {/* if loading = true then  */}
            {loading ? (
              <>
                <span className="spinner"></span> {/* inline element, no new line, spinning a circle */}
                Logging in...
              </>
            ) : 'Log in'} {/* if loading = false then display just log in txtt */}
          </button>
        </form>
      </div>
    </main>
  )
}

export default Login