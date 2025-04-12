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

    const lastUpdated = localStorage.getItem("lastUpdated");

    const response = await api.post(
      `${API_URL}/fetch-emails`,
      {
        access_token: accessToken,
        refresh_token: refreshToken,
        last_updated: lastUpdated,
      },
      { headers: { "Content-Type": "application/json" } }
    );

    const newTasks = response.data.tasks.map(
      (task: {
        deadline: string;
        detailed_tasks: string;
        from: string;
        subject: string;
        summary: string;
      }) => ({
        ...task,
        isNew: true,
      })
    );

    const storedTasks = localStorage.getItem("tasks");
    let mergedTasks;
    if (storedTasks) {
      mergedTasks = JSON.parse(storedTasks).concat(newTasks);
    } else {
      mergedTasks = newTasks;
    }

    mergedTasks.sort((a: { deadline: string }, b: { deadline: string }) => {
      let timeA = new Date(a.deadline).getTime();
      let timeB = new Date(b.deadline).getTime();
      if (a.deadline === "No deadline" || isNaN(timeA)) timeA = Infinity;
      if (b.deadline === "No deadline" || isNaN(timeB)) timeB = Infinity;
      return timeA - timeB;
    });

    console.log("mergedTasks", mergedTasks);

    localStorage.setItem("tasks", JSON.stringify(mergedTasks));
    localStorage.setItem("lastUpdated", new Date().toISOString());
    setLoading(false);
    return response.data;
  } catch (error) {
    console.error("Error while fetching emails:", error);
    setLoading(false);
    throw error;
  }
};
