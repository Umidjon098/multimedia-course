"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  createQuiz,
  createQuizQuestion,
  deleteQuizQuestion,
  getQuizByLessonId,
} from "@/lib/actions/quizzes";
import { Plus, Trash2, Check } from "lucide-react";
import type { Quiz, QuizQuestion, QuizOption } from "@/lib/types/database";

interface QuizManagerProps {
  lessonId: string;
}

export default function QuizManager({ lessonId }: QuizManagerProps) {
  const [quiz, setQuiz] = useState<
    (Quiz & { quiz_questions: QuizQuestion[] }) | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [newQuestion, setNewQuestion] = useState("");
  const [newOptions, setNewOptions] = useState<QuizOption[]>([
    { text: "", is_correct: false },
    { text: "", is_correct: false },
  ]);

  useEffect(() => {
    const loadQuiz = async () => {
      setLoading(true);
      const data = await getQuizByLessonId(lessonId);
      setQuiz(data);
      setLoading(false);
    };
    loadQuiz();
  }, [lessonId]);

  const loadQuiz = async () => {
    setLoading(true);
    const data = await getQuizByLessonId(lessonId);
    setQuiz(data);
    setLoading(false);
  };

  const handleCreateQuiz = async () => {
    const result = await createQuiz({
      lesson_id: lessonId,
      title: "Lesson Quiz",
    });

    if (result.error) {
      alert("Error creating quiz: " + result.error);
    } else {
      await loadQuiz();
    }
  };

  const handleAddOption = () => {
    setNewOptions([...newOptions, { text: "", is_correct: false }]);
  };

  const handleRemoveOption = (index: number) => {
    setNewOptions(newOptions.filter((_, i) => i !== index));
  };

  const handleOptionChange = (index: number, text: string) => {
    const updated = [...newOptions];
    updated[index].text = text;
    setNewOptions(updated);
  };

  const handleCorrectAnswerChange = (index: number) => {
    const updated = newOptions.map((opt, i) => ({
      ...opt,
      is_correct: i === index,
    }));
    setNewOptions(updated);
  };

  const handleAddQuestion = async () => {
    if (
      !quiz ||
      !newQuestion.trim() ||
      newOptions.some((opt) => !opt.text.trim())
    ) {
      alert("Please fill in all fields");
      return;
    }

    if (!newOptions.some((opt) => opt.is_correct)) {
      alert("Please mark at least one correct answer");
      return;
    }

    const result = await createQuizQuestion({
      quiz_id: quiz.id,
      question: newQuestion,
      options: newOptions,
      order_index: quiz.quiz_questions?.length || 0,
    });

    if (result.error) {
      alert("Error adding question: " + result.error);
    } else {
      setNewQuestion("");
      setNewOptions([
        { text: "", is_correct: false },
        { text: "", is_correct: false },
      ]);
      await loadQuiz();
    }
  };

  const handleDeleteQuestion = async (questionId: string) => {
    if (!confirm("Are you sure you want to delete this question?")) return;

    const result = await deleteQuizQuestion(questionId);
    if (result.error) {
      alert("Error deleting question: " + result.error);
    } else {
      await loadQuiz();
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading quiz...</div>;
  }

  if (!quiz) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 mb-4">
          No quiz created yet for this lesson
        </p>
        <Button onClick={handleCreateQuiz}>Create Quiz</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Existing Questions */}
      {quiz.quiz_questions && quiz.quiz_questions.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Existing Questions</h3>
          {quiz.quiz_questions.map((question, qIndex) => (
            <Card key={question.id}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-medium">
                    {qIndex + 1}. {question.question}
                  </h4>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteQuestion(question.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2 ml-4">
                  {question.options.map((option, oIndex) => (
                    <div
                      key={oIndex}
                      className={`p-2 rounded ${
                        option.is_correct
                          ? "bg-green-50 border border-green-200"
                          : "bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center">
                        {option.is_correct && (
                          <Check className="h-4 w-4 text-green-600 mr-2" />
                        )}
                        <span>{option.text}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add New Question */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Add New Question</h3>
        <div className="space-y-4">
          <Input
            label="Question"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Enter your question"
          />

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Answer Options
            </label>
            {newOptions.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  value={option.text}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                />
                <Button
                  type="button"
                  size="sm"
                  variant={option.is_correct ? "primary" : "secondary"}
                  onClick={() => handleCorrectAnswerChange(index)}
                  title="Mark as correct answer"
                >
                  <Check className="h-4 w-4" />
                </Button>
                {newOptions.length > 2 && (
                  <Button
                    type="button"
                    size="sm"
                    variant="danger"
                    onClick={() => handleRemoveOption(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleAddOption}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Option
            </Button>
          </div>

          <Button onClick={handleAddQuestion}>Add Question</Button>
        </div>
      </div>
    </div>
  );
}
