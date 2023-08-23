import React, { useState } from "react";
import { uplaodArtifact } from "./Endpoints";

function ArtifactUpload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      // uplaodArtifact(formData);
      for (const [key, value] of formData) {
        console.log(`${key}: ${value}`);
      }
    }
  };

  return (
    <div>
      <input type="file" name="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default ArtifactUpload;
