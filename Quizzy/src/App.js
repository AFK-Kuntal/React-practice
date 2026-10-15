import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartMessage from "./StartMessage";
import Progress from "./Progress";
import Question from "./Question";
import Footer from "./Footer";
import NextButton from "./NextButton";

const initialState = {
  question: [],
  status: "loading", //loading, error, ready, active, finished
  message: "",
  index: 0,
  points: 0,
  answer: null,
  highScore: 0,
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

    case "start":
      return {
        ...state,
        status: "active",
      };

    case "nextAnswer":
      const currQues = state.question.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          currQues.correctOption === action.payload
            ? state.points + currQues.points
            : state.points,
      };

    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };

    case "finish":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };

    default:
      throw new Error("Action Unknown");
  }
};

function App() {
  // const [state, dispatch] = useReducer(reducer, initialState)
  const [{ question, status, message, index, points, answer }, dispatch] =
    useReducer(reducer, initialState);
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
  const maxPoints = question.reduce((prev, curr) => prev + curr.points, 0);

  return (
    <div className="app">
      <Header />
      {status === "loading" && <Loader />}
      {status === "error" && <Error message={message} />}
      {status === "ready" && (
        <StartMessage numQuestions={numQuestions} dispatch={dispatch} />
      )}
      {status === "active" && (
        <>
          <Main>
            <Progress
              numQuestions={numQuestions}
              index={index}
              points={points}
              maxPoints={maxPoints}
            />
            <Question
              question={question[index]}
              index={index}
              dispatch={dispatch}
              answer={answer}
            />
          </Main>
          <Footer>
            <NextButton
              dispatch={dispatch}
              answer={answer}
              index={index}
              numQuestions={numQuestions}
            />
          </Footer>
        </>
      )}
    </div>
  );
}

export default App;
