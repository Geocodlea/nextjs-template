import styles from "./page.module.css";

import { Box, Paper, Skeleton } from "@mui/material";

const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Loading() {
  return (
    <Box className={styles.grid}>
      {skeletons.map((skeleton, index) => (
        <Paper elevation={24} key={index} style={{ margin: "10px" }}>
          <Skeleton variant="rounded" animation="wave" height={300} />
          <Skeleton
            variant="rectangular"
            height={100}
            sx={{ bgcolor: "grey.200" }}
          />
          <Skeleton
            variant="text"
            sx={{ fontSize: "2rem", marginLeft: "20%", marginRight: "20%" }}
          />
          <Skeleton
            variant="text"
            sx={{ fontSize: "2rem", marginLeft: "30%", marginRight: "30%" }}
          />
        </Paper>
      ))}
    </Box>
  );
}
