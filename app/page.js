import styles from "./page.module.css";

import { Typography } from "@mui/material";

import Events from "@/components/Events";

export default async function Home({ searchParams }) {
  return (
    <>
      <Typography variant="h1" className={styles.title}>
        Next Template
      </Typography>
      <Typography className={styles.description} mb={3}>
        This is a Next.js boilerplate template that provides a solid foundation
        for building modern web applications. It includes a well-structured
        Next.js App Router folder structure, built using the latest technologies
        and best practices. This boilerplate is preconfigured with NextAuth.js
        for authentication. It integrates with MongoDB as the database and
        supports multiple authentication providers.
      </Typography>
      <Typography variant="h6" className={styles.code} mb={3}>
        The below cards are a Full CRUD example for an admin user:
      </Typography>
      <Events searchParams={searchParams} />
    </>
  );
}
