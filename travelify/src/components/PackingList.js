import { useState } from "react";
import Items from "./Items";

export default function PackingList({
  items,
  onToggleItem,
  onDeleteItem,
  onDeleteAllItem,
}) {
  const [sortBy, setSetBy] = useState("input");
  let sortedItem;
  if (sortBy === "input") sortedItem = items;
  else if (sortBy === "description")
    sortedItem = items.slice().sort((a, b) => a.desc.localeCompare(b.desc));
  else if (sortBy === "status")
    sortedItem = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  else if (sortBy === "quantity")
    sortedItem = items.slice().sort((a, b) => a.val - b.val);

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
          <option value="quantity">Sort by Quantity</option>
        </select>
        <button name="clear-all" onClick={onDeleteAllItem}>
          Clear All
        </button>
      </div>
    </div>
  );
}
