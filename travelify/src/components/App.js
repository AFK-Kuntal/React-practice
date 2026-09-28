import { useState } from "react";
import Form from "./Form";
import Logo from "./Logo";
import PackingList from "./PackingList";
import Stats from "./Stats";

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
