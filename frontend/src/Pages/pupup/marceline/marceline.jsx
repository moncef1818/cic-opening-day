import React, { useState } from 'react';
import FlagPopupmarceline from './FlagPopupmarceline';
import './marceline.css'
import api from '../../../Utils/AxiosConfig'; 
import { useNavigate } from 'react-router-dom';


const Marceline = ({token}) => {
  const [isPopupOpenmarceline, setIsPopupOpenmarceline] = useState(false);
  const navigate = useNavigate()
  const [error, setError] = useState('')
  
  const handleOpenPopupmarceline = () => {
    setIsPopupOpenmarceline(true);
    setError('')
  };

  const handleClosePopupmarceline = () => {
    setIsPopupOpenmarceline(false);
    setError('')
  };

  const handleSubmitFlagmarceline = async (flag) => {

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
    
    setIsPopupOpenmarceline(false);
    
  };
  
  return (
    <div className="app">
      <button id='marcelinebtn' onClick={handleOpenPopupmarceline}>
         marceline
      </button>
      <FlagPopupmarceline
        isOpen={isPopupOpenmarceline}
        onClose={handleClosePopupmarceline}
        onSubmit={handleSubmitFlagmarceline}
        error={error}
      />
    </div>
  );
}

export default Marceline;