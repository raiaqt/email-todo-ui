// ToDoList.tsx
import React, { useState, useEffect } from "react";
import TaskList from "./TaskList/TaskList";
import ArchiveList from "./ArchiveList/ArchiveList";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import SettingsIcon from "@mui/icons-material/Settings";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ArchiveIcon from "@mui/icons-material/Archive";
import AddTaskModal from "./AddTaskModal/AddTaskModal";
import ConfigPanel from "./ConfigPanel/ConfigPanel";
import { fetchTasks } from "../api/task";
import logo from "../assets/logo.png";
import styles from "./ToDoList.module.css";

interface ToDoListProps {
  gmailLoading: boolean;
  gmailSuccess: boolean;
}

const ToDoList: React.FC<ToDoListProps> = ({ gmailLoading, gmailSuccess }) => {
  const [loading, setLoading] = useState(gmailLoading);
  const [captionIndex, setCaptionIndex] = useState(0);
  const [activeView, setActiveView] = useState<
    "dashboard" | "archived" | "config"
  >("dashboard");
  const [showAddTask, setShowAddTask] = useState(false);
  const [isGmailConnected, setIsGmailConnected] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("gmailEmail") as string;
    setIsGmailConnected(!!email);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gmailLoading]);

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

  // useEffect(() => {
  //   if (gmailSuccess || isGmailConnected) {
  //     handlefetchTasks();
  //   }
  // }, [gmailSuccess, isGmailConnected]);

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

  const renderPanel = () => {
    if (activeView === "dashboard") {
      return (
        <TaskList
          fetchTasks={handlefetchTasks}
          loading={loading}
          setShowAddTask={setShowAddTask}
          showAddTask={showAddTask}
          isGmailConnected={isGmailConnected || gmailSuccess}
        />
      );
    }
    if (activeView === "archived") {
      return <ArchiveList />;
    }
    if (activeView === "config") {
      return <ConfigPanel />;
    }
    return null;
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.appHeader}>
        <div className={styles.appLeft}>
          <img src={logo} alt="Sortify logo" className={styles.logoIcon} />
          <span className={styles.logoText}>Sortify</span>
        </div>
        <div className={styles.appRight}>
          <div className={styles.taskButtons}>
            <div className={styles.refreshContainer}>
              <button
                className={styles.addButton}
                onClick={() => setShowAddTask(true)}
                disabled={loading || activeView !== "dashboard"}
              >
                <AddIcon />
              </button>
            </div>
            <div className={styles.refreshContainer}>
              <button
                className={styles.refreshButton}
                onClick={handlefetchTasks}
                disabled={
                  !(isGmailConnected && !gmailSuccess) ||
                  loading ||
                  activeView !== "dashboard"
                }
              >
                <RefreshIcon />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className={styles.dashboardBody}>
        <div className={styles.todoContainer}>
          <main className={styles.dashboardPanel}>
            <div className={styles.titleRow}>
              <div className={styles.tabs}>
                <button
                  className={`${styles.tab} ${
                    activeView === "dashboard" ? styles.active : ""
                  }`}
                  onClick={() => setActiveView("dashboard")}
                >
                  <ListAltIcon
                    fontSize="small"
                    style={{ marginRight: "8px" }}
                  />
                  To Do
                </button>
                <button
                  className={`${styles.tab} ${
                    activeView === "archived" ? styles.active : ""
                  }`}
                  onClick={() => setActiveView("archived")}
                >
                  <ArchiveIcon
                    fontSize="small"
                    style={{ marginRight: "8px" }}
                  />
                  Archived
                </button>
                <button
                  className={`${styles.tab} ${
                    activeView === "config" ? styles.active : ""
                  }`}
                  onClick={() => setActiveView("config")}
                >
                  <SettingsIcon
                    fontSize="small"
                    style={{ marginRight: "8px" }}
                  />
                  Settings
                </button>
              </div>
              <div className={styles.taskButtons}>
                <div className={styles.refreshContainer}>
                  <button
                    className={styles.addButton}
                    onClick={() => setShowAddTask(true)}
                    disabled={loading || activeView !== "dashboard"}
                  >
                    <AddIcon />
                  </button>
                </div>
                <div className={styles.refreshContainer}>
                  <button
                    className={styles.refreshButton}
                    onClick={handlefetchTasks}
                    disabled={
                      (!isGmailConnected && !gmailSuccess) ||
                      loading ||
                      activeView !== "dashboard"
                    }
                  >
                    <RefreshIcon />
                  </button>
                </div>
              </div>
            </div>
            {loading && activeView === "dashboard" ? (
              <div className={styles.loadingWrapper}>
                <div className={styles.spinner}></div>
                <p className={styles.loadingText}>
                  {loadingCaptions[captionIndex]}
                </p>
              </div>
            ) : (
              renderPanel()
            )}
          </main>
        </div>

        <AddTaskModal
          show={showAddTask}
          onClose={() => setShowAddTask(false)}
        />
      </div>

      {/* Footer nav for mobile */}
      <div className={styles.mobileNav}>
        <button
          className={`${styles.navButton} ${
            activeView === "dashboard" ? styles.activeNav : ""
          }`}
          onClick={() => setActiveView("dashboard")}
        >
          <ListAltIcon fontSize="small" />
        </button>
        <button
          className={`${styles.navButton} ${
            activeView === "archived" ? styles.activeNav : ""
          }`}
          onClick={() => setActiveView("archived")}
        >
          <ArchiveIcon fontSize="small" />
        </button>
        <button
          className={`${styles.navButton} ${
            activeView === "config" ? styles.activeNav : ""
          }`}
          onClick={() => setActiveView("config")}
        >
          <SettingsIcon fontSize="small" />
        </button>
      </div>
    </div>
  );
};

export default ToDoList;
