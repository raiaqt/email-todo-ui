import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskList from "./TaskList/TaskList";
import styles from "./ToDoList.module.css";
import { googleLogout } from "@react-oauth/google";
import logo from "../assets/logo.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const API_URL = import.meta.env.VITE_API_URL;

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

const ToDoList: React.FC<ToDoListProps> = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [captionIndex, setCaptionIndex] = useState(0);
  const loadingCaptions = [
    "Hold tight, email ninjas at work!",
    "Counting emails like they're treasure...",
    "Polishing your inbox with a magic wand...",
    "Herding cats and emails simultaneously!",
  ];

  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("idToken");
    window.location.reload();
  };

  const fetchTasks = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        console.error("Access token is missing. Please log in again.");
        return;
      }

      setLoading(true);

      const response = await axios.post(
        `${API_URL}/fetch-emails`,
        { access_token: accessToken },
        { headers: { "Content-Type": "application/json" } }
      );

      setTasks(response.data.tasks);
      setLoading(false);
      console.log("Fetched emails:", response.data);
    } catch (error) {
      console.error("Error while fetching emails:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    if (!loading) {
      setCaptionIndex(0);
      return;
    }
    const timer = setInterval(() => {
      setCaptionIndex((prev) => (prev + 1) % loadingCaptions.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [loading]);

  return (
    <div className={styles.container}>
      {/* Top App Header */}
      <header className={styles.appHeader}>
        <div className={styles.appLeft}>
          <img src={logo} alt="Sortify logo" className={styles.logoIcon} />
          <span className={styles.logoText}>Sortify</span>
        </div>
        <div className={styles.appRight}>
          <button className={styles.upgradeButton} onClick={handleLogout}>
            Logout
          </button>
          <div className={styles.avatar}>
            <AccountCircleIcon />
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className={styles.dashboardPanel}>
        <div className={styles.tabs}>
          <button className={`${styles.tab} ${styles.active}`}>All</button>
          <button className={styles.tab}>Today</button>
          <button className={styles.tab}>Completed</button>
        </div>

        {loading ? (
          <div className={styles.loadingWrapper}>
            <div className={styles.spinner}></div>
            <p className={styles.loadingText}>
              {loadingCaptions[captionIndex]}
            </p>
          </div>
        ) : (
          <TaskList tasks={tasks} />
        )}
      </main>
    </div>
  );
};

export default ToDoList;
