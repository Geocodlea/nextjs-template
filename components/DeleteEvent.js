"use client";

import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function DeleteEvent({ handleDelete, id }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button color="error" variant="contained" onClick={handleOpen}>
        Delete Event
      </Button>
      <Dialog
        disableScrollLock={true}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Event?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the event? There is no coming back
            from this, the event will be permanently deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => {
              handleClose();
              handleDelete(id);
            }}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
