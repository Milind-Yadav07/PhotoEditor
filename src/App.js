import React, { useState } from 'react';
import './App.css';
import Slider from './Slider';
import SidebarItem from './SidebarItem';

// Default filter and transform options with their ranges and units
const defaultOptions = [
  {
    name: 'Brightness',
    property: 'brightness',
    value: 100,
    min: 0,
    max: 200,
    unit: '%',
  },
  {
    name: 'Contrast',
    property: 'contrast',
    value: 100,
    min: 0,
    max: 200,
    unit: '%',
  },
  {
    name: 'Saturation',
    property: 'saturate',
    value: 100,
    min: 0,
    max: 200,
    unit: '%',
  },
  {
    name: 'Grayscale',
    property: 'grayscale',
    value: 0,
    min: 0,
    max: 100,
    unit: '%',
  },
  {
    name: 'Sepia',
    property: 'sepia',
    value: 0,
    min: 0,
    max: 100,
    unit: '%',
  },
  {
    name: 'Hue Rotate',
    property: 'hue-rotate',
    value: 0,
    min: 0,
    max: 360,
    unit: 'deg',
  },
  {
    name: 'Blur',
    property: 'blur',
    value: 0,
    min: 0,
    max: 20,
    unit: 'px',
  },
  {
    name: 'Rotate',
    property: 'rotate',
    value: 0,
    min: 0,
    max: 360,
    unit: 'deg',
  },
];

function App() {
  // State for filter options, selected filter index, uploaded image source, and image display size
  const [options, setOptions] = useState(defaultOptions);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [imageSrc, setImageSrc] = useState(null);
  const [imageSize, setImageSize] = useState({ width: 400, height: 400 });

  const selectedOption = options[selectedIndex];

  // Update the value of the selected filter option when slider changes
  function onSliderChange(e) {
    const newValue = e.target.value;
    const newOptions = options.map((option, index) => {
      if (index === selectedIndex) {
        return { ...option, value: newValue };
      }
      return option;
    });
    setOptions(newOptions);
  }

  // Construct CSS filter and transform styles based on current options
  function getFilterStyle() {
    let filterString = '';
    options.forEach(option => {
      if (option.property !== 'rotate') {
        filterString += `${option.property}(${option.value}${option.unit}) `;
      }
    });
    const rotateOption = options.find(opt => opt.property === 'rotate');
    const rotateValue = rotateOption ? rotateOption.value : 0;
    return {
      filter: filterString.trim(),
      transform: `rotate(${rotateValue}deg)`,
    };
  }

  // Handle image file upload and create a URL for preview
  function onImageUpload(e) {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageSrc(url);
    }
  }

  // Adjust image display size based on natural image dimensions and window size
  function onImageLoad(e) {
    const img = e.target;
    let newWidth = img.naturalWidth + 0.5 * img.naturalHeight;
    let newHeight = 1.5 * img.naturalHeight;

    const maxWidth = window.innerWidth * 0.8;
    const maxHeight = window.innerHeight * 0.8;

    const widthRatio = maxWidth / newWidth;
    const heightRatio = maxHeight / newHeight;
    const scale = Math.min(widthRatio, heightRatio, 1);

    newWidth = newWidth * scale;
    newHeight = newHeight * scale;

    setImageSize({ width: newWidth, height: newHeight });
  }

  // Create a canvas, apply filters and rotation, and trigger download of the edited image
  function onDownloadClick() {
    if (!imageSrc) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageSrc;

    img.onload = function () {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const width = img.naturalWidth;
      const height = img.naturalHeight;
      canvas.width = width;
      canvas.height = height;

      let filterStr = '';
      options.forEach(option => {
        if (option.property !== 'rotate') {
          filterStr += `${option.property}(${option.value}${option.unit}) `;
        }
      });
      ctx.filter = filterStr.trim();

      const rotateOption = options.find(opt => opt.property === 'rotate');
      const rotateValue = rotateOption ? rotateOption.value : 0;

      // Translate to center for rotation, then rotate and translate back
      ctx.translate(width / 2, height / 2);
      ctx.rotate((rotateValue * Math.PI) / 180);
      ctx.translate(-width / 2, -height / 2);

      ctx.drawImage(img, 0, 0, width, height);

      // Convert canvas to blob and trigger download
      canvas.toBlob(function (blob) {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'edited-image.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, 'image/png');
    };
  }

  return (
    <div className="container">
      <div
        className="main-image"
        style={{
          ...getFilterStyle(),
          width: imageSize.width + 'px',
          height: imageSize.height + 'px',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {imageSrc && (
          <img
            src={imageSrc}
            alt="Uploaded"
            onLoad={onImageLoad}
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', transformOrigin: 'center' }}
          />
        )}
      </div>
      <div className="sidebar">
        {/* Image upload input */}
        <input type="file" accept="image/*" onChange={onImageUpload} style={{ marginBottom: '10px' }} />
        {/* Button to download the edited image */}
        <button className="download-button" onClick={onDownloadClick}>
          Download Image
        </button>
        {/* Sidebar items for each filter option */}
        {options.map((option, index) => (
          <SidebarItem
            key={index}
            name={option.name}
            active={index === selectedIndex}
            handleClick={() => setSelectedIndex(index)}
          />
        ))}
      </div>
      {/* Slider to adjust the selected filter option */}
      <Slider
        min={selectedOption.min}
        max={selectedOption.max}
        value={selectedOption.value}
        handleChange={onSliderChange}
      />
      {/* Display rotation angle if rotate option is selected */}
      {selectedOption.property === 'rotate' && (
        <div className="rotation-angle">Rotation Angle: {selectedOption.value}°</div>
      )}
    </div>
  );
}

export default App;
