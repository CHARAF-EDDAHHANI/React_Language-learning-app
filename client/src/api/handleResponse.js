const API_URL = import.meta.env.MODE === "development"
  ? import.meta.env.VITE_API_LOCAL
  : import.meta.env.VITE_API_PROD;

const handleResponse = async (res) => {
  const data = await res.json();

  if (!res.ok) {
    return {
      ok: false,
      status: res.status,
      data: null,
      error: data?.message || "Something went wrong"
    };
  }

  return {
    ok: true,
    status: res.status,
    data: data.data,
    error: null
  };
};

// create session
export const createSession = async (sessionData) => {
  try {
    const res = await fetch(`${API_URL}/sessions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sessionData)
    });

    return await handleResponse(res);

  } catch {
    return {
      ok: false,
      status: 0,
      data: null,
      error: "Network error"
    };
  }
};

// fetch sessions
export const fetchSessions = async () => {
  try {
    const res = await fetch(`${API_URL}/sessions`);
    return await handleResponse(res);

  } catch {
    return {
      ok: false,
      status: 0,
      data: null,
      error: "Network error"
    };
  }
};
