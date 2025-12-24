export function formatAnswers(answers) {
  return Object.entries(answers)
    .filter(([_, value]) => {
      if (Array.isArray(value)) return value.length > 0;
      return value !== undefined && value !== "";
    })
    .map(([questionId, value]) => ({
      questionId: Number(questionId),
      answer: Array.isArray(value)
        ? value.join(",")
        : String(value)
    }));
}
