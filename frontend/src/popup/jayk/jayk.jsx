
import React, { useState } from 'react';
import FlagPopupjayk from './FlagPopupjayk';
import './jayk.css'

const Jayk = () => {
  const [isPopupOpenjayk, setIsPopupOpenjayk] = useState(false);
  
  const handleOpenPopupjayk = () => {
    setIsPopupOpenjayk(true);
  };

  const handleClosePopupjayk = () => {
    setIsPopupOpenjayk(false);
  };

  const handleSubmitFlagjayk = (flag) => {
    console.log('Flag submitted:', flag);
    setIsPopupOpenjayk(false);
    alert(`Flag submitted: ${flag}`);
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
      />
    </div>
  );
}

export default Jayk;



