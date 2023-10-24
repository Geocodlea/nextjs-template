import { redirect } from "next/navigation";
import Image from "next/image";

import { authOptions } from "../../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import styles from "../../page.module.css";

import { Paper, Typography, Box } from "@mui/material";

import dbConnect from "/utils/dbConnect";
import User from "/models/User";
import ProfileForm from "./ProfileForm";
import DeleteAccount from "./DeleteAccount";

export default async function Profile() {
  const session = await getServerSession(authOptions);

  if (!session) redirect(`/`);

  await dbConnect();
  const user = await User.find({ _id: session.user.id });

  const handleDelete = async () => {
    "use server";

    await User.deleteOne({ _id: session.user.id });
    redirect(`/`);
  };

  return (
    <>
      <Paper
        elevation={24}
        className={styles.card}
        sx={{ maxWidth: "600px", marginBottom: "3rem" }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "-10rem",
          }}
        >
          <Box
            sx={{
              position: "relative",
              height: "300px",
              width: "300px",
              marginBottom: "3rem",
            }}
          >
            <Image
              alt="bg"
              src={session.user.image ? session.user.image : "/img/avatar.png"}
              fill
              sizes="(max-width: 768px) 100vw"
              style={{
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
          </Box>
        </Box>
        <Typography variant="h2">Profile</Typography>
        <ProfileForm
          user={{
            name: user[0].name,
            email: user[0].email,
            image: user[0].image,
          }}
        />

        <DeleteAccount handleDelete={handleDelete} />
      </Paper>
    </>
  );
}
