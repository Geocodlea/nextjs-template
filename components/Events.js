import styles from "../app/page.module.css";
import { Box, Paper, Typography } from "@mui/material";

import dbConnect from "/utils/dbConnect";
import Event from "/models/Event";

import Image from "next/image";
import bg from "../public/img/bg.jpg";

const Events = async () => {
  await dbConnect();

  const events = await Event.find();

  console.log(events[0]);

  return (
    <Box className={styles.grid}>
      {events.map((event) => (
        <Paper
          elevation={24}
          className={styles.card}
          key={event.id}
          sx={{ margin: "10px" }}
        >
          <Image
            alt="bg"
            src={bg}
            placeholder="blur"
            fill
            style={{
              objectFit: "contain",
            }}
          />
          <Typography>{event.title}</Typography>
          <Typography>{event.description}</Typography>
          <Typography>{event.image}</Typography>
          <Typography>
            {event.date.toLocaleString("ro-RO", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Typography>
          <Typography>{event.type}</Typography>
        </Paper>
      ))}
    </Box>
  );
};

export default Events;
