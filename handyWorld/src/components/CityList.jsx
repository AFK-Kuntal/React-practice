import { styles } from "./CityList.module.css";
import { useCities } from "../contexts/CitiesContext";
import CityItem from "./CityItem";
import Load from "./Load";
import Message from "./Message";

function CityList() {
  const { cities, loading } = useCities();
  if (loading) return <Load />;
  return (
    {cities.length ?<ul className={styles.CityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>:<p className={styles.message}>"Please Add Some Cities to Continue!!"</p>;}
  );
}

export default CityList;
