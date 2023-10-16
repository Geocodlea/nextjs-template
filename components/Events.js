import styles from "../app/page.module.css";
import { Box, Paper, Typography } from "@mui/material";

import dbConnect from "/utils/dbConnect";
import Event from "/models/Event";

import Image from "next/image";

const Events = async () => {
  await dbConnect();

  const events = await Event.find();

  return (
    <Box className={styles.grid}>
      {events.map((event) => (
        <Paper
          elevation={24}
          className={styles.card}
          key={event.id}
          style={{ margin: "10px", padding: 0, textAlign: "center" }}
        >
          <Box sx={{ position: "relative", height: "300px" }}>
            <Image
              alt="bg"
              src={`/uploads/events/${event.image}`}
              fill
              sizes="(max-width: 768px) 100vw"
              style={{
                objectFit: "cover",
              }}
            />
            <Typography
              variant="h3"
              color="grey.900"
              sx={{
                position: "absolute",
                width: "100%",
                padding: "1rem",
                backgroundColor: "rgba(var(--callout-rgb), 0.5)",
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
        </Paper>
      ))}
    </Box>
  );
};

export default Events;
