import {
  Button,
  TextField,
  MenuItem,
  IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import MediaUploader from "./MediaUploader.jsx";

const CONTENT_TYPES = ["text", "audio", "video", "image"];

export default function CourseContentList({ contents, onChange }) {
  const update = (index, field, value) => {
    const updated = [...contents];
    updated[index][field] = value;
    onChange(updated);
  };

  const addContent = () => {
    onChange([...contents, { title: "", type: "", file: "" }]);
  };

  const removeContent = (index) => {
    onChange(contents.filter((_, i) => i !== index));
  };

  return (
    <>
      <h4>Course Contents</h4>

      {contents.map((content, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            gap: 10,
            alignItems: "center",
            marginBottom: 10,
            flexWrap: "wrap",
          }}
        >
          <TextField
            label="Title"
            value={content.title}
            onChange={(e) => update(index, "title", e.target.value)}
            fullWidth
          />

          <TextField
            label="Type"
            select
            value={content.type}
            onChange={(e) => update(index, "type", e.target.value)}
            style={{ minWidth: 130 }}
          >
            {CONTENT_TYPES.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>

          {content.type === "text" && (
            <TextField
              label="Text Content"
              value={content.file}
              onChange={(e) => update(index, "file", e.target.value)}
              fullWidth
            />
          )}

          {content.type && content.type !== "text" && (
            <MediaUploader
              type={content.type}
              value={content.file}
              onUpload={(url) => update(index, "file", url)}
            />
          )}

          <IconButton color="error" onClick={() => removeContent(index)}>
            <Delete />
          </IconButton>
        </div>
      ))}

      <Button variant="outlined" onClick={addContent}>
        + Add Course Content
      </Button>
    </>
  );
}
