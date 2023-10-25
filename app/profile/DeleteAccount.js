"use client";

import { useRouter } from "next/navigation";

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

import AlertMsg from "/components/AlertMsg";

import { useSession } from "next-auth/react";

export default function DeleteAccount() {
  const [alert, setAlert] = useState({ text: "", severity: "" });
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const { data: session, update } = useSession();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        // Check for non-successful HTTP status codes
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setAlert({ text: "Event deleted successfully", severity: "success" });
    } catch (error) {
      // Handle any errors that occurred during the fetch operation
      setAlert({ text: "Error deleting event", severity: "error" });
    }

    update();
    router.push("/");
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
              handleDelete(session.user.id);
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <AlertMsg alert={alert} />
    </div>
  );
}
