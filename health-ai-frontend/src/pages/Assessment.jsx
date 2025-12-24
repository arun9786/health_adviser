import { useEffect, useState } from "react";

import api from "../services/api";
import { groupBySection } from "../utils/groupBySection";
import { formatAnswers } from "../utils/formatAnswers";

import QuestionCard from "../components/QuestionCard";
import InputRadio from "../components/InputRadio";
import InputCheckbox from "../components/InputCheckbox";
import InputNumber from "../components/InputNumber";
import Button from "../components/Button";
import ProgressBar from "../components/ProgressBar";
import SectionHeader from "../components/SectionHeader";
import SectionProgress from "../components/SectionProgress";

export default function Assessment({ onProcessing, onBackToBasic }) {
  const [sections, setSections] = useState({});
  const [sectionKeys, setSectionKeys] = useState([]);
  const [sectionIndex, setSectionIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    api.get("/assessment/questions").then(res => {
      const grouped = groupBySection(res.data);
      setSections(grouped);
      setSectionKeys(Object.keys(grouped));
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
        if (e.key === "Enter" || e.key === "ArrowRight") {
        handleNext();
        }

        if (e.key === "ArrowLeft") {
        handleBack();
        }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
        window.removeEventListener("keydown", handleKeyDown);
    };
    });


  if (!sectionKeys.length) return null;

  const currentSection = sectionKeys[sectionIndex];
  const questions = sections[currentSection];
  const question = questions[questionIndex];

  // ---------- PROGRESS ----------
  const totalQuestions = Object.values(sections).flat().length;

  const answeredCount = Object.values(answers).filter(val => {
    if (Array.isArray(val)) return val.length > 0;
    return val !== undefined && val !== "";
  }).length;

  // ---------- VALIDATION ----------
  const isAnswered = () => {
    const value = answers[question.id];
    if (Array.isArray(value)) return value.length > 0;
    return value !== undefined && value !== "";
  };

  // ---------- NAVIGATION ----------
  const handleNext = () => {
    if (!isAnswered()) return;

    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else if (sectionIndex < sectionKeys.length - 1) {
      setSectionIndex(sectionIndex + 1);
      setQuestionIndex(0);
    } else {
      // ✅ FINISH — SEND FORMATTED ANSWERS
      const formattedAnswers = formatAnswers(answers);
      onProcessing(formattedAnswers);
    }
  };

  const handleBack = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
    } else if (sectionIndex > 0) {
      const prevSectionQuestions =
        sections[sectionKeys[sectionIndex - 1]];
      setSectionIndex(sectionIndex - 1);
      setQuestionIndex(prevSectionQuestions.length - 1);
    }
  };

  const handleBackToBasic = () => {
    if (Object.keys(answers).length > 0) {
        const ok = window.confirm(
        "If you go back, your assessment progress will be kept, but results may change. Continue?"
        );
        if (!ok) return;
    }
    onBackToBasic();
    };

  // ---------- RENDER ----------
  return (
    <div className="min-h-screen flex justify-center px-4 py-8">
      <div className="max-w-xl w-full">

        <div className="flex justify-between items-center mb-4">
            <button
                onClick={handleBackToBasic}
                className="text-sm text-blue-600 hover:underline"
            >
                ← Basic Details
            </button>
        </div>


        {/* OVERALL PROGRESS */}
        <ProgressBar
          current={answeredCount}
          total={totalQuestions}
        />

        {/* SECTION INFO */}
        <SectionProgress
          sectionIndex={sectionIndex}
          totalSections={sectionKeys.length}
        />

        <SectionHeader
          title={currentSection}
          current={questionIndex + 1}
          total={questions.length}
        />

        {/* QUESTION CARD */}
        <QuestionCard question={question}>

          {question.type === "SINGLE_SELECT" && (
            <InputRadio
              options={JSON.parse(question.options)}
              value={answers[question.id]}
              onChange={val =>
                setAnswers(prev => ({ ...prev, [question.id]: val }))
              }
            />
          )}

          {question.type === "MULTI_SELECT" && (
            <InputCheckbox
              options={JSON.parse(question.options)}
              value={answers[question.id] || []}
              onChange={val =>
                setAnswers(prev => ({ ...prev, [question.id]: val }))
              }
            />
          )}

          {question.type === "NUMBER" && (
            <InputNumber
              value={answers[question.id]}
              onChange={val =>
                setAnswers(prev => ({ ...prev, [question.id]: val }))
              }
            />
          )}

          {/* NAVIGATION BUTTONS */}
          <div className="flex justify-between mt-6">
            <Button
              label="Back"
              variant="secondary"
              onClick={handleBack}
              disabled={sectionIndex === 0 && questionIndex === 0}
            />

            <Button
              label={
                sectionIndex === sectionKeys.length - 1 &&
                questionIndex === questions.length - 1
                  ? "Finish"
                  : "Next"
              }
              onClick={handleNext}
              disabled={!isAnswered()}
            />
          </div>

        </QuestionCard>
      </div>
    </div>
  );
}
