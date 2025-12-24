import { useEffect, useRef } from "react";

export default function QuestionCard({ question, children }) {
  const ref = useRef();

  useEffect(() => {
    ref.current?.focus();
  }, [question.id]);

  return (
    <div
      ref={ref}
      tabIndex="-1"
      className="
        bg-white p-6 rounded-xl shadow
        transition-all duration-300 ease-out
        animate-slideIn outline-none
      "
    >
      <h3 className="text-lg font-semibold mb-4">
        {question.questionText}
      </h3>
      {children}
    </div>
  );
}
