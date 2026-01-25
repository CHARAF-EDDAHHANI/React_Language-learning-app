import { useState } from "react";
import { createQuiz as apiCreateQuiz } from "../api/quiz.js";
import { toast } from "react-toastify";

export const useQuiz = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createQuiz = async (quizData) => {
    setLoading(true);
    setError(null);

    try {
      const newQuiz = await apiCreateQuiz(quizData);
      toast.success("Quiz created successfully");
      return newQuiz;

    } catch (err) {
      const message =
        err?.message || "Failed to create quiz";
      setError(message);
      toast.error(message);
      throw err;
      
    } finally {
      setLoading(false);
    }
  };

  return {
    createQuiz,
    loading,
    error,
  };
};
