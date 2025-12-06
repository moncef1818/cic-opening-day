
import React, { useState } from 'react';
import FlagPopupcandy from './FlagPopupcandy';
import './candy.css'
import api from '../../../Utils/AxiosConfig'; 
import { useNavigate } from 'react-router-dom';


const Candy = ({token}) => {
  const [isPopupOpencandy, setIsPopupOpencandy] = useState(false);
  const [error, setError] = useState('')
  const navigate = useNavigate()
  
  const handleOpenPopupcandy = () => {
    setIsPopupOpencandy(true);
    setError('')
  };

  const handleClosePopupcandy = () => {
    setIsPopupOpencandy(false);
    setError('')
  };

  const handleSubmitFlagcandy = async (flag) => {

    flag = flag.trim()
    console.log("flag:", flag);
    console.log("Flag length:", flag.length);
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
      console.log("Error response:", error.response.data);
    }

    setIsPopupOpencandy(false); 
  };
  
  return (
    <div className="app">
      <button id='candybtn' onClick={handleOpenPopupcandy}>
        candy
      </button>
      <FlagPopupcandy
        isOpen={isPopupOpencandy}
        onClose={handleClosePopupcandy}
        onSubmit={handleSubmitFlagcandy}
        error={error}
      />
    </div>
  );
}

export default Candy;

