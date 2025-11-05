"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getQuizByLessonId } from "@/lib/actions/quizzes";
import type { Quiz, QuizQuestion } from "@/lib/types/database";
import { Check, X, Trophy } from "lucide-react";

interface QuizComponentProps {
  lessonId: string;
}

export default function QuizComponent({ lessonId }: QuizComponentProps) {
  const [quiz, setQuiz] = useState<
    (Quiz & { quiz_questions: QuizQuestion[] }) | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const loadQuiz = async () => {
    setLoading(true);
    const data = await getQuizByLessonId(lessonId);
    setQuiz(data);
    setLoading(false);
  };

  useEffect(() => {
    loadQuiz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonId]);

  if (
    loading ||
    !quiz ||
    !quiz.quiz_questions ||
    quiz.quiz_questions.length === 0
  ) {
    return null;
  }

  const handleAnswerSelect = (optionIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = optionIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quiz.quiz_questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setShowQuiz(true);
  };

  const calculateScore = () => {
    let correct = 0;
    quiz.quiz_questions.forEach((question, index) => {
      const userAnswer = selectedAnswers[index];
      if (
        userAnswer !== undefined &&
        question.options[userAnswer]?.is_correct
      ) {
        correct++;
      }
    });
    return { correct, total: quiz.quiz_questions.length };
  };

  if (!showQuiz) {
    return (
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle>Test Your Knowledge</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Ready to test what you&apos;ve learned? Take the quiz with{" "}
            {quiz.quiz_questions.length} questions.
          </p>
          <Button onClick={() => setShowQuiz(true)}>Start Quiz</Button>
        </CardContent>
      </Card>
    );
  }

  if (showResults) {
    const { correct, total } = calculateScore();
    const percentage = Math.round((correct / total) * 100);

    return (
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trophy className="h-6 w-6 text-yellow-500 mr-2" />
            Quiz Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <div className="text-5xl font-bold text-blue-600 mb-2">
              {percentage}%
            </div>
            <p className="text-lg text-gray-700">
              You scored {correct} out of {total}
            </p>
          </div>

          <div className="space-y-4 mb-6">
            {quiz.quiz_questions.map((question, qIndex) => {
              const userAnswer = selectedAnswers[qIndex];

              return (
                <div key={qIndex} className="border rounded-lg p-4">
                  <h4 className="font-medium mb-3">
                    {qIndex + 1}. {question.question}
                  </h4>
                  <div className="space-y-2">
                    {question.options.map((option, oIndex) => {
                      const isUserAnswer = userAnswer === oIndex;
                      const isCorrect = option.is_correct;

                      return (
                        <div
                          key={oIndex}
                          className={`p-3 rounded-lg flex items-center justify-between ${
                            isCorrect
                              ? "bg-green-50 border-green-200 border"
                              : isUserAnswer
                              ? "bg-red-50 border-red-200 border"
                              : "bg-gray-50"
                          }`}
                        >
                          <span>{option.text}</span>
                          {isCorrect && (
                            <Check className="h-5 w-5 text-green-600" />
                          )}
                          {isUserAnswer && !isCorrect && (
                            <X className="h-5 w-5 text-red-600" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <Button onClick={handleRestart} className="w-full">
            Retake Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  const question = quiz.quiz_questions[currentQuestion];
  const selectedAnswer = selectedAnswers[currentQuestion];

  return (
    <Card className="shadow-none">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Quiz</CardTitle>
          <span className="text-sm text-gray-500">
            Question {currentQuestion + 1} of {quiz.quiz_questions.length}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">{question.question}</h3>
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                  selectedAnswer === index
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <Button
            variant="secondary"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          <Button onClick={handleNext} disabled={selectedAnswer === undefined}>
            {currentQuestion === quiz.quiz_questions.length - 1
              ? "Finish"
              : "Next"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
