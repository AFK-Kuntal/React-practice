export default function Stats({ items }) {
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
