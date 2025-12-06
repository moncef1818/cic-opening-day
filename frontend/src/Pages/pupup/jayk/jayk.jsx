
import React, { useState } from 'react';
import FlagPopupjayk from './FlagPopupjayk';
import './jayk.css'
import { useNavigate } from 'react-router-dom';
import api from '../../../Utils/AxiosConfig'; 

const Jayk = ({token}) => {
  const [isPopupOpenjayk, setIsPopupOpenjayk] = useState(false);
  const [error, setError] = useState('')
  const navigate = useNavigate()
  
  const handleOpenPopupjayk = () => {
    setIsPopupOpenjayk(true);
    setError('')
  };

  const handleClosePopupjayk = () => {
    setIsPopupOpenjayk(false);
    setError('')
  };

  const handleSubmitFlagjayk = async (flag) => {

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
    
    setIsPopupOpenjayk(false);
   
  };
  
  return (
    <div className="app">
      <button id='jaykbtn' onClick={handleOpenPopupjayk}>
        jayk
      </button>
      <FlagPopupjayk
        isOpen={isPopupOpenjayk}
        onClose={handleClosePopupjayk}
        onSubmit={handleSubmitFlagjayk}
        error={error}
      />
    </div>
  );
}

export default Jayk;



