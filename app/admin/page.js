import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import styles from "../page.module.css";

import { Paper, Typography } from "@mui/material";

import CreateEventForm from "./CreateEventForm";

export default async function Admin() {
  const session = await getServerSession(authOptions);

  if (session?.user.role !== "admin")
    return <h1 className="text-5xl">NOT ALLOWED !!!</h1>;

  return (
    <Paper elevation={24} className={styles.card} sx={{ maxWidth: "600px" }}>
      <Typography variant="h2">Create Event</Typography>
      <CreateEventForm />
    </Paper>
  );
}
