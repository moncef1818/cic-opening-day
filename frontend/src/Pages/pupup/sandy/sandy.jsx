import React, { useState } from 'react';
import FlagPopupsandy from './FlagPopupsandy';
import './sandy.css'
import api from '../../../Utils/AxiosConfig'; 
import { useNavigate } from 'react-router-dom';

const Sandy = ({token}) => {
  const [isPopupOpensandy, setIsPopupOpensandy] = useState(false);
  const navigate = useNavigate()
  const [error, setError] = useState('')
  
  const handleOpenPopupsandy = () => {
    setIsPopupOpensandy(true);
    setError('')
  };

  const handleClosePopupsandy = () => {
    setIsPopupOpensandy(false);
    setError('')
  };

  const handleSubmitFlagsandy = async (flag) => {

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
    
    setIsPopupOpensandy(false);
    
  };
  
  return (
    <div className="app">
      <button id='sandybtn' onClick={handleOpenPopupsandy}>
      sandy
      </button  >
      <FlagPopupsandy
        isOpen={isPopupOpensandy}
        onClose={handleClosePopupsandy}
        onSubmit={handleSubmitFlagsandy}
        error={error}
      />
    </div>
  );
}

export default Sandy;

