function Progress({ numQuestions, index, points, maxPoints }) {
  return (
    <div className="progress">
      <progress max={numQuestions} value={index}></progress>
      <p>
        Question <strong>{index + 1}</strong>/ {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPoints}
      </p>
    </div>
  );
}

export default Progress;
