import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
} from "react-leaflet";
import Button from "./Button";
import styles from "./Map.module.css";
import useGeoLocation from "../hooks/useGeoLocation";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

function Map() {
  const { cities } = useCities();
  const {
    loading: isLoading,
    position: geoPosition,
    getLocation,
  } = useGeoLocation();

  return (
    <div className={styles.mapContainer}>
      {!geoPosition && (
        <Button type="position" onClick={() => getLocation()}>
          {isLoading ? "Loading.." : "Use Your Location"}
        </Button>
      )}
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>{" "}
            </Popup>
          </Marker>
        ))}

        <ClickOnMap />
      </MapContainer>
    </div>
  );
}

function ClickOnMap() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}
// function ChangeCenter({ position }) {
//   const map = useMap();
//   map.setView(position);
//   return null;
// }
export default Map;
