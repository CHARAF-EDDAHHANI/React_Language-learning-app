import { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import { uploadMedia } from "../api/media.js";

/**
 * Reusable Media Uploader
 * Props:
 * - type: 'audio' | 'video' | 'image'
 * - value: current uploaded URL
 * - onUpload: function(url) → called when upload is successful
 */
export default function MediaUploader({ type, value, onUpload }) {
  const [uploading, setUploading] = useState(false);

  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadMedia(file, type);
      toast.success(`${type} uploaded successfully`);
      onUpload(url); // pass uploaded URL to parent
    } catch (err) {
      toast.error("Upload error: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <input
        type="file"
        accept={
          type === "image" ? "image/*" : type === "video" ? "video/*" : "audio/*"
        }
        style={{ display: "none" }}
        id={`file-upload-${type}`}
        onChange={handleChange}
      />
      <label htmlFor={`file-upload-${type}`}>
        <Button variant="outlined" component="span" disabled={uploading}>
          {uploading ? <CircularProgress size={20} /> : value ? "Change File" : `Upload ${type}`}
        </Button>
      </label>
      {value && (
        <span style={{ marginLeft: 10, fontSize: 14, wordBreak: "break-all" }}>
          {value.split("/").pop()}
        </span>
      )}
    </>
  );
}
