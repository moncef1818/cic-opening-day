// lichhome.jsx - FIXED VERSION
import React, { useState } from 'react';
import FlagPopuplich from './FlagPopuplich';
import './lichhome.css'

const Lichhome = () => {
  const [isPopupOpenlich, setIsPopupOpenlich] = useState(false);
  
  const handleOpenPopuplich = () => {
    setIsPopupOpenlich(true);
  };

  const handleClosePopuplich = () => {
    setIsPopupOpenlich(false);
  };

  const handleSubmitFlaglich = (flag) => {
    console.log('Flag submitted:', flag);
    setIsPopupOpenlich(false);
    alert(`Flag submitted: ${flag}`);
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
      />
    </div>
  );
}

export default Lichhome;