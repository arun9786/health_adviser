export default function Section({ title, children }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {children}
    </section>
  );
}
