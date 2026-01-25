const API_URL = import.meta.env.MODE === "development"
  ? import.meta.env.VITE_API_LOCAL
  : import.meta.env.VITE_API_PROD;

export const createAssignment = async (assignmentData) => {
  const res = await fetch(`${API_URL}/assignments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(assignmentData)
  });
  return res.json();
};

export const getAssignments = async () => {
  const res = await fetch(`${API_URL}/assignments`);
  return res.json();
};
