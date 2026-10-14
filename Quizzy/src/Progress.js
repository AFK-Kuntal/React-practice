function Progress() {
  return (
    <div className="progress">
      <progress max={10} value={5}></progress>
      <p>
        Question <strong>5</strong>/ 10
      </p>
      <p>
        <strong>5</strong> / 10
      </p>
    </div>
  );
}

export default Progress;
