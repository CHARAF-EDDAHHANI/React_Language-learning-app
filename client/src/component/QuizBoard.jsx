import { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  TextField,
  MenuItem,
  IconButton,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";

export default function QuizBoard({ onCreateQuiz, loading }) {
  const [open, setOpen] = useState(false);

  const [quizData, setQuizData] = useState({
    title: "",
    level: "",
    questions: [],
  });

  /* ---------------- QUESTIONS ---------------- */

  const addQuestion = () => {
    setQuizData((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          text: "",
          type: "fill_in_blank",
          options: [],
          answer: "",
        },
      ],
    }));
  };

  const removeQuestion = (index) => {
    setQuizData((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index),
    }));
  };

  const updateQuestion = (index, key, value) => {
    const updated = [...quizData.questions];
    updated[index][key] = value;
    setQuizData((prev) => ({ ...prev, questions: updated }));
  };

  const addOption = (qIndex) => {
    const updated = [...quizData.questions];
    updated[qIndex].options.push("");
    setQuizData((prev) => ({ ...prev, questions: updated }));
  };

  const updateOption = (qIndex, oIndex, value) => {
    const updated = [...quizData.questions];
    updated[qIndex].options[oIndex] = value;
    setQuizData((prev) => ({ ...prev, questions: updated }));
  };

  const removeOption = (qIndex, oIndex) => {
    const updated = [...quizData.questions];
    updated[qIndex].options = updated[qIndex].options.filter(
      (_, i) => i !== oIndex
    );
    setQuizData((prev) => ({ ...prev, questions: updated }));
  };

  /* ---------------- CREATE ---------------- */

  const handleCreate = async () => {
    if (!quizData.title || !quizData.level || quizData.questions.length === 0)
      return;

    await onCreateQuiz(quizData);

    setQuizData({ title: "", level: "", questions: [] });
    setOpen(false);
  };

  /* ---------------- UI ---------------- */

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Create Quiz
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>Create New Quiz</DialogTitle>

        <DialogContent>
          <TextField
            label="Quiz Title"
            fullWidth
            margin="normal"
            value={quizData.title}
            onChange={(e) =>
              setQuizData((p) => ({ ...p, title: e.target.value }))
            }
          />

          <TextField
            label="Level"
            fullWidth
            margin="normal"
            value={quizData.level}
            onChange={(e) =>
              setQuizData((p) => ({ ...p, level: e.target.value }))
            }
          />

          {quizData.questions.map((q, qIndex) => (
            <div key={qIndex} style={{ marginTop: 16 }}>
              <IconButton onClick={() => removeQuestion(qIndex)}>
                <Delete />
              </IconButton>

              <TextField
                label={`Question ${qIndex + 1}`}
                fullWidth
                margin="normal"
                value={q.text}
                onChange={(e) =>
                  updateQuestion(qIndex, "text", e.target.value)
                }
              />

              <TextField
                select
                label="Type"
                fullWidth
                margin="normal"
                value={q.type}
                onChange={(e) =>
                  updateQuestion(qIndex, "type", e.target.value)
                }
              >
                <MenuItem value="fill_in_blank">Fill in the blank</MenuItem>
                <MenuItem value="multiple_choice">Multiple Choice</MenuItem>
              </TextField>

              {q.type === "fill_in_blank" && (
                <TextField
                  label="Correct Answer"
                  fullWidth
                  margin="normal"
                  value={q.answer}
                  onChange={(e) =>
                    updateQuestion(qIndex, "answer", e.target.value)
                  }
                />
              )}

              {q.type === "multiple_choice" && (
                <>
                  {q.options.map((opt, oIndex) => (
                    <div key={oIndex} style={{ display: "flex", gap: 8 }}>
                      <TextField
                        label={`Option ${oIndex + 1}`}
                        fullWidth
                        value={opt}
                        onChange={(e) =>
                          updateOption(qIndex, oIndex, e.target.value)
                        }
                      />
                      <IconButton
                        onClick={() => removeOption(qIndex, oIndex)}
                      >
                        <Delete />
                      </IconButton>
                    </div>
                  ))}
                  <Button onClick={() => addOption(qIndex)}>
                    Add Option
                  </Button>

                  <TextField
                    label="Correct Answer"
                    fullWidth
                    margin="normal"
                    value={q.answer}
                    onChange={(e) =>
                      updateQuestion(qIndex, "answer", e.target.value)
                    }
                  />
                </>
              )}
            </div>
          ))}

          <Button startIcon={<Add />} onClick={addQuestion} sx={{ mt: 2 }}>
            Add Question
          </Button>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleCreate}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
