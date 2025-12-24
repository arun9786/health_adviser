export default function Button({
  label,
  onClick,
  type = "button",
  disabled = false
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="
        bg-blue-600
        text-white
        px-6
        py-3
        rounded-lg
        font-semibold
        hover:bg-blue-700
        disabled:bg-gray-300
        transition
      "
    >
      {label}
    </button>
  );
}
