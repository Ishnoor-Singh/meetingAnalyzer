import React, { useState } from "react";
import { DropzoneDialog } from "material-ui-dropzone";
import { DropzoneArea } from "material-ui-dropzone";
import Button from "@material-ui/core/Button";
import { CloudUpload } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import './upload.css';

const base = "http://localhost:5000/";


const useStyles = makeStyles((theme) => ({
  upload: {
    position: "relative",
    top: 624,
    width: 184,
  },
}));

export default function Upload(props) {
  const classes = useStyles(props);

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = (files) => {
    setOpen(false);

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
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      {/* <Button
        className={classes.upload}
        variant="contained"
        color="primary"
        startIcon={<CloudUpload />}
        onClick={handleOpen.bind(this)}
      >
        UPLOAD
      </Button> */}

      <div id="dropzone">
        <DropzoneArea
          open={true}
          onSave={handleSave.bind(this)}
          filesLimit={1}
          maxFileSize={50000000} // 50 MB
          acceptedFiles={["video/*"]}
          showPreviews={true}
          onClose={handleClose.bind(this)}
        />
      </div>
    </div>
  );
}
