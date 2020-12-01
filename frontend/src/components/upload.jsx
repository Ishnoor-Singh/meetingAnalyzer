import React, { useState } from "react";
import { DropzoneDialog } from "material-ui-dropzone";
import Button from "@material-ui/core/Button";
import { CloudUpload } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
const base = 'http://localhost:5000/'
const useStyles = makeStyles((theme) => ({
  upload: {
    position: "relative",
    top: 624,
  },
}));

export default function Upload(props) {
<<<<<<< HEAD
<<<<<<< HEAD
  const classes = useStyles(props);

=======
>>>>>>> Turn upload into function component
=======
  const classes = useStyles(props);

>>>>>>> Add upload button to sidebar
  const [open, setOpen] = useState(false);
  const [video, setVideo] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = (files) => {
    setVideo(files);
    setOpen(false);

    console.log(files); // TODO: remove


    // code to post the file to the backend
    const formdata = new FormData();
    formdata.append('file', files[0])
    fetch(`${base}v1/s3/saveFile`, {
      method: 'POST',
      body: formdata,
    }).then(res => {
      return(res.json());
    }).then(body =>{
      window.location = `/dashboard/${body.msg.id}`
      console.log(body)
    }).catch(err => {
      console.error(err)
    })
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Button
        className={classes.upload}
        variant="contained"
        color="primary"
        startIcon={<CloudUpload />}
        onClick={handleOpen.bind(this)}
      >
        UPLOAD
      </Button>
      <DropzoneDialog
        open={open}
        onSave={handleSave.bind(this)}
        filesLimit={1}
        maxFileSize={5000000} // 5 MB
        acceptedFiles={["image/*"]}
        showPreviews={true}
        onClose={handleClose.bind(this)}
      />
    </div>
  );
}