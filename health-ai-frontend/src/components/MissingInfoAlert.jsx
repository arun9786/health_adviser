export default function MissingInfoAlert({ onRetry }) {
  return (
    <div className="bg-yellow-50 border border-yellow-300 p-6 rounded-xl">
      <h2 className="text-xl font-semibold text-yellow-800 mb-2">
        We need a bit more information 🙂
      </h2>

      <p className="text-gray-700 mb-4">
        To give you an accurate and personalized health assessment,
        we need the following basic details:
      </p>

      <ul className="list-disc list-inside text-gray-700 mb-4">
        <li>Age</li>
        <li>Height</li>
        <li>Weight</li>
      </ul>

      <p className="text-sm text-gray-600 mb-6">
        Don’t worry — this information is used only to calculate
        general health insights and is not stored permanently.
      </p>

      <button
        onClick={onRetry}
        className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Update Details & Retry
      </button>
    </div>
  );
}
