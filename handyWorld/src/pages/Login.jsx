import { useState } from "react";
import styles from "./Login.module.css";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import { useAuth } from "../contexts/AuthenticationContext";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const { login } = useAuth();

  function handleOnSubmit(e) {
    e.preventDefault();
    if (email && password) login(email, password);
    // if (isAuthenticated) navigate("pricing");
  }

  return (
    <main className={styles.login}>
      <Navbar />
      <form className={styles.form} onSubmit={handleOnSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}
