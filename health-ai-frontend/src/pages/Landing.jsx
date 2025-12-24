export default function Landing({ onStart }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow-lg max-w-lg text-center">
        <h1 className="text-3xl font-bold text-primary mb-4">
          AI Health Adviser
        </h1>
        <p className="text-gray-600 mb-6">
          Answer a few questions to understand your health risks and
          get personalized guidance.
        </p>
        <button
          onClick={onStart}
          className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Start Assessment
        </button>
        <p className="text-xs text-gray-400 mt-4">
          Not a medical diagnosis.
        </p>
      </div>
    </div>
  );
}
