/* Reset and base styles */
*, *::before, *::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: 'Poppins', sans-serif;
  background: linear-gradient(135deg, #f9f9f9, #e0f7fa);
  color: #333;
}
.container {
  display: grid;
  grid-template-columns: 1fr 300px;
  grid-template-rows: auto 80px;
  grid-template-areas: 
    "image sidebar"
    "slider slider";
  height: 100vh;
  width: 100vw;
  gap: 20px;
  padding: 20px;
  background: peachpuff;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
}

/* Main image area */
.main-image {
  grid-area: image;
  background-color: whitesmoke;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
}

/* Uploaded image styling */
.main-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 16px;
  transition: filter 0.3s ease, transform 0.3s ease;
  transform-origin: center center;
}

/* Sidebar styles */
.sidebar {
  grid-area: sidebar;
  background-color: whitesmoke;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 12px;
  overflow-y: auto;
}

/* Sidebar item buttons */
.sidebar-item {
  cursor: pointer;
  border: none;
  outline: none;
  background-color: #31ff87;
  color: white;
  padding: 12px 16px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
  position: relative;
}

.sidebar-item:hover, .sidebar-item:focus {
  background-color: #00ddff;
  color: white;
}

.sidebar-item.active {
  background-color: #00ddff;
  color: white;
}

/* Remove default after border */
.sidebar-item::after {
  content: none;
}

/* Slider container */
.slider-container {
  grid-area: slider;
  padding: 20px;
  background-color: whitesmoke;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Custom slider styles */
.slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 12px;
  border-radius: 12px;
  background: #626262;
  outline: none;
  cursor: pointer;
  transition: background 0.3s ease;
}



.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #c3c3c3;
  cursor: pointer;
  transition: background 0.3s ease;
  border: none;
  margin-top: -8px; 
}

.slider::-moz-range-thumb {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #c3c3c3;
  cursor: pointer;
  border: none;
  transition: background 0.3s ease;
}

/* File input styling */
input[type="file"] {
  grid-column: 1 / 3;
  justify-self: center;
  padding: 10px 20px;
  border-radius: 12px;
  background-color: #ff4e4ed3;
  color: white;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s ease;
  margin-bottom: 10px;
}

/* Download button styling */
.download-button {
  grid-column: 1 / 3;
  justify-self: center;
  padding: 10px 20px;
  border-radius: 12px;
  background-color: #ff4e4ed3;
  color: white;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s ease;
  margin-bottom: 10px;
}

/* Rotation angle text */
.rotation-angle {
  grid-column: 1 / 3;
  text-align: center;
  color: #666;
  font-weight: 600;
  font-size: 1rem;
  margin-top: 10px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto auto;
    grid-template-areas:
      "image"
      "slider"
      "sidebar"
      "rotation";
    padding: 10px;
  }

  .sidebar {
    flex-direction: row;
    overflow-x: auto;
    padding: 10px;
    border-radius: 12px;
    box-shadow: none;
  }

  .sidebar-item {
    flex: 0 0 auto;
    margin-right: 10px;
    border-radius: 8px;
    padding: 8px 12px;
    font-size: 0.9rem;
  }

  .slider-container {
    padding: 10px;
    border-radius: 12px;
    box-shadow: none;
  }

  input[type="file"] {
    width: 100%;
    margin-bottom: 15px;
  }
}