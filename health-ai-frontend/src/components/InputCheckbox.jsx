export default function InputCheckbox({ options, value = [], onChange }) {
  const toggle = (option) => {
    if (value.includes(option)) {
      onChange(value.filter(v => v !== option));
    } else {
      onChange([...value, option]);
    }
  };

  return (
    <div className="space-y-3">
      {options.map(opt => (
        <label
          key={opt}
          className={`flex items-center p-3 border rounded-lg cursor-pointer
            ${value.includes(opt)
              ? "border-primary bg-blue-50"
              : "border-gray-300"}`}
        >
          <input
            type="checkbox"
            className="mr-3"
            checked={value.includes(opt)}
            onChange={() => toggle(opt)}
          />
          {opt}
        </label>
      ))}
    </div>
  );
}
