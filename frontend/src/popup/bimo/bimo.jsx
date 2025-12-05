
import React, { useState } from 'react';
import FlagPopupbimo from './FlagPopupbimo';
import './bimo.css'

const Bimo = () => {
  const [isPopupOpenbimo, setIsPopupOpenbimo] = useState(false);
  
  const handleOpenPopupbimo = () => {
    setIsPopupOpenbimo(true);
  };

  const handleClosePopupbimo = () => {
    setIsPopupOpenbimo(false);
  };

  const handleSubmitFlagbimo = (flag) => {
    console.log('Flag submitted:', flag);
    setIsPopupOpenbimo(false);
    alert(`Flag submitted: ${flag}`);
  };
  
  return (
    <div className="app">
      <button id='bimobtn' onClick={handleOpenPopupbimo}>
        bimo
      </button>
      <FlagPopupbimo
        isOpen={isPopupOpenbimo}
        onClose={handleClosePopupbimo}
        onSubmit={handleSubmitFlagbimo}
      />
    </div>
  );
}

export default Bimo;

