import React, { useState } from 'react';
import FlagPopuplich from './FlagPopuplich';
import './lichhome.css'
import api from '../../../Utils/AxiosConfig'; 
import { useNavigate } from 'react-router-dom';

const Lichhome = ({token}) => {
  const [isPopupOpenlich, setIsPopupOpenlich] = useState(false);
  const navigate = useNavigate()
  const [error, setError] = useState('')
  
  const handleOpenPopuplich = () => {
    setIsPopupOpenlich(true);
    setError('')
  };

  const handleClosePopuplich = () => {
    setIsPopupOpenlich(false);
    setError('')
  };

  const handleSubmitFlaglich = async (flag) => {

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
    
    setIsPopupOpenlich(false);
    
  };
  
  return (
    <div className="app">
      <button id='lichbtn' onClick={handleOpenPopuplich}>
         lich
      </button>
      <FlagPopuplich
        isOpen={isPopupOpenlich}
        onClose={handleClosePopuplich}
        onSubmit={handleSubmitFlaglich}
        error={error}
      />
    </div>
  );
}

export default Lichhome;