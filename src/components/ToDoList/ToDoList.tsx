import React, { useState, useEffect } from "react";
import TaskList from "../TaskList/TaskList";
import ArchiveList from "../ArchiveList/ArchiveList";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import SettingsIcon from "@mui/icons-material/Settings";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ArchiveIcon from "@mui/icons-material/Archive";
import AddTaskModal from "../AddTaskModal/AddTaskModal";
import ConfigPanel from "../ConfigPanel/ConfigPanel";
import TaskDrawer from "../TaskDrawer/TaskDrawer";
import { fetchTasks } from "../../api/task";
import logo from "../../assets/logo.png";
import "./ToDoList.css";
import { Task } from "../../interface";

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
  const [mode, setMode] = useState("creative");
  const [refreshInterval, setRefreshInterval] = useState(1);

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

  useEffect(() => {
    if (isGmailConnected && !!localStorage.getItem("tasks")) {
      handlefetchTasks();
    }
  }, [isGmailConnected]);

  // NEW: Auto-refresh tasks based on refreshInterval (hours)
  useEffect(() => {
    if (isGmailConnected) {
      const intervalId = setInterval(() => handlefetchTasks(), refreshInterval * 60 * 60 * 1000);
      return () => clearInterval(intervalId);
    }
  }, [isGmailConnected, refreshInterval]);

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
      return (
        <ArchiveList
          onSelectTask={(task, index) => handleSelectTask(task, index)}
        />
      );
    }
    if (activeView === "config") {
      return <ConfigPanel mode={mode} setMode={setMode} refreshInterval={refreshInterval} setRefreshInterval={setRefreshInterval} />;
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

  const handleDeleteArchive = (index: number) => {
    const currentArchive = localStorage.getItem("archive");
    const archiveList = currentArchive ? JSON.parse(currentArchive) : [];
    archiveList.splice(index, 1);
    localStorage.setItem("archive", JSON.stringify(archiveList));
  };

  return (
    <div className={mode === "clean" ? "containerClean" : "container"}>
      <header className="appHeader">
        <div className="appLeft">
          <img src={logo} alt="Sortify logo" className="logoIcon" />
          <span className="logoText">Sortify</span>
        </div>
        <div className="appRight">
          <div className="taskButtons">
            <div className="refreshContainer">
              <button
                className="addButton"
                onClick={() => setShowAddTask(true)}
                disabled={loading || activeView !== "dashboard"}
              >
                <AddIcon />
              </button>
            </div>
            <div className="refreshContainer">
              <button
                className="refreshButton"
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

      <div className="dashboardBody">
        <div className="todoContainer">
          <main className="dashboardPanel">
            <div className="titleRow">
              <div className="tabs">
                <button
                  className={`tab ${
                    activeView === "dashboard" ? "active" : ""
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
                  className={`tab ${activeView === "archived" ? "active" : ""}`}
                  onClick={() => setActiveView("archived")}
                >
                  <ArchiveIcon
                    fontSize="small"
                    style={{ marginRight: "8px" }}
                  />
                  Archived
                </button>
                <button
                  className={`tab ${activeView === "config" ? "active" : ""}`}
                  onClick={() => setActiveView("config")}
                >
                  <SettingsIcon
                    fontSize="small"
                    style={{ marginRight: "8px" }}
                  />
                  Settings
                </button>
              </div>
              <div className="taskButtons">
                <div className="refreshContainer">
                  <button
                    className="addButton"
                    onClick={() => setShowAddTask(true)}
                    disabled={loading || activeView !== "dashboard"}
                  >
                    <AddIcon />
                  </button>
                </div>
                <div className="refreshContainer">
                  <button
                    className="refreshButton"
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
              hideButtons={activeView === "archived"}
              onDeleteArchive={handleDeleteArchive}
            />
          )}
        </div>

        <AddTaskModal
          show={showAddTask}
          onClose={() => setShowAddTask(false)}
        />
      </div>

      <div className="mobileNav">
        <button
          className={`navButton ${
            activeView === "dashboard" ? "activeNav" : ""
          }`}
          onClick={() => setActiveView("dashboard")}
        >
          <ListAltIcon fontSize="small" />
        </button>
        <button
          className={`navButton ${
            activeView === "archived" ? "activeNav" : ""
          }`}
          onClick={() => setActiveView("archived")}
        >
          <ArchiveIcon fontSize="small" />
        </button>
        <button
          className={`navButton ${activeView === "config" ? "activeNav" : ""}`}
          onClick={() => setActiveView("config")}
        >
          <SettingsIcon fontSize="small" />
        </button>
      </div>
    </div>
  );
};

export default ToDoList;
