import React, { useState } from "react";
import { DropzoneDialog } from "material-ui-dropzone";
import { DropzoneArea } from "material-ui-dropzone";
import Button from "@material-ui/core/Button";
import { CloudUpload } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import "./upload.css";

const base = "http://localhost:5000/";

const useStyles = makeStyles((theme) => ({
  footnote: {
    position: "fixed",
    bottom: 8,
  },
}));

/**
 * The Upload component is the first page that the user sees when first visiting the website.
 * It shows a DropzoneDialog component imported from material-ui-dropzone which is able to
 * take exactly one video file.
 */
export default function Upload(props) {
  const classes = useStyles(props);

  /**
   * To send the video file to the backend API, the Upload component does a POST request
   * to the endpoint /v1/s3/saveFile. For the purpose of the demo, we are running the
   * API server locally and we’re using http://localhost:5000/ as the base URL.
   */
  const handleSave = (files) => {
    if (files.length > 0) {
      console.log(files); // TODO: remove

      // code to post the file to the backend
      const formdata = new FormData();
      formdata.append("file", files[0]);
      fetch(`${base}v1/s3/saveFile`, {
        method: "POST",
        body: formdata,
      })
        .then((res) => {
          return res.json();
        })
        .then((body) => {
          window.location = `/dashboard/${body.msg.id}`;
          console.log(body);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <div data-testid="upload">
      <h4>Welcome to Viber, an online meeting analysis tool</h4>
      <h3>Upload a meeting recording below to get started!</h3>
      <div id="dropzone">
        <DropzoneArea
          filesLimit={1}
          maxFileSize={500000000000} // 50 MB
          acceptedFiles={["video/*"]}
          showPreviews={true}
          showPreviewsInDropzone={false}
          onChange={(files) => handleSave(files)}
        />
      </div>
      <h5 className={classes.footnote}>
        By: Andrew Battat, Francesco Colonnese, Ashkan Faghihi, Dominic Loftus, Juan Carlo Magat, and Ishnoor Singh
      </h5>
    </div>
  );
}
