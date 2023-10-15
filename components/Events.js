import styles from "../app/page.module.css";
import { Box, Paper, Typography } from "@mui/material";

import dbConnect from "/utils/dbConnect";
import Event from "/models/Event";

import Image from "next/image";

const Events = async () => {
  await dbConnect();

  const events = await Event.find();

  console.log(events[0]);

  return (
    <Box className={styles.grid}>
      {events.map((event, index) => (
        <Paper
          elevation={24}
          className={styles.card}
          key={event.id}
          style={{ margin: "10px", padding: 0 }}
        >
          <Box sx={{ position: "relative", height: "300px" }}>
            <Image
              alt="bg"
              src={`/test/bg${index}.jpg`}
              fill
              sizes="(max-width: 768px) 100vw"
              style={{
                objectFit: "cover",
              }}
            />
            {/* <Paper
          elevation={24}
          className={styles.card}
          key={event.id}
          sx={{ margin: "10px" }}
        >
          <Image
            alt="bg"
            src={`/test/bg${index}.jpg`}
            width={500}
            height={500}
            sizes="100vw"
            style={{
              objectFit: "cover",
              width: "100%",
              height: "150px",
            }}
          /> */}
            <Typography>{event.title}</Typography>
          </Box>

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
