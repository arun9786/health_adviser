export default function SectionHeader({ title, current, total }) {
  const percent = Math.round((current / total) * 100);

  const getColor = () => {
    if (percent < 34) return "bg-red-500";
    if (percent < 67) return "bg-yellow-500";
    return "bg-green-600";
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">
        {title}
      </h2>

      <div className="flex justify-between text-sm text-gray-600 mb-1">
        <span>{current} of {total} answered</span>
        <span>{percent}%</span>
      </div>

      <div className="w-full bg-gray-200 h-2 rounded">
        <div
          className={`h-2 rounded transition-all duration-500 ${getColor()}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
