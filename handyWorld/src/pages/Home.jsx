import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import styles from "./Home.module.css";

function Home() {
  return (
    <main className={styles.homepage}>
      <Navbar />
      <section>
        <h1>
          Travel the World.
          <br />
          WorldWise Keeps Track of All of Your Adventure
        </h1>
        <h2>
          A world map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </h2>
        <Link to={"/login"} className="cta">
          Start Tracking
        </Link>
      </section>
    </main>
  );
}

export default Home;
