const API_URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_API_LOCAL
    : import.meta.env.VITE_API_PROD;

/**
 * Upload a media file (audio, video, image) to the server
 * @param {File} file - File object from input
 * @param {string} type - 'audio' | 'video' | 'image'
 * @returns {string} URL of uploaded media
 */
export const uploadMedia = async (file, type) => {
  if (!file) throw new Error("No file provided");

  const formData = new FormData();
  formData.append("media", file);
  formData.append("type", type);

  const res = await fetch(`${API_URL}/media/upload`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to upload media");

  // Return the URL of uploaded file (matches backend response)
  return data.media.url;
};
