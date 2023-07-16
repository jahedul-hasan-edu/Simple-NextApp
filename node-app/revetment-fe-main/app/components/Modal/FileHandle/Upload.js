// components/Upload.js
"use client";
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const Upload = () => {
  const onDrop = useCallback((acceptedFiles) => {
    console.log("Files Uploaded Demo")
    // const file = acceptedFiles[0];
    // const formData = new FormData();
    // formData.append('file', file);

    // fetch('/api/upload', {
    //   method: 'POST',
    //   body: formData,
    // }).then(response => {
    //     if (response.ok) {
    //         console.log("Response from file")
    //         console.log(response)
    //     } else {
    //         console.log("Response not okay")
    //         console.log(response)
    //     }
    // })
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} accept=".shp,.kml" />
      {isDragActive ? <p>Drop the file here ...</p> : <p>Drag 'n' drop or click to select files</p>}
    </div>
  );
};

export default Upload;
