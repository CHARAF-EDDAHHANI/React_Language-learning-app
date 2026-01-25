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

export default function SessionBoard({ onCreateSession, loading }) {
  const [open, setOpen] = useState(false);
  const [sessionData, setSessionData] = useState({
    title: "",
    level: "",
    type: "",
  });

  const sessionFields = [
    { name: "title", label: "Title", type: "text" },
    { name: "type", label: "Session Type", type: "select", options: ["Reading", "Comprehension", "Grammar", "Speaking", "Listening"],},
    { name: "level", label: "Level", type: "select", options: ["Beginner", "Intermediate", "Advanced"], },
        ];

  const handleChange = (e) => {
    setSessionData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreate = async () => {
    if (!sessionData.title || !sessionData.type || !sessionData.level) return;
    await onCreateSession(sessionData);
    setSessionData({ title: "", type: "", level: "" });
    setOpen(false);
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
              name={field.name}
              label={field.label}
              fullWidth
              margin="normal"
              value={sessionData[field.name]}
              onChange={handleChange}
              select={field.type === "select"}>
              {field.type === "select" &&
                field.options.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
            </TextField>
          ))}
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleCreate}
            disabled={loading}>
            {loading ? "Creating..." : "Create"}
          </Button>
          <Button variant="outlined" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
