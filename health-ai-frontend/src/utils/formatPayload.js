export function formatAnswers(answers) {
  return Object.entries(answers).map(([questionId, value]) => ({
    questionId: Number(questionId),
    answer: Array.isArray(value) ? value.join(",") : String(value)
  }));
}