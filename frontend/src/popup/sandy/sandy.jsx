
import React, { useState } from 'react';
import FlagPopupsandy from './FlagPopupsandy';
import './sandy.css'

const Sandy = () => {
  const [isPopupOpensandy, setIsPopupOpensandy] = useState(false);
  
  const handleOpenPopupsandy = () => {
    setIsPopupOpensandy(true);
  };

  const handleClosePopupsandy = () => {
    setIsPopupOpensandy(false);
  };

  const handleSubmitFlagsandy = (flag) => {
    console.log('Flag submitted:', flag);
    setIsPopupOpensandy(false);
    alert(`Flag submitted: ${flag}`);
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
      />
    </div>
  );
}

export default Sandy;

