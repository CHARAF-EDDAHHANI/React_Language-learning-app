import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";

export default function AssignmentBoard({ onCreateAssignment }) {
  const [open, setOpen] = useState(false);
  const [assignmentData, setAssignmentData] = useState({
    title: "",
    level: ""
  });

  const assignmentTextField = [
    { name: "title", label: "Title", type: "text" },
    { name: "level", label: "Level", type: "text" }
  ];

  const handleChange = (e) => {
    setAssignmentData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleCreate = async () => {
    if (!assignmentData.title || !assignmentData.level) return;

    await onCreateAssignment(assignmentData);

    // reset form
    setAssignmentData({ title: "", level: "" });
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Create Assignment
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Create New Assignment</DialogTitle>
        <DialogContent>
          {assignmentTextField.map(field => (
            <TextField
              key={field.name}
              name={field.name}
              label={field.label}
              fullWidth
              margin="normal"
              value={assignmentData[field.name]}
              onChange={handleChange}
              select={field.type === "select"}
            >
              {field.type === "select" &&
                field.options?.map(option => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))
              }
            </TextField>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCreate}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
