import React, { useState } from "react";
import { DropzoneDialog } from "material-ui-dropzone";
import Button from "@material-ui/core/Button";

export default function Upload(props) {
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
      <Button onClick={handleOpen.bind(this)}>Add Video</Button>
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
