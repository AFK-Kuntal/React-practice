import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

// import App from "./App";

function App() {
  return (
    <div className="card">
      <Avatar />
      <div className="data">
        <Intro />
        <Skills />
      </div>
    </div>
  );
}

function Avatar() {
  return (
    <img
      className="avatar"
      src="coder-at-work-stockcake.jpg"
      alt="Developer at work"
    />
  );
}

function Intro(params) {
  return (
    <div>
      <h1>John Doe</h1>
      <p>
        Full-stack web developer and teacher at Udemy. When not coding or
        preparing a course, I like to play board games, to cook (and eat), or to
        just enjoy the Portuguese sun at the beach.
      </p>
    </div>
  );
}

function Skills() {
  return (
    <div className="skill-list">
      <Skill skill="React" emoji="🏆" bcolor="blue" />
      <Skill skill="HTML" emoji="✏️" bcolor="yellow" />
      <Skill skill="CSS" emoji="🎲" bcolor="grey" />
      <Skill skill="Python" emoji="🐍" bcolor="orangered" />
    </div>
  );
}

function Skill(props) {
  return (
    <div className="skill" style={{ backgroundColor: props.bcolor }}>
      <span>{props.skill}</span>
      <span>{props.emoji}</span>
    </div>
  );
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
