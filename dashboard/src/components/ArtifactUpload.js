import React, { useState } from "react";
import { uplaodArtifact } from "./Endpoints";

function ArtifactUpload() {
  const [file, setFile] = useState(null);
  const [filename, setfilename] = useState("Choose file");

  const handleFileChange = (event) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
      setfilename(event.target.files[0].name);
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      uplaodArtifact(formData);
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <div
        className="custom-file p-2 px-4 d-flex justify-content-between align-items-center rounded"
        style={{ border: "1px solid #ccc" }}
      >
        <input
          type="file"
          id="customFile"
          className="custom-file-input"
          onChange={handleFileChange}
        />
        {/* <label htmlFor="customFile" className="custom-file-label">
          {filename}
        </label> */}
        <input
          type="submit"
          value="Submit"
          className="btn btn-primary btn-block"
        />
      </div>
    </form>
  );
}

export default ArtifactUpload;
