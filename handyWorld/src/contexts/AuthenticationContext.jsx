import { createContext, useContext, useReducer } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const USER = {
  name: "abc",
  email: "abc@gmail.com",
  password: "pass@abc",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const initialState = {
  user: null,
  isAuthenticated: false,
};

Authentication.propTypes = {
  children: PropTypes.node.isRequired,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("Action Unknown");
  }
};

function Authentication({ children }) {
  const navigate = useNavigate();
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  function login(email, password) {
    if (USER.email === email && USER.password === password) {
      dispatch({ type: "login", payload: USER });
      navigate("/pricing", { replace: true }); //replace=true ->so that doesn't go back to the login page again when going back
    }
  }

  function logout() {
    dispatch({ type: "logout" });
    navigate("/");
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("Authentication Context was used outside the AuthProvider");
  return context;
}

export { Authentication, useAuth };
