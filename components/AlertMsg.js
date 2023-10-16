"use client";

import { Alert } from "@mui/material";
import { useState } from "react";

const AlertMsg = ({ alert }) => {
  //   const [alertPopup, setAlertPopup] = useState({
  //     text: alert?.text,
  //     severity: alert?.severity,
  //   });

  return (
    <>
      {alert.text && (
        <Alert
          onClose={() => {
            setAlertPopup({ text: "", severity: "" });
          }}
          severity={alert.severity}
        >
          {alert.text}
        </Alert>
      )}
    </>
  );
};

export default AlertMsg;
