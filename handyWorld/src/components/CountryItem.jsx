import styles from "./CountryItem.module.css";
import PropTypes from "prop-types";

function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      <span className={styles.emoji}>{country.emoji}</span>
      <span className={styles.contry}>{country.country}</span>
    </li>
  );
}

CountryItem.propTypes = {
  country: PropTypes.object.isRequired,
};

export default CountryItem;
