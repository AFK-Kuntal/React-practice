import Load from "./Load";
import styles from "./Spinner.module.css";

function SpinnerFullPage() {
  return (
    <div className={styles.spinnerFullpage}>
      <Load />
    </div>
  );
}

export default SpinnerFullPage;
