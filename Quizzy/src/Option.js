function Option({ question, dispatch, answer }) {
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${hasAnswered ? (index === question.correctOption ? "correct" : "wrong") : ""}`}
          key={option}
          onClick={() => dispatch({ type: "nextAnswer", payload: index })}
          // disabled={hasAnswered}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Option;
