import React, { useState } from 'react';
import './ToggleSwitch.css'; // Path to your CSS file

function ToggleSwitch() {
  const [selectedOption, setSelectedOption] = useState('Day');

  return (
    <div className="toggle-switch">
      <button
        className={`toggle-option ${selectedOption === 'Day' ? 'selected' : ''}`}
        onClick={() => setSelectedOption('Day')}
      >
        Day
      </button>
      <button
        className={`toggle-option ${selectedOption === 'Week' ? 'selected' : ''}`}
        onClick={() => setSelectedOption('Week')}
      >
        Week
      </button>
      <button
        className={`toggle-option ${selectedOption === 'Month' ? 'selected' : ''}`}
        onClick={() => setSelectedOption('Month')}
      >
        Month
      </button>
    </div>
  );
}

export default ToggleSwitch;
