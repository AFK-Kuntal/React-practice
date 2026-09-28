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
      <select
        name="quant"
        value={val}
        onChange={(e) => setVal(Number(e.target.value))}
      >
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
        name="item"
      ></input>
      <button name="submit-item">Add</button>
    </form>
  );
}

function PackingList({ items, onToggleItem, onDeleteItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Items
            item={item}
            onToggleItem={onToggleItem}
            onDeleteItem={onDeleteItem}
            key={item.id}
          />
        ))}
      </ul>

      <div className="action">
        <select name="sorting">
          <option>Sort by input order</option>
          <option>Sort by description</option>
          <option>Sort by packed status</option>
        </select>
        <button name="clear-all">Clear All</button>
      </div>
    </div>
  );
}

function Items({ item, onToggleItem, onDeleteItem }) {
  return (
    <li>
      <input
        name="pack-status"
        type="checkbox"
        checked={item.packed}
        onChange={() => onToggleItem(item.id)}
      ></input>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.val} {item.desc}
      </span>
      <button name="delete-item" onClick={() => onDeleteItem(item.id)}>
        ❌
      </button>
    </li>
  );
}
