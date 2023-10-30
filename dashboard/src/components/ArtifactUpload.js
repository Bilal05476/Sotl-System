import React, { useState } from "react";
import { uplaodArtifact } from "./Endpoints";
import { info } from "../constants/Toasters";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

function ArtifactUpload({ postId, setObs, observationsId }) {
  const [file, setFile] = useState("");

  const handleFileChange = (event) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  // const handleUpload = (e) => {
  //   e.preventDefault();
  //   if (file) {
  //     info("Artifact Uploading...");

  //     const formData = new FormData();
  //     formData.append("file", file);
  //     uplaodArtifact(formData, postId, setObs, observationsId, setFile);
  //   }
  // };

  const handleUpload = async (e) => {
    e.preventDefault();
    info("Uploading...");

    if (file) {
      const name = file.name;
      const type = file.type;
      const storageRef = ref(storage, "artifacts/" + file.name);
      try {
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        uplaodArtifact(
          url,
          name,
          type,
          postId,
          setObs,
          observationsId,
          setFile
        );
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
      console.warn("No file selected");
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
