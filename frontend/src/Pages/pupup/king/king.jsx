
import React, { useState } from 'react';
import FlagPopupking from './FlagPopupking';
import './king.css'
import api from '../../../Utils/AxiosConfig'; 
import { useNavigate } from 'react-router-dom';

const King = ({token}) => {
  const [isPopupOpenking, setIsPopupOpenking] = useState(false);
  const navigate = useNavigate()
  const [error, setError] = useState()
  
  const handleOpenPopupking = () => {
    setIsPopupOpenking(true);
    setError('')
  };

  const handleClosePopupking = () => {
    setIsPopupOpenking(false);
    setError('')
  };

  const handleSubmitFlagking = async (flag) => {

    flag = flag.trim()
    if(flag.length > 128){
      setError("Flag must contain 128 characters or less")
      return;
    }

    if(!flag){
      setError("Flag must not be empty")
      return;
    }

    try {
      const res = await api.post("/game/flags/submit/",
        {
          flag_code: flag,
        },
        {
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      )

      if(res.data.success){
        navigate("/")
        console.log('Flag submitted:', flag);
        alert(`Success! ${res.data.points_earned} points earned at ${res.data.stand}`);
      }else{
        setError(res.data.message)
        console.log("submittion failed: ", res.data.message)
      }
    } catch (error) {
      setError(error.response?.data?.message || "something went wrong")
      console.error("Submission failed:", error);
    }
    
    setIsPopupOpenking(false);
    
  };
  
  return (
    <div className="app">
      <button id='kingbtn' onClick={handleOpenPopupking}>
      king
      </button>
      <FlagPopupking
        isOpen={isPopupOpenking}
        onClose={handleClosePopupking}
        onSubmit={handleSubmitFlagking}
        error={error}
      />
    </div>
  );
}

export default King;

