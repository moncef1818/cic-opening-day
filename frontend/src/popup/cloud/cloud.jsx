
import React, { useState } from 'react';
import FlagPopupcloud from './FlagPopupcloud';
import './cloud.css'

const Cloud = () => {
  const [isPopupOpencloud, setIsPopupOpencloud] = useState(false);
  
  const handleOpenPopupcloud = () => {
    setIsPopupOpencloud(true);
  };

  const handleClosePopupcloud = () => {
    setIsPopupOpencloud(false);
  };

  const handleSubmitFlagcloud = (flag) => {
    console.log('Flag submitted:', flag);
    setIsPopupOpencloud(false);
    alert(`Flag submitted: ${flag}`);
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
      />
    </div>
  );
}

export default Cloud;

