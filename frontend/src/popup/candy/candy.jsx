
import React, { useState } from 'react';
import FlagPopupcandy from './FlagPopupcandy';
import './candy.css'

const Candy = () => {
  const [isPopupOpencandy, setIsPopupOpencandy] = useState(false);
  
  const handleOpenPopupcandy = () => {
    setIsPopupOpencandy(true);
  };

  const handleClosePopupcandy = () => {
    setIsPopupOpencandy(false);
  };

  const handleSubmitFlagcandy = (flag) => {
    console.log('Flag submitted:', flag);
    setIsPopupOpencandy(false);
    alert(`Flag submitted: ${flag}`);
  };
  
  return (
    <div className="app">
      <button id='candybtn' onClick={handleOpenPopupcandy}>
        
      </button>
      <FlagPopupcandy
        isOpen={isPopupOpencandy}
        onClose={handleClosePopupcandy}
        onSubmit={handleSubmitFlagcandy}
      />
    </div>
  );
}

export default Candy;

