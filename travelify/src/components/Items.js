export default function Items({ item, onToggleItem, onDeleteItem }) {
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
