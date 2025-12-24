import { useEffect } from "react";
import { submitAssessment } from "../services/api";

export default function Processing({ payload, onResult }) {

  useEffect(() => {
    submitAssessment(payload)
      .then(res => onResult(res.data))
      .catch(err => {
        console.error(err);
        alert("Something went wrong. Please try again.");
      });
  }, [payload, onResult]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow-lg text-center">
        <div className="animate-spin rounded-full h-12 w-12
                        border-t-4 border-primary mx-auto mb-6"></div>

        <h2 className="text-xl font-semibold mb-2">
          Analyzing your health data
        </h2>
        <p className="text-gray-600">
          Generating personalized insights…
        </p>
      </div>
    </div>
  );
}
