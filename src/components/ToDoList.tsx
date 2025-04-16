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
import TaskDrawer from "./TaskDrawer/TaskDrawer";
import { fetchTasks } from "../api/task";
import logo from "../assets/logo.png";
import styles from "./ToDoList.module.css";
import { Task } from "../interface";

interface ToDoListProps {
  gmailLoading: boolean;
  gmailSuccess: boolean;
}

const ToDoList: React.FC<ToDoListProps> = ({ gmailLoading, gmailSuccess }) => {
  const [loading, setLoading] = useState(gmailLoading);
  const [activeView, setActiveView] = useState<
    "dashboard" | "archived" | "config"
  >("dashboard");
  const [showAddTask, setShowAddTask] = useState(false);
  const [isGmailConnected, setIsGmailConnected] = useState(false);
  const [selectedTask, setSelectedTask] = useState<{
    task: Task;
    index: number;
  } | null>(null);
  const [tasks, setTasks] = useState<Task[] | null>(null);


  useEffect(() => {
    const email = localStorage.getItem("gmailEmail") as string;
    setIsGmailConnected(!!email);
  }, [gmailLoading]);

  const handlefetchTasks = async () => {
    setLoading(true);
    await fetchTasks(setLoading);
  };

  const handleSelectTask = (task: Task, index: number) => {
    setSelectedTask({ task, index });
  };

  const renderPanel = () => {
    if (activeView === "dashboard") {
      return (
        <TaskList
          fetchTasks={handlefetchTasks}
          loading={loading}
          setShowAddTask={setShowAddTask}
          showAddTask={showAddTask}
          isGmailConnected={isGmailConnected || gmailSuccess}
          onSelectTask={(task, index) => handleSelectTask(task, index)}
          setTasks={setTasks}
          tasks={tasks}
          safeTasks={safeTasks}
          togglePriority={togglePriority}
          handleArchiveTask={handleArchiveTask}
        />
      );
    }
    if (activeView === "archived") {
      return <ArchiveList onSelectTask={(task, index) => handleSelectTask(task, index)} />;
    }
    if (activeView === "config") {
      return <ConfigPanel />;
    }
    return null;
  };

  const safeTasks = tasks as Task[];

  const togglePriority = (index: number) => {
    const newTasks = [...safeTasks];
    newTasks[index].priority = !newTasks[index].priority;
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  // NEW: Function to archive a task
  const handleArchiveTask = (index: number) => {
    const taskToArchive = safeTasks[index];
    const updatedTasks = safeTasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    const currentArchive = localStorage.getItem("archive");
    const archiveList = currentArchive ? JSON.parse(currentArchive) : [];
    archiveList.unshift(taskToArchive);
    localStorage.setItem("archive", JSON.stringify(archiveList));
  };

  return (
    <div className={styles.container}>
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
                  {" "}
                  <ListAltIcon
                    fontSize="small"
                    style={{ marginRight: "8px" }}
                  />{" "}
                  To Do
                </button>
                <button
                  className={`${styles.tab} ${
                    activeView === "archived" ? styles.active : ""
                  }`}
                  onClick={() => setActiveView("archived")}
                >
                  {" "}
                  <ArchiveIcon
                    fontSize="small"
                    style={{ marginRight: "8px" }}
                  />{" "}
                  Archived
                </button>
                <button
                  className={`${styles.tab} ${
                    activeView === "config" ? styles.active : ""
                  }`}
                  onClick={() => setActiveView("config")}
                >
                  {" "}
                  <SettingsIcon
                    fontSize="small"
                    style={{ marginRight: "8px" }}
                  />{" "}
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
            {renderPanel()}
          </main>

          {selectedTask && (
            <TaskDrawer
              task={selectedTask.task}
              onClose={() => setSelectedTask(null)}
              onArchive={() => handleArchiveTask(selectedTask.index)}
              onPrioritize={() => togglePriority(selectedTask.index)}
              index={selectedTask.index}
            />
          )}
        </div>

        <AddTaskModal
          show={showAddTask}
          onClose={() => setShowAddTask(false)}
        />
      </div>

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
