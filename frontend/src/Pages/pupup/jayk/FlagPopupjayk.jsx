import React, { useState } from 'react';
import './FlagPopupjayk.css';
import { TiArrowRightOutline } from "react-icons/ti";

const FlagPopupjayk = ({ isOpen, onClose, onSubmit, error }) => {
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
          <img id='img-jayk' src="jaykhome.png" alt="jayk" />
          <button className="close-btn" onClick={onClose}>
            <span>×</span>
          </button>
          <img id='ciclogo' src="cic-logo.png" alt="cic" />
          <img id='jayk-char' src="jayk.png" alt="jayk character" />
          
          <form className="flag-form" onSubmit={handleSubmit}>
            <input id='jayk-input'
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

export default FlagPopupjayk;
