export default function BmiProgressBar({ bmi }) {
  // Clamp BMI between 10 and 40 for UI safety
  const safeBmi = Math.min(Math.max(bmi, 10), 40);

  // Convert BMI to percentage (10 → 0%, 40 → 100%)
  const percent = ((safeBmi - 10) / (40 - 10)) * 100;

  return (
    <div className="w-full">
      {/* LABELS */}
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>Underweight</span>
        <span>Normal</span>
        <span>Overweight</span>
        <span>Obese</span>
      </div>

      {/* BAR */}
      <div className="relative h-4 rounded-full overflow-hidden bg-gray-200">

        {/* COLOR SEGMENTS */}
        <div className="absolute left-0 top-0 h-full w-1/4 bg-blue-400" />
        <div className="absolute left-1/4 top-0 h-full w-1/4 bg-green-500" />
        <div className="absolute left-2/4 top-0 h-full w-1/4 bg-yellow-500" />
        <div className="absolute left-3/4 top-0 h-full w-1/4 bg-red-500" />

        {/* INDICATOR */}
        <div
          className="absolute top-[-6px]"
          style={{ left: `calc(${percent}% - 6px)` }}
        >
          <div className="w-3 h-3 bg-black rounded-full border-2 border-white" />
        </div>
      </div>

      {/* VALUE */}
      <div className="mt-2 text-sm text-gray-700">
        Your BMI: <strong>{bmi}</strong>
      </div>
    </div>
  );
}
