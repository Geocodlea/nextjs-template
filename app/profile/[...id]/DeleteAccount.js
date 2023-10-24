"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export default function DeleteAccount({ handleDelete }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button color="error" variant="contained" onClick={handleOpen}>
          Delete Account
        </Button>
      </Box>
      <Dialog disableScrollLock={true} open={open} onClose={handleClose}>
        <DialogTitle>Delete Account?</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            Are you sure you want to delete your account? There is no coming
            back from this, the account will be permanently deleted.
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
              handleDelete();
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
