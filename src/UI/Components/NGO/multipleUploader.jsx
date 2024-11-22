import React, { useState } from 'react';
 // Add your CSS here or use inline styles

function MultipleImageUploader() {
  const [selectedImages, setSelectedImages] = useState([]);

  // Handle multiple image upload
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files); // Convert FileList to an array
    const imageUrls = files.map((file) => URL.createObjectURL(file)); // Create preview URLs for each file
    setSelectedImages((prevImages) => [...prevImages, ...imageUrls]); // Append new images to the existing ones
  };

  return (
    <div>
      <h2>Upload Images</h2>
      
      {/* "+" button to trigger file upload */}
      <div className="upload-container">
        <label htmlFor="file-input" className="upload-button">
          +
        </label>
        <input
          id="file-input"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          style={{ display: 'none' }}
        />
      </div>

      {/* Preview the uploaded images */}
      <div className="image-preview-container">
        {selectedImages.map((image, index) => (
          <div key={index} className="image-thumbnail">
            <img src={image} alt={`Uploaded Preview ${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MultipleImageUploader;
