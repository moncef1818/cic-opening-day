
import React, { useState } from 'react';
import FlagPopupking from './FlagPopupking';
import './king.css'

const King = () => {
  const [isPopupOpenking, setIsPopupOpenking] = useState(false);
  
  const handleOpenPopupking = () => {
    setIsPopupOpenking(true);
  };

  const handleClosePopupking = () => {
    setIsPopupOpenking(false);
  };

  const handleSubmitFlagking = (flag) => {
    console.log('Flag submitted:', flag);
    setIsPopupOpenking(false);
    alert(`Flag submitted: ${flag}`);
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
      />
    </div>
  );
}

export default King;

