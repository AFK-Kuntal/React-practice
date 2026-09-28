import { useState } from "react";

export default function Form({ onAddItem }) {
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
