import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  
  useEffect(() => {
    // Check if logged in on component mount
    const token = localStorage.getItem('access_token')
    if (!token) {
      navigate('/login')
    }
  }, [navigate])
  
  return (
    <div>
      <h1>Welcome to Home Page!</h1>
      {/* Your content */}
    </div>
  )
}

export default Home
