export default function ProgressBar({ current, total }) {
  const percent = Math.round((current / total) * 100);

  const getColor = () => {
    if (percent < 34) return "bg-red-500";
    if (percent < 67) return "bg-yellow-500";
    return "bg-green-600";
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between text-sm mb-1 text-gray-600">
        <span>
          {current} of {total} completed
        </span>
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
