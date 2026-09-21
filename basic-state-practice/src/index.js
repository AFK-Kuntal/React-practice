import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const messages = ["Learn React", "Master React", "Earn With React"];

function App() {
  return <Steps />;
}

function Steps() {
  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(true);

  const goPrev = function () {
    if (step > 1) setStep((st) => st - 1);
  };

  const goNext = function () {
    if (step < 3) setStep((st) => st + 1);
  };
  return (
    <>
      <button className="cross" onClick={() => setOpen((is) => !is)}>
        &times;
      </button>
      {open && (
        <main className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>{1}</div>
            <div className={step >= 2 ? "active" : ""}>{2}</div>
            <div className={step >= 3 ? "active" : ""}>{3}</div>
          </div>
          <div className="message">
            <h3>{`Step:${step}`}</h3>
            <p>{messages[step - 1]}</p>
          </div>
          <div className="buttons">
            <Button name="previous" onClick={goPrev} />
            <Button name="next" onClick={goNext} />
          </div>
        </main>
      )}
    </>
  );
}

function Button({ name, onClick }) {
  return (
    <button className="btn" onClick={onClick}>
      {name}
    </button>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
