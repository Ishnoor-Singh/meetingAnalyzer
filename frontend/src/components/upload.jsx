import React, {useCallback} from "react";
import "./upload.css";
import cloud from "../cloud_upload.png";
import {useDropzone} from 'react-dropzone';



function MyDropzone() {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} className="dropzone">
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag and drop you video here,<br />or use the button below</p>
      }
    </div>
  )
}

export default function Upload(){

  
    return (
      <>
        <div className="Upload">
          <h1 className="header">Viber</h1>
          <img src={cloud} alt="Cloud" className="cloud" />
          <br />
          <MyDropzone className="dropzone"></MyDropzone>
          <br /><br /><br />
          <button className="upload_button">
            View report
          </button>
        </div>
      </>
    );
  

}
