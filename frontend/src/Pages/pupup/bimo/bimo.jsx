import React, { useState } from 'react';
import FlagPopupbimo from './FlagPopupbimo';
import './bimo.css'
import { useNavigate } from 'react-router-dom';
import api from '../../../Utils/AxiosConfig'; 

const Bimo = ({token}) => {
  const [isPopupOpenbimo, setIsPopupOpenbimo] = useState(false);
  const [error, setError] = useState('')
  const navigate = useNavigate()
  
  const handleOpenPopupbimo = () => {
    setIsPopupOpenbimo(true);
  };

  const handleClosePopupbimo = () => {
    setIsPopupOpenbimo(false);
  };

  const handleSubmitFlagbimo = async (flag) => {
    flag = flag.trim()

    if(flag.length > 128){
      setError("Flag must contain 128 characters or less")
      return
    }
    if(!flag){
      setError("Flag must not be empty")
      return
    }

    try {
       const res = await api.post('/game/flags/submit/', 
        {
          flag_code: flag,
        },
        {
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      ) //send the flag to the backend

      if(res.data.success){
        navigate("/")
        console.log('Flag submitted:', flag);
        alert(`Success! ${res.data.points_earned} points earned at ${res.data.stand}`);
      }else{
        setError(res.data.message)
        console.log("submittion failed: ", res.data.message)
      }

    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong")
      console.error("Submission failed:", error);
    }
    
    setIsPopupOpenbimo(false);
    
  };
  
  return (
    <div className="app">
      <button id='bimobtn' onClick={handleOpenPopupbimo}>
        bimo
      </button>
      <FlagPopupbimo
        isOpen={isPopupOpenbimo}
        onClose={handleClosePopupbimo}
        onSubmit={handleSubmitFlagbimo}
        error={error}
      />
    </div>
  );
}

export default Bimo;

