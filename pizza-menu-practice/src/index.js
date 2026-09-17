import React from "react";
import ReactDOM from "react-dom/client";

function App() {
  return <h1>Hello React!</h1>;
  // return <h1>Hello React!</h1><p>Another Paragraph</p>; can't do this.can't return two items together.correct way- <div>
  //                                  <h1>Hello React!</h1>
  //                                  <p>Another Paragraph</p>
  //                              <div />
  //
}

const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<App />);
//strict mode
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
