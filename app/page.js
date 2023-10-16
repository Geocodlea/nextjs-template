import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import styles from "./page.module.css";

import { Paper, Box } from "@mui/material";

import Events from "@/components/Events";

export default async function Home({ searchParams }) {
  const session = await getServerSession(authOptions);

  return <Events searchParams={searchParams} />;
}
