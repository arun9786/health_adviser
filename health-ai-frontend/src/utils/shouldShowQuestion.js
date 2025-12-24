// src/utils/shouldShowQuestion.js
export function shouldShowQuestion(question, answers) {
  if (!question.condition) return true;

  const { questionId, equals } = question.condition;
  const parentAnswer = answers[questionId];

  if (Array.isArray(parentAnswer)) {
    return parentAnswer.includes(equals);
  }

  return parentAnswer === equals;
}
