import { useState } from "react";
import { createSession as apiCreateSession } from "../api/session.js";
import { toast } from "react-toastify";

export const useSession = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createSession = async (sessionData) => {
    setLoading(true);
    setError(null);

    try {
      const newSession = await apiCreateSession(sessionData);
      toast.success("Session created successfully");
      return newSession;
    } catch (err) {
      const message = err?.message || "Failed to create session";
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createSession, loading, error };
};
