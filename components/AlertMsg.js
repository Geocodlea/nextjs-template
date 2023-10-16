"use client";

import { useRouter } from "next/navigation";

import { Alert } from "@mui/material";

const AlertMsg = ({ alert }) => {
  const router = useRouter();

  return (
    <>
      {alert.text && (
        <Alert
          onClose={() => router.push("/", { scroll: false })}
          severity={alert.severity}
        >
          {alert.text}
        </Alert>
      )}
    </>
  );
};

export default AlertMsg;
