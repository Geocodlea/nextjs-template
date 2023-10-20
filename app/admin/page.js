import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import styles from "../page.module.css";

import { Paper, Typography } from "@mui/material";

import CreateEventForm from "./CreateEventForm";
import EditableDataGrid from "@/components/EditableDataGrid";

import dbConnect from "/utils/dbConnect";
import User from "/models/User";

export default async function Admin() {
  const session = await getServerSession(authOptions);

  if (session?.user.role !== "admin")
    return <h1 className="text-5xl">NOT ALLOWED !!!</h1>;

  await dbConnect();
  const users = await User.find();

  const filteredUsers = users.map((user) => ({
    name: user.name,
    email: user.email,
    role: user.role,
  }));

  const columnsData = [
    { field: "name", headerName: "Name", width: 200, editable: true },
    { field: "email", headerName: "Email", width: 200, editable: true },
    { field: "role", headerName: "Role", width: 150, editable: true },
  ];

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
        <EditableDataGrid
          columnsData={columnsData}
          data={filteredUsers}
          apiURL={"users"}
          uniqueColumn={"email"}
          alertText={"user"}
        />
      </Paper>
    </>
  );
}
