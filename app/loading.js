import styles from "./page.module.css";

import { Box, Paper, Skeleton } from "@mui/material";

const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Loading() {
  return (
    <>
      <Skeleton width="80%" className={styles.title} />
      <Skeleton variant="rounded" width="100%" height="30vh" />
      <Skeleton
        variant="rounded"
        width="80%"
        height="30px"
        sx={{ margin: "2rem 0" }}
      />
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
    </>
  );
}
