import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartMessage from "./StartMessage";

const initialState = {
  question: [],
  status: "loading", //loading, error, ready, active, finished
  message: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return { ...state, status: "ready", question: action.payload };

    case "dataFailed":
      return {
        ...state,
        status: "error",
        message: action.payload,
      };

    default:
      throw new Error("Action Unknown");
  }
};

function App() {
  // const [state, dispatch] = useReducer(reducer, initialState)
  const [{ question, status, message }, dispatch] = useReducer(
    reducer,
    initialState,
  );
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await fetch("http://localhost:5000/questions");
        if (!res.ok) throw new Error("Failed to Load Questions");
        const data = await res.json();
        dispatch({ type: "dataReceived", payload: data });
        if (data.Response === "False") throw new Error("Invalid Question");
      } catch (err) {
        dispatch({ type: "dataFailed", payload: err.message });
      }
    };
    fetchQuestion();
  }, []);

  const numQuestions = question.length;

  return (
    <div className="app">
      <Header />
      {status === "loading" && <Loader />}
      {status === "error" && <Error message={message} />}
      {status === "ready" && (
        <StartMessage numQuestions={numQuestions} dispatch={dispatch} />
      )}
      {status === "active" && <Main />}
    </div>
  );
}

export default App;
