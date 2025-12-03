import React, { useState } from 'react'
import './Login.css'
import { AiOutlineTeam } from "react-icons/ai";
import { FaLock } from "react-icons/fa";

const Login = () => {

 
  return (
    <main className='login-container'>
      <div className='Login-page'>
       <div className='logo'>
         <img src="./cic-logo.png" alt=""/>
       </div>
       <form action="">
        <h2>Log in</h2>
        <div className='input-box'>
          <input type="text" placeholder='Team Name' required/>
          <AiOutlineTeam className='icon'/>
        </div>
        <div className='input-box'>
          <input type="password" placeholder='Password' required/>
          <FaLock className='icon'/>
        </div>

        <button type="submit" id='login-btn'>Log in</button>
       </form>
      </div>
    </main>
  )
}

export default Login