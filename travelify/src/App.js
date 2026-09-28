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

  function deleteAllItems() {
    const confirmed = window.confirm(
      "This will clear all of the items! Continue to clear?",
    );
    if (confirmed) setItem([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={addItem} />
      <PackingList
        items={item}
        onToggleItem={togglePacked}
        onDeleteItem={deleteItem}
        onDeleteAllItem={deleteAllItems}
      />
      <Stats items={item} />
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

function PackingList({ items, onToggleItem, onDeleteItem, onDeleteAllItem }) {
  const [sortBy, setSetBy] = useState("input");
  let sortedItem;
  if (sortBy === "input") sortedItem = items;
  else if (sortBy === "description")
    sortedItem = items.slice().sort((a, b) => a.desc.localeCompare(b.desc));
  else if (sortBy === "status")
    sortedItem = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItem.map((item) => (
          <Items
            item={item}
            onToggleItem={onToggleItem}
            onDeleteItem={onDeleteItem}
            key={item.id}
          />
        ))}
      </ul>

      <div className="action">
        <select
          name="sorting"
          value={sortBy}
          onChange={(e) => setSetBy(e.target.value)}
        >
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="status">Sort by packed status</option>
        </select>
        <button name="clear-all" onClick={onDeleteAllItem}>
          Clear All
        </button>
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

function Stats({ items }) {
  const numItems = items.length;
  const packedItems = items.filter((it) => it.packed).length;
  const percentage = Math.round((packedItems / numItems) * 100);

  return (
    <footer className="stats">
      {!numItems
        ? "|| Start Adding Items to keep track ||"
        : percentage === 100
          ? "Everything is being packed!"
          : `You have ${numItems} items and you have packed ${packedItems}(${!percentage ? 0 : percentage}%)`}
    </footer>
  );
}
