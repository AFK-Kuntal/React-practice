function FinishScreen({ points, maxPoints, highScore, dispatch }) {
  const perc = (points / maxPoints) * 100;
  return (
    <div>
      <p className="result">
        You Scored: <strong>{points}</strong> out of{" "}
        <strong>{maxPoints}</strong> with <strong>{Math.ceil(perc)}</strong>%
      </p>

      <p className="highscore">Highscore: {highScore}</p>

      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quizz
      </button>
    </div>
  );
}

export default FinishScreen;
