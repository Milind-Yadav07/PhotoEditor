import React from 'react';

// Slider component to render a range input slider
// Props:
// - min: minimum value of the slider
// - max: maximum value of the slider
// - value: current value of the slider
// - handleChange: callback function to handle value changes
function Slider(props) {
  return (
    <div className="slider-container">
      <input
        type="range"
        className="slider"
        min={props.min}
        max={props.max}
        value={props.value}
        onChange={props.handleChange}
      />
    </div>
  );
}

export default Slider;
