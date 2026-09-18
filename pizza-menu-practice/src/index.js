import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  // return <h1>Hello React!</h1><p>Another Paragraph</p>; can't do this.can't return two items together.correct way- <div>
  //                                  <h1>Hello React!</h1>
  //                                  <p>Another Paragraph</p>
  //                              <div />
  //
  return (
    <div>
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>React Pizza</h1>
    </header>
  );
}

function Menu() {
  const pizzas = pizzaData;
  const num = pizzas.length;
  if (pizzas.soldOut) return null; //we can't include if inside the return as jsx as if-else isn't an expression
  return (
    <main className="menu">
      <h2>Menu</h2>
      {num > 0 && ( //num > 0 ->always the condition should return true or false
        <>
          <p>
            Authentic Italian cuisine. 6 creative dishes to choose from. All
            from our stone oven, all organic, all delicious.
          </p>
          <ul className="pizzas">
            {pizzas.map(
              (
                pizza, //map because it creates new array.using foreach here will not work
              ) => (
                <Pizza pizzaInfo={pizza} key={pizza.name} /> //key is to uniquely identify each of the element
              ),
            )}
          </ul>
        </>
      )}
    </main>
  );
  //In React, components can only return a single root element(main is the root element here). Traditionally, developers wrapped multiple elements in a <div> to satisfy this rule. However, React Fragments solve this problem by acting as an invisible wrapper that disappears once the code is rendered, leaving behind only the child elements.Basically React Fragment allow us to return multiple element without wrapping them inside a div.
}

function Pizza({ pizzaInfo }) {
  //destructuring the prop->{pizzaInfo},thats way we can immediately know which props we are recieving
  return (
    <li className={`pizza ${pizzaInfo.soldOut ? "sold-out" : ""}`}>
      <img src={pizzaInfo.photoName} alt={pizzaInfo.name}></img>
      <div>
        <h3>{pizzaInfo.name}</h3>
        <p>{pizzaInfo.ingredients}</p>
        {/* {pizzaInfo.soldOut ? (
          <span>"SOLD OUT"</span>
        ) : (
          <span>{pizzaInfo.price}</span>
        )} */}
        <span>{pizzaInfo.soldOut ? "SOLD OUT" : pizzaInfo.price}</span>
      </div>
    </li>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const openTime = 10;
  const closeTime = 20;
  const isOpen = hour >= openTime && hour <= closeTime;
  return (
    <div className="footer">
      {isOpen ? (
        <Order open={openTime} close={closeTime} />
      ) : (
        <p>We're Currently Closed</p>
      )}
    </div>
  );
}

function Order({ open, close }) {
  return (
    <div className="order">
      <p>
        We're open from {open}:00 to {close}:00. Come visit us or order
      </p>
      <button className="btn">Order Now</button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<App />);
//strict mode
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
