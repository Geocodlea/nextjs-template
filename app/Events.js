import { authOptions } from "/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import Image from "next/image";
import { revalidatePath } from "next/cache";
import Link from "next/link";

import styles from "../app/page.module.css";
import { Box, Paper, Typography, Button } from "@mui/material";

import dbConnect from "/utils/dbConnect";
import Event from "/models/Event";
import DeleteEvent from "./admin/DeleteEvent";
import AlertMsg from "../components/AlertMsg";

import { redirect } from "next/navigation";

import { Storage } from "@google-cloud/storage";

// Set up Google Cloud Storage client
const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  credentials: {
    client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY.replace(/\\n/g, "\n"),
  },
});

// Google Cloud Storage bucket name
const bucketName = "geo_bucket_1";
const bucket = storage.bucket(bucketName);

const Events = async ({ searchParams }) => {
  const session = await getServerSession(authOptions);
  const alert = { text: searchParams.text, severity: searchParams.severity };

  await dbConnect();
  const events = await Event.find();

  const handleDelete = async (id) => {
    "use server";

    try {
      // Find gcs event image and delete it, before deleting the event
      const event = await Event.findOne({ _id: id });

      // Trim de full URL, to get only the bucket
      const imgURL = event.image.slice(44);

      const gcsObject = bucket.file(imgURL);
      await gcsObject.delete();

      await Event.deleteOne({ _id: id });
    } catch (error) {
      redirect(`/?text=Error deleting event&severity=error`);
    }

    revalidatePath("/");
    redirect(`/?text=Event deleted successfully&severity=success`);
  };

  return (
    <>
      <Box className={styles.grid}>
        {events.map((event) => (
          <Paper
            elevation={24}
            className={styles.card}
            key={event.id}
            style={{
              padding: 0,
              textAlign: "center",
            }}
          >
            <Box sx={{ position: "relative", height: "300px" }}>
              <Image
                alt="bg"
                src={event.image}
                fill
                sizes="(max-width: 768px) 100vw"
                style={{
                  objectFit: "cover",
                }}
              />
              <Typography
                variant="h3"
                color="grey.100"
                sx={{
                  position: "absolute",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                  fontWeight: "bold",
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                  textShadow: "3px 3px 5px rgba(0, 0, 0, 0.7)",
                }}
              >
                {event.title}
              </Typography>
            </Box>
            <Box className={styles.description}>
              <p>{event.description}</p>
            </Box>
            <Typography className={styles.code}>
              {event.date.toLocaleString("ro-RO", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Typography>
            <Typography variant="overline" gutterBottom>
              {event.type}
            </Typography>
            {session?.user.role === "admin" && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  padding: "1rem",
                }}
              >
                <Link href={`/admin/${event.id}`}>
                  <Button variant="contained" className="btn btn-primary">
                    Edit Event
                  </Button>
                </Link>

                <DeleteEvent handleDelete={handleDelete} id={event.id} />
              </Box>
            )}
          </Paper>
        ))}
      </Box>
      <AlertMsg alert={alert} />
    </>
  );
};

export default Events;
