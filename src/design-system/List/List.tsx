export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc pl-5">
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  );
}
