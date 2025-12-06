
import React, { useState } from 'react';
import FlagPopupcloud from './FlagPopupcloud';
import './cloud.css'
import api from '../../../Utils/AxiosConfig'; 
import { useNavigate } from 'react-router-dom';

const Cloud = ({token}) => {
  const [isPopupOpencloud, setIsPopupOpencloud] = useState(false);
  const [error, setError] = useState('')
  const navigate = useNavigate
  
  const handleOpenPopupcloud = () => {
    setIsPopupOpencloud(true);
    setError('')
  };

  const handleClosePopupcloud = () => {
    setIsPopupOpencloud(false);
    setError('')
  };

  const handleSubmitFlagcloud = async (flag) => {

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
            "Content-Type": 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      )

      if(res.data.success){
        navigate("/")
        alert(`Success! ${res.data.points_earned} points earned at ${res.data.stand}`)
      }else{
        setError(res.data.message)
        console.log("submittion failed: ", res.data.message)
      }
    } catch (error) {
      setError(error.response?.data?.message || "something went wrong")
      console.error("Submission failed:", error);
    }
    setIsPopupOpencloud(false);
  };
  
  return (
    <div className="app">
      <button id='cloudbtn' onClick={handleOpenPopupcloud}>
       cloud
      </button>
      <FlagPopupcloud
        isOpen={isPopupOpencloud}
        onClose={handleClosePopupcloud}
        onSubmit={handleSubmitFlagcloud}
        error={error}
      />
    </div>
  );
}

export default Cloud;

