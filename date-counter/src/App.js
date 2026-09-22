import "./styles.css";
import { useState } from "react";

export default function App() {
  return <Counter />;
}

function Counter() {
  const today = new Date();

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  function fixDate(days) {
    const result = new Date();
    result.setDate(result.getDate() + days);
    return result;
  }
  const [step, setStep] = useState(1);
  const [counter, setCounter] = useState(0);

  return (
    <div className="container">
      <div className="step">
        <button onClick={() => setStep((st) => st - 1)}>-</button>
        <p>Step:{step}</p>
        <button onClick={() => setStep((st) => st + 1)}>+</button>
      </div>

      <div className="counter">
        <button onClick={() => setCounter((ct) => ct - step)}>-</button>
        <p>Counter:{counter}</p>
        <button onClick={() => setCounter((ct) => ct + step)}>+</button>
      </div>

      <div className="date">
        <p>
          {counter === 0 && "Today is "}
          {counter > 0 && `${counter} days from today is `}
          {counter < 0 && `${Math.abs(counter)} days ago was `}
          {fixDate(counter).toLocaleDateString("en-US", options)}
        </p>
      </div>
    </div>
  );
}
