import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const addTask = async (sendTo: string, task: string, deadline?: string) => {
  try {
    const sender_name = localStorage.getItem("name") || "";
    const sender_email = localStorage.getItem("email") || "";

    console.log("sender_name", sender_name);

    const payload = {
      sender_name,
      sender_email,
      recepient_email: sendTo,
      task,
      ...(deadline ? { deadline } : {})
    };

    const response = await axios.post(`${API_URL}/send-email`, payload, {
      headers: { "Content-Type": "application/json" }
    });
    return response.data;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
