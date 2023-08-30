import React, { useState } from "react";
import { uplaodArtifact } from "./Endpoints";

function ArtifactUpload({ postId, setObs, observationsId }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      uplaodArtifact(formData, postId, setObs, observationsId, setFile);
    }
  };

  return (
    <form onSubmit={handleUpload} className="w-100">
      <div
        className="custom-file p-2 d-flex justify-content-between align-items-center rounded"
        style={{ border: "1px solid #ccc" }}
      >
        <input
          type="file"
          id="customFile"
          className="custom-file-input"
          onChange={handleFileChange}
        />

        <input
          type="submit"
          value="Upload"
          className="btn btn-primary btn-block"
          disabled={file ? false : true}
        />
      </div>
    </form>
  );
}

export default ArtifactUpload;
