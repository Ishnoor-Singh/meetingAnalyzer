import React, { useState } from "react";
import { DropzoneDialog } from "material-ui-dropzone";
import Button from "@material-ui/core/Button";
import { CloudUpload } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  upload: {
    position: "relative",
    top: 624,
  },
}));

export default function Upload(props) {
  const classes = useStyles(props);

  const [open, setOpen] = useState(false);
  const [video, setVideo] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = (files) => {
    setVideo(files);
    setOpen(false);

    console.log(video); // TODO: remove
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
