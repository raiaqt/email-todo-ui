import React, { useState } from "react";
import axios from "axios";
import TaskList from "./TaskList/TaskList";
import styles from "./ToDoList.module.css";
import { googleLogout } from "@react-oauth/google";

interface Task {
  deadline: string;
  detailed_tasks: string;
  from: string;
  subject: string;
  summary: string;
}

interface ToDoListProps {
  user: string;
}

const ToDoList: React.FC<ToDoListProps> = ({ user }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("idToken");
    window.location.reload();
  };

  const handleFetchEmails = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        console.error("Access token is missing. Please log in again.");
        return;
      }
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5174/fetch-emails",
        {
          access_token: accessToken, // Pass the token in the request body
          //   refresh_token: refreshToken, // Pass the token in the request body
        },
        {
          headers: {
            "Content-Type": "application/json", // Set the content type
          },
        }
      );

      setTasks(response.data.tasks);
      setLoading(false);

      console.log("Fetched emails:", response.data);
      // Handle the response data (e.g., update state or display it)
    } catch (error) {
      console.error("Error while fetching emails:", error);
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h3 className={styles.header}>Welcome, {user}</h3>
        <div>
          <button className={styles.button} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      <button className={`${styles.button} ${styles.createTodoButton}`} onClick={handleFetchEmails}>
        Create Todo
      </button>
      {loading ? <div className={styles.spinner}></div> : <TaskList tasks={tasks} />}
    </div>
  );
};

export default ToDoList;
