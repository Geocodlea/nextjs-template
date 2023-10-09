import { redirect } from "next/navigation";

import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import styles from "../page.module.css";

export default async function Profile() {
  const session = await getServerSession(authOptions);

  if (!session) redirect(`/`);

  return <main className={styles.content}>{session.user.name}</main>;
}
