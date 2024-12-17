import React, { useState, useEffect } from "react";

function UploadImage(props) {
  const [file, setFile] = useState(null);

  // Load the image from local storage on initial render
  useEffect(() => {
    const storedImage = localStorage.getItem("imageData");
    if (storedImage) {
      setFile(storedImage);
    }
  }, []);

  function handleChange(e) {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileUrl = URL.createObjectURL(selectedFile);
      localStorage.setItem("imageData", fileUrl); // Store in localStorage
      setFile(fileUrl); // Set the file URL to state
    }
  }

  function handleRemove() {
    setFile(null);
    localStorage.removeItem("imageData"); // Remove image from localStorage
  }

  return (
    <div className="App">
      {/* Conditionally render the "Choose File" input */}
      {!file && (
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          style={{ marginBottom: "10px", marginLeft: "90px" }}
        />
      )}

      {/* Display the uploaded image */}
      {file && (
        <>
          <img
            src={file}
            alt="Uploaded Preview"
            style={{ height: "227px", width: "232px", objectFit: "cover" }}
          />
          <br />
          <button

            onClick={handleRemove}
            className="btn btn-danger mt-2"
            style={{ borderRadius: "5px" }}
          >
            Remove Image
          </button>
        </>
      )}
    </div>
  );
}

export default UploadImage;
