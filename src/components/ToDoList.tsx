import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskList from "./TaskList/TaskList";
import styles from "./ToDoList.module.css";
import { googleLogout } from "@react-oauth/google";
import logo from "../assets/logo.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import RefreshIcon from "@mui/icons-material/Refresh";
import ArchiveList from "./ArchiveList/ArchiveList";

const API_URL = import.meta.env.VITE_API_URL;

interface ToDoListProps {
  user: string;
}

const ToDoList: React.FC<ToDoListProps> = () => {
  const [loading, setLoading] = useState(false);
  const [captionIndex, setCaptionIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("All");
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

      const lastUpdated = localStorage.getItem("lastUpdated");

      const response = await axios.post(
        `${API_URL}/fetch-emails`,
        { access_token: accessToken, last_updated: lastUpdated },
        { headers: { "Content-Type": "application/json" } }
      );

      const newTasks = response.data.tasks.map((task: { deadline: string; detailed_tasks: string; from: string; subject: string; summary: string }) => ({ ...task, isNew: true }));
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
      localStorage.setItem("lastUpdated", new Date().toISOString());
      setLoading(false);
      console.log("Fetched emails:", response.data);
    } catch (error) {
      console.error("Error while fetching emails:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loading) {
      setCaptionIndex(0);
      return;
    }
    const timer = setInterval(() => {
      setCaptionIndex((prev) => (prev + 1) % loadingCaptions.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [loading, loadingCaptions.length]);

  const storedTasks = localStorage.getItem("tasks");
  const tasksExist = storedTasks ? JSON.parse(storedTasks).length > 0 : false;

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
          {/* <div className={styles.avatar}>
            <AccountCircleIcon />
          </div> */}
        </div>
      </header>

      {/* Main Dashboard */}
      <main className={styles.dashboardPanel}>
        <div className={styles.titleRow}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${
                activeTab === "All" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("All")}
            >
              All
            </button>
            {/* <button
              className={`${styles.tab} ${
                activeTab === "Today" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("Today")}
            >
              Today
            </button>
            <button
              className={`${styles.tab} ${
                activeTab === "Completed" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("Completed")}
            >
              Completed
            </button> */}
            <button
              className={`${styles.tab} ${
                activeTab === "Archived" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("Archived")}
            >
              Archived
            </button>
          </div>
          <div className={styles.refreshContainer}>
            {activeTab !== "Archived" && (
              <button
                className={styles.refreshButton}
                onClick={fetchTasks}
                disabled={loading}
              >
                <RefreshIcon />
              </button>
            )}
          </div>
        </div>
        {activeTab === "Archived" ? (
          <ArchiveList />
        ) : tasksExist ? (
          <TaskList fetchTasks={fetchTasks} loading={loading} />
        ) : loading ? (
          <div className={styles.loadingWrapper}>
            <div className={styles.spinner}></div>
            <p className={styles.loadingText}>
              {loadingCaptions[captionIndex]}
            </p>
          </div>
        ) : (
          <TaskList fetchTasks={fetchTasks} loading={loading} />
        )}
      </main>
    </div>
  );
};

export default ToDoList;
