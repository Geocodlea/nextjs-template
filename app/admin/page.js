import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import styles from "../page.module.css";

export default async function Admin() {
  const session = await getServerSession(authOptions);

  if (session?.user.role !== "admin")
    return <h1 className="text-5xl">NOT ALLOWED !!!</h1>;

  return <main className={styles.content}>{session.user.name}</main>;
}