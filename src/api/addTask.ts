import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const sendTask = async (
  sendTo: string,
  task: string,
  deadline?: string
) => {
  try {
    const sender_name = localStorage.getItem("name") || "";
    const sender_email = localStorage.getItem("email") || "";

    console.log("sender_name", sender_name);

    const payload = {
      sender_name,
      sender_email,
      recepient_email: sendTo,
      task,
      ...(deadline ? { deadline } : {}),
    };

    const response = await axios.post(`${API_URL}/send-email`, payload, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export const addTask = async ({
  deadline,
  summary,
}: {
  deadline: string;
  summary: string;
}) => {
  try {
    const timestamp = Date.now();
    const newTasks = [
      {
        deadline: deadline || "N/A",
        summary,
        from: localStorage.getItem("name") || "",
        subject: "Task Added",
        isNew: true,
        createdAt: timestamp,
      },
    ];

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

    localStorage.setItem("tasks", JSON.stringify(mergedTasks));

    setTimeout(() => {
      const stored = localStorage.getItem("tasks");
      if (stored) {
        const tasksList = JSON.parse(stored);
        tasksList.forEach((task: { createdAt: number; isNew: boolean }) => {
          if (task.createdAt === timestamp) {
            task.isNew = false;
          }
        });
        localStorage.setItem("tasks", JSON.stringify(tasksList));
      }
    }, 10000);

    return newTasks;
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};
