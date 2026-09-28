import { useState } from "react";

export default function App() {
  const [item, setItem] = useState([]);
  function addItem(newItem) {
    setItem((item) => [...item, newItem]);
  }

  function togglePacked(id) {
    setItem((item) =>
      item.map((i) => (i.id === id ? { ...i, packed: !i.packed } : i)),
    );
  }

  function deleteItem(id) {
    setItem((item) => item.filter((item) => item.id !== id));
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={addItem} />
      <PackingList
        items={item}
        onToggleItem={togglePacked}
        onDeleteItem={deleteItem}
      />
    </div>
  );
}

function Logo() {
  return <h1>Travelify</h1>;
}

function Form({ onAddItem }) {
  const [desc, setDesc] = useState("");
  const [val, setVal] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!desc) return;
    const newItem = { desc, val, packed: false, id: Date.now() };
    onAddItem(newItem);
    setDesc("");
    setVal(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>Add Items needed for the trip</h3>
      <select value={val} onChange={(e) => setVal(Number(e.target.value))}>
        {Array.from({ length: 20 }, (_, index) => index + 1).map((i) => (
          <option value={i} key={i}>
            {i}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="item..."
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      ></input>
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onToggleItem, onDeleteItem }) {
  return (
    <div className="list">
      <ul>
        <Items
          items={items}
          onToggleItem={onToggleItem}
          onDeleteItem={onDeleteItem}
        />
      </ul>
    </div>
  );
}

function Items({ items, onToggleItem, onDeleteItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={items.packed}
        onChange={() => onToggleItem(items.id)}
      ></input>
      <span style={items.packed ? { textDecoration: "line-through" } : {}}>
        {items.val} {items.desc}
      </span>
      <button onClick={() => onDeleteItem(items.id)}>&times</button>
    </li>
  );
}
