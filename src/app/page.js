import Image from "next/image";
import styles from "./page.module.css";
import LoginForm from "../components/login-form";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Welcome to Koalibook</h1>
      <div className={styles.loginContainer}>
        <h3>Login</h3>
        <LoginForm />
      </div>
    </main>
  );
}
