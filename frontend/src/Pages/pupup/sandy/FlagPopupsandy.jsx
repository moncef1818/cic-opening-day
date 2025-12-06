
import React, { useState } from 'react';
import './FlagPopupsandy.css';
import { TiArrowRightOutline } from "react-icons/ti";

const FlagPopupsandy = ({ isOpen, onClose, onSubmit, error }) => {
  const [flag, setFlag] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (flag.trim()) {
      onSubmit(flag);
      setFlag('');
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="popup-overlay" onClick={onClose} />
      <div className="popup-container">
        <div className="popup-content">
          <img id='img-sandy' src="sandyhome.png" alt="sandy" />
          <button className="close-btn" onClick={onClose}>
            <span>×</span>
          </button>
          <img id='ciclogo' src="cic-logo.png" alt="cic" />
          <img id='sandy-char' src="sandy.png" alt="sandy character" />
          
          <form className="flag-form" onSubmit={handleSubmit}>
            <input id='sandy-input'
              type="text"
              value={flag}
              onChange={(e) => setFlag(e.target.value)}
              placeholder="SUBMIT YOUR FLAG"
              className="flag-input"
              autoFocus
            />
            {error && <div className="error-message">{error}</div>}
            <button type="submit" className="submit-btn">
              Submit
              <div className="arrow-icon">
                <TiArrowRightOutline />
              </div>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FlagPopupsandy;