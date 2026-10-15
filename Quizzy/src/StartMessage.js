function StartMessage({ numQuestions, dispatch }) {
  return (
    <div className="start">
      <p>Welcome to The React Quiz!</p>
      <p>{numQuestions} questions to test your React mastery</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Start
      </button>
    </div>
  );
}

export default StartMessage;
