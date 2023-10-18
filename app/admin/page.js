import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import styles from "../page.module.css";

import { Paper, Typography } from "@mui/material";

import CreateEventForm from "./CreateEventForm";
import Users from "./Users";

import dbConnect from "/utils/dbConnect";
import User from "/models/User";

export default async function Admin() {
  const session = await getServerSession(authOptions);

  if (session?.user.role !== "admin")
    return <h1 className="text-5xl">NOT ALLOWED !!!</h1>;

  await dbConnect();
  const users = await User.find();

  return (
    <>
      <Paper
        elevation={24}
        className={styles.card}
        sx={{ maxWidth: "600px", marginBottom: "3rem" }}
      >
        <Typography variant="h2">Create Event</Typography>
        <CreateEventForm />
      </Paper>
      <Paper elevation={24} className={styles.card} sx={{ width: "100%" }}>
        <Typography variant="h2">Users</Typography>
        <Users users={JSON.stringify(users)} />
      </Paper>
    </>
  );
}
