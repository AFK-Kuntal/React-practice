import { useState } from "react";

export default function useGeoLocation(defaultPosition = null) {
  const [position, setPosition] = useState(defaultPosition);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function getLocation() {
    if (!navigator.geolocation) {
      setError("Location Unknown");
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLoading(false);
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      },
    );
  }
  return { position, error, loading, getLocation };
}
