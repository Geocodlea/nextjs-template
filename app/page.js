import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import styles from "./page.module.css";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <>
      {session ? (
        <main className={styles.main}>{session?.user.email}</main>
      ) : (
        <h1 className="text-5xl">NOT LOGGED IN!</h1>
      )}
    </>
  );
}
