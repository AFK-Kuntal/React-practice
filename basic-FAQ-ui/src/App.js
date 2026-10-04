import { useState } from "react";

const faqs = [
  {
    question: "What is React?",
    answer:
      "React is a JavaScript library for building user interfaces. It lets you create reusable components and efficiently update the UI when your data changes.",
  },
  {
    question: "Why should I learn React?",
    answer:
      "React is widely used in modern web development. Learning it gives you a strong foundation for building interactive and component-based web applications.",
  },
  {
    question: "What are React components?",
    answer:
      "Components are reusable pieces of UI. A component can contain its own structure, logic, and styling, making large applications easier to build and maintain.",
  },
  {
    question: "Is React difficult to learn?",
    answer:
      "React becomes much easier once you understand JavaScript fundamentals such as functions, arrays, objects, destructuring, and state management.",
  },
];

export default function App() {
  return (
    <main className="app">
      <Heading />
      <Accordion />
    </main>
  );
}

function Heading() {
  return (
    <header className="heading">
      <span>Faq</span>
      <h2>Frequently Asked Question</h2>
      <p>Know About React</p>
    </header>
  );
}

function Accordion() {
  return (
    <div className="accordion">
      {faqs.map((item, index) => (
        <AccordionItem index={index} item={item} key={item.question} />
      ))}
    </div>
  );
}

function AccordionItem({ index, item }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accordionItem">
      <div className="accordionQuestion">
        <span>{item.question}</span>
        <button onClick={() => setIsOpen((isOpen) => !isOpen)}>
          {isOpen ? "-" : "+"}
        </button>
      </div>

      {isOpen && (
        <div className="accordionAnswer">
          <p>{item.answer}</p>
        </div>
      )}
    </div>
  );
}
