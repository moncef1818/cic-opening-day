import { useNavigate } from 'react-router-dom'
import { MdErrorOutline } from "react-icons/md";
import './Error.css'

const Error = () => {
  const navigate = useNavigate()
  
  const Register = () => {
    navigate('/club-register')
  }
  

  
  return (
    <div className="error-container">
      <div className="error-content">
        <div className="error-icon">
          <MdErrorOutline/>
        </div>
        
        <h1 className="error-title">Error</h1>
        
        <div className="error-message">
          <p>You have already completed the games!</p>
          <p>Please proceed to club registration.</p>
        </div>
        
        
        <button 
          onClick={Register}
          className="register-btn"
        >
          Go to Registration
        </button>
        
      </div>
    </div>
  )
}

export default Error