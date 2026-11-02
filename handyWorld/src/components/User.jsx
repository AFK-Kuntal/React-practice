import styles from "./User.module.css";
import { useAuth } from "../contexts/AuthenticationContext";

function User() {
  const { logout, user } = useAuth();

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />
      <span>welcome {user.name}</span>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
}

export default User;
