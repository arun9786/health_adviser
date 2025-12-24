export default function InputRadio({ options, value, onChange }) {
  return (
    <div className="space-y-3">
      {options.map(opt => (
        <label
  key={opt}
  className={`
    block
    p-3
    border
    rounded-lg
    cursor-pointer
    text-gray-800
    ${value === opt ? "border-blue-600 bg-blue-50" : "border-gray-300"}
  `}
>

          <input
            type="radio"
            className="hidden"
            checked={value === opt}
            onChange={() => onChange(opt)}
          />
          {opt}
        </label>
      ))}
    </div>
  );
}
