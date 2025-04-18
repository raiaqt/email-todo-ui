import api from "./api";
import logout from "./logout";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchTasks = async (setLoading: (loading: boolean) => void) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (!accessToken) {
      alert("Please log in again.");
      logout();
      return;
    }

    let lastUpdatedStr = localStorage.getItem("lastUpdated");
    if (!lastUpdatedStr) {
      // if lastUpdated not found, default to 12 hours ago
      lastUpdatedStr = new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString();
    }
    const lastUpdatedDate = new Date(lastUpdatedStr);
    const now = new Date();
    const newLastUpdated = new Date().toISOString();
    const batchDurationMs = 12 * 60 * 60 * 1000;
    let batchEnd = now;
    const newTasks: { deadline: string; detailed_tasks: string; from: string; subject: string; summary: string; isNew: boolean }[] = [];
    while (batchEnd > lastUpdatedDate) {
      const batchStartTime = Math.max(batchEnd.getTime() - batchDurationMs, lastUpdatedDate.getTime());
      const batchStart = new Date(batchStartTime);
      if (batchStart.getTime() === batchEnd.getTime()) break;
      const response = await api.post(
        `${API_URL}/fetch-emails`,
        {
          access_token: accessToken,
          refresh_token: refreshToken,
          fetch_from: batchStart.toISOString(),
          fetch_to: batchEnd.toISOString(),
        },
        { headers: { "Content-Type": "application/json" } }
      );
      const tasksFromBatch = response.data.tasks.map((task: { deadline: string; detailed_tasks: string; from: string; subject: string; summary: string; }) => ({
        ...task,
        isNew: true,
      }));
      newTasks.push(...tasksFromBatch);
      batchEnd = batchStart;
      // Immediately update localStorage with new tasks from this batch
      const existingLocal = localStorage.getItem("tasks");
      let mergedLocal = existingLocal ? JSON.parse(existingLocal) : [];
      mergedLocal = mergedLocal.concat(tasksFromBatch);
      mergedLocal.sort((a: { deadline: string }, b: { deadline: string }) => {
        let timeA = new Date(a.deadline).getTime();
        let timeB = new Date(b.deadline).getTime();
        if (a.deadline === "No deadline" || isNaN(timeA)) timeA = Infinity;
        if (b.deadline === "No deadline" || isNaN(timeB)) timeB = Infinity;
        return timeA - timeB;
      });
      localStorage.setItem("tasks", JSON.stringify(mergedLocal));
    }

    const mergedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    localStorage.setItem("lastUpdated", newLastUpdated);
    setLoading(false);
    return { tasks: mergedTasks };
  } catch (error) {
    console.error("Error while fetching emails:", error);
    setLoading(false);
    throw error;
  }
};
