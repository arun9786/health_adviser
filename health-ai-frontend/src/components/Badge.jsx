export default function Badge({ label, level }) {
  const colors = {
    LOW: "bg-green-600",
    MEDIUM: "bg-yellow-500",
    HIGH: "bg-orange-600",
    CRITICAL: "bg-red-600"
  };

  return (
    <span
      className={`px-4 py-1 rounded-full text-white font-semibold ${colors[level]}`}
    >
      {label}
    </span>
  );
}
