import styles from "./CountryList.module.css";
import { useCities } from "../contexts/CitiesContext";
import Load from "./Load";
import CountryItem from "./CountryItem";

function CountryList() {
  const { cities, loading } = useCities();
  if (loading) return <Load />;

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);

  return cities.length ? (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  ) : (
    <p className={styles.message}>Add Your First City to Continue</p>
  );
}

export default CountryList;
