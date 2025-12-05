import React, { useState } from 'react';
import FlagPopupmarceline from './FlagPopupmarceline';
import './marceline.css'

const Marceline = () => {
  const [isPopupOpenmarceline, setIsPopupOpenmarceline] = useState(false);
  
  const handleOpenPopupmarceline = () => {
    setIsPopupOpenmarceline(true);
  };

  const handleClosePopupmarceline = () => {
    setIsPopupOpenmarceline(false);
  };

  const handleSubmitFlagmarceline = (flag) => {
    console.log('Flag submitted:', flag);
    setIsPopupOpenmarceline(false);
    alert(`Flag submitted: ${flag}`);
  };
  
  return (
    <div className="app">
      <button id='marcelinebtn' onClick={handleOpenPopupmarceline}>
         
      </button>
      <FlagPopupmarceline
        isOpen={isPopupOpenmarceline}
        onClose={handleClosePopupmarceline}
        onSubmit={handleSubmitFlagmarceline}
      />
    </div>
  );
}

export default Marceline;