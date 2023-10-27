import Link from "next/link";
import styles from "./page.module.css";

import { Typography } from "@mui/material";

export default function NotFound() {
  return (
    <>
      <Typography variant="h1" className={styles.title} color={"error"}>
        Not Found
      </Typography>
      <Link href="/" style={{ fontSize: "2rem" }}>
        Return Home
      </Link>
    </>
  );
}
