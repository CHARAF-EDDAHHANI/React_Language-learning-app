const API_URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_API_LOCAL
    : import.meta.env.VITE_API_PROD;

export const createSession = async (sessionData) => {
  const res = await fetch(`${API_URL}/sessions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", },
    body: JSON.stringify(sessionData),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to create session");
  }

  return res.json();
};

export const fetchSessions = async () => {
  const res = await fetch(`${API_URL}/sessions`);

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to fetch sessions");
  }

  return res.json();
};
