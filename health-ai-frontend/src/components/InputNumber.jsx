export default function InputNumber({ value, onChange }) {
  return (
    <input
      type="number"
      value={value || ""}
      onChange={e => onChange(e.target.value)}
      className="w-full p-3 border rounded-lg focus:outline-primary"
      placeholder="Enter value"
    />
  );
}
