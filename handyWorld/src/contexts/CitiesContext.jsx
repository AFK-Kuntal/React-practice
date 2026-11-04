import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import PropTypes from "prop-types";

const BASE_URL = "http://localhost:8000";
const CitiesContext = createContext();

const initialState = {
  cities: [],
  loading: false,
  error: "",
  currentCity: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, loading: true };
    case "cities/loaded":
      return { ...state, cities: action.payload, loading: false };
    case "city/created":
      return {
        ...state,
        loading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/loaded":
      return { ...state, loading: false, currentCity: action.payload };
    case "city/deleted":
      return {
        ...state,
        loading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case "failed":
      return { ...state, error: action.payload, loading: false };

    default:
      throw new Error("Unknown Action");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, loading, error, currentCity }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({ type: "failed", payload: "Failed to Load Cities" });
      }
    }
    fetchCities();
  }, []);

  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "content-Type": "application/json" },
      });
      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({ type: "failed", payload: "Failed to Create the City" });
    }
  }

  // async function getCity(id) {
  //   if (Number(id) === currentCity.id) return;
  //   dispatch({ type: "loading" });
  //   try {
  //     const res = await fetch(`${BASE_URL}/cities/${id}`);
  //     const data = await res.json();
  //     dispatch({ type: "city/loaded", payload: data });
  //   } catch {
  //     dispatch({ type: "failed", payload: "Failed to Load City" });
  //   }
  // }

  const getCity = useCallback(
    async function (id) {
      if (Number(id) === Number(currentCity.id)) return;

      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`);

        if (!res.ok) throw new Error("City not found");

        const data = await res.json();

        dispatch({ type: "city/loaded", payload: data });
      } catch {
        dispatch({ type: "failed", payload: "Failed to Load City" });
      }
    },
    [currentCity.id],
  );

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, { method: "DELETE" });
      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({ type: "failed", payload: "Failed to Delete City" });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        currentCity,
        loading,
        error,
        createCity,
        deleteCity,
        getCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

CitiesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error("CitiesContext was used outside the CitiesProvider");
  }
  return context;
}

export { CitiesProvider, useCities };
