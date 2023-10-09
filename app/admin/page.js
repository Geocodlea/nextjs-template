import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import styles from "../page.module.css";

export default async function Admin() {
  const session = await getServerSession(authOptions);

  console.log(session);

  return (
    <>
      {session ? (
        <main className={styles.content}>{session?.user.email}</main>
      ) : (
        <h1 className="text-5xl">NOT LOGGED IN!</h1>
      )}
    </>
  );
}
