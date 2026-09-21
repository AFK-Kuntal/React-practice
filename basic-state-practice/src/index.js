import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

function App() {
  return <Steps />;
}

function Steps() {
  return (
    <main className="steps">
      <div className="numbers">
        <div className="active">{1}</div>
        <div>{2}</div>
        <div>{3}</div>
      </div>
      <div className="message">
        <h3>Step:1</h3>
        <p>Learn React</p>
      </div>
      <div className="buttons">
        <Button name="previous" className="btn" />
        <Button name="next" className="btn" />
      </div>
    </main>
  );
}

function Button({ name }) {
  return <button>{name}</button>;
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
