import { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";
import { toast } from "react-toastify";
import { createSession as apiCreateSession } from "../api/session.js";
import CourseContentList from "./CourseContentList.jsx";

const sessionFields = [
  { name: "title", label: "Title", type: "text" },
  {
    name: "type",
    label: "Session Type",
    type: "select",
    options: ["Reading", "Comprehension", "Grammar", "Speaking", "Listening"],
  },
  {
    name: "level",
    label: "Level",
    type: "select",
    options: ["Beginner", "Intermediate", "Advanced"],
  },
];

export default function SessionBoard() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sessionData, setSessionData] = useState({
    title: "",
    type: "",
    level: "",
    course_content: [],
  });

  const handleFieldChange = (name, value) => {
    setSessionData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async () => {
    const { title, type, level } = sessionData;

    if (!title || !type || !level) {
      toast.error("Please fill all session fields");
      return;
    }

    setLoading(true);
    try {
      await apiCreateSession(sessionData);
      toast.success("Session created successfully");
      setSessionData({ title: "", type: "", level: "", course_content: [] });
      setOpen(false);
    } catch (err) {
      toast.error(err.message || "Failed to create session");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Add Session
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add New Session</DialogTitle>

        <DialogContent>
          {sessionFields.map((field) => (
            <TextField
              key={field.name}
              label={field.label}
              select={field.type === "select"}
              value={sessionData[field.name]}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              fullWidth
              margin="normal"
            >
              {field.options?.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          ))}

          <CourseContentList
            contents={sessionData.course_content}
            onChange={(course_content) =>
              setSessionData((prev) => ({ ...prev, course_content }))
            }
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCreate} disabled={loading} variant="contained">
            {loading ? "Creating..." : "Create"}
          </Button>
          <Button onClick={() => setOpen(false)} variant="outlined">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
