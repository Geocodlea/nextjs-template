import Link from "next/link";
import styles from "./page.module.css";

export default function NotFound() {
  return (
    <main className={styles.content}>
      <h2>Not Found</h2>
      <Link href="/">Return Home</Link>
    </main>
  );
}
