const API_URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_API_LOCAL
    : import.meta.env.VITE_API_PROD;

/**
 * Create a new session
 * @param {Object} sessionData - { title, type, level, course_content }
 */
export const createSession = async (sessionData) => {
  const res = await fetch(`${API_URL}/sessions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sessionData), // course_content contains uploaded media URLs
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to create session");

  return data;
};

/**
 * Fetch all sessions
 */
export const fetchSessions = async () => {
  const res = await fetch(`${API_URL}/sessions`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch sessions");
  return data;
};
