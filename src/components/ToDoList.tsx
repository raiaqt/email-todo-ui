import React, { useState, useEffect } from "react";
import TaskList from "./TaskList/TaskList";
import styles from "./ToDoList.module.css";
import logo from "../assets/logo.png";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import ArchiveList from "./ArchiveList/ArchiveList";
import { fetchTasks } from "../api/task";
import logout from "../api/logout";
import AddTaskModal from "./AddTaskModal/AddTaskModal";
import RefreshIcon from "@mui/icons-material/Refresh";
interface ToDoListProps {
  user: string;
}

const ToDoList: React.FC<ToDoListProps> = () => {
  const [loading, setLoading] = useState(false);
  const [captionIndex, setCaptionIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("All");
  const [showAddTask, setShowAddTask] = useState(false);
  const loadingCaptions = [
    "Hold tight, email ninjas at work!",
    "Counting emails like they're treasure...",
    "Polishing your inbox with a magic wand...",
    "Herding cats and emails simultaneously!",
  ];

  const handlefetchTasks = async () => {
    setLoading(true);
    await fetchTasks(setLoading);
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
          <button className={styles.upgradeButton} onClick={logout}>
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
              To Do
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
          <div className={styles.taskButtons}>
            <div className={styles.refreshContainer}>
              <button
                className={styles.addButton}
                onClick={() => setShowAddTask(true)}
                disabled={loading}
              >
                <AddIcon />
              </button>
            </div>
            <div className={styles.refreshContainer}>
              {activeTab !== "Archived" && (
                <button
                  className={styles.refreshButton}
                  onClick={handlefetchTasks}
                  disabled={loading}
                >
                  <RefreshIcon />
                </button>
              )}
            </div>
          </div>
        </div>
        {activeTab === "Archived" ? (
          <ArchiveList />
        ) : tasksExist ? (
          // <></>
          <TaskList fetchTasks={handlefetchTasks} loading={loading} />
        ) : loading ? (
          <div className={styles.loadingWrapper}>
            <div className={styles.spinner}></div>
            <p className={styles.loadingText}>
              {loadingCaptions[captionIndex]}
            </p>
          </div>
        ) : (
          // <></>
          <TaskList fetchTasks={handlefetchTasks} loading={loading} />
        )}
      </main>
      <AddTaskModal show={showAddTask} onClose={() => setShowAddTask(false)} />
    </div>
  );
};

export default ToDoList;
