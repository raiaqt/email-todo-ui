import React, { useState, useEffect } from "react";
import "./TaskList.css";
import InboxIcon from "@mui/icons-material/Inbox";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import EmailIcon from "@mui/icons-material/Email";
import TaskCard from "../TaskCard/TaskCard";
import LastUpdated from "../LastUpdated/LastUpdated";
import connectGmail from "../../api/connectGmail";
import { Task } from "../../interface";

const loadingCaptions = [
  "Hold tight, email ninjas at work!",
  "Counting emails like they're treasure...",
  "Polishing your inbox with a magic wand...",
  "Herding cats and emails simultaneously!",
];
interface TaskListProps {
  error?: boolean;
  fetchTasks: () => void;
  loading?: boolean;
  setShowAddTask: (show: boolean) => void;
  showAddTask: boolean;
  isGmailConnected: boolean;
  onSelectTask: (task: Task, index: number) => void;
  setTasks: (tasks: Task[]) => void;
  tasks: Task[] | null;
  safeTasks: Task[];
  togglePriority: (index: number) => void;
  handleArchiveTask: (index: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  error,
  fetchTasks,
  loading,
  setShowAddTask,
  showAddTask,
  isGmailConnected,
  onSelectTask,
  tasks,
  setTasks,
  safeTasks,
  togglePriority,
  handleArchiveTask,
}) => {
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [captionIndex, setCaptionIndex] = useState(0);

  const localStorageTasks = localStorage.getItem("tasks");
  const localStorageLastUpdated = localStorage.getItem("lastUpdated");

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      const parsedTasks = JSON.parse(storedTasks) as Task[];
      const tasksWithFields = parsedTasks.map((task: Task) => ({
        ...task,
        checked: task.checked !== undefined ? task.checked : false,
        priority:
          task.priority !== undefined
            ? task.priority
            : !task.deadline || task.deadline === "No deadline"
            ? false
            : new Date(task.deadline).setHours(0, 0, 0, 0) <=
              new Date().setHours(0, 0, 0, 0),
      }));
      setTasks(tasksWithFields);
    }
    const lastUpdatedTime = localStorage.getItem("lastUpdated");
    if (lastUpdatedTime) {
      setLastUpdated(lastUpdatedTime);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorageTasks, showAddTask]);

  useEffect(() => {
    setLastUpdated(localStorageLastUpdated);
  }, [localStorageLastUpdated]);

  // NEW: Cleanup new tasks on unmount
  useEffect(() => {
    return () => {
      const storedTasks = localStorage.getItem("tasks");
      if (storedTasks) {
        const updatedTasks = JSON.parse(storedTasks).map((task: Task) => {
          if (task.isNew) {
            delete task.isNew;
          }
          return task;
        });
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      }
    };
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, loadingCaptions.length]);

  const toggleTask = (index: number) => {
    const newTasks = [...safeTasks];
    newTasks[index].checked = !newTasks[index].checked;
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  // useEffect(() => {
  //   if (tasks && tasks.length > 0) {
  //     const firstNewTaskElement = document.querySelector(".task-card.new-task");
  //     if (firstNewTaskElement) {
  //       firstNewTaskElement.scrollIntoView({
  //         behavior: "smooth",
  //         block: "start",
  //       });
  //     }
  //   }
  // }, [tasks]);

  if (loading && (!tasks || tasks.length === 0)) {
    return (
      <div className="placeholder">
        <div className="spinner"></div>
        <p className="loading-text">{loadingCaptions[captionIndex]}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="placeholder error">
        <ErrorOutlineIcon fontSize="large" color="error" />
        <p>Oops! Something went wrong while fetching your tasks.</p>
      </div>
    );
  }

  if (tasks === null && !isGmailConnected) {
    return (
      <div className="placeholder empty">
        <InboxIcon fontSize="large" color="disabled" />
        <p>You have not synced your emails yet.</p>
        <button
          className="sync-button"
          onClick={connectGmail}
          style={{
            backgroundColor: "#EA4335",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <EmailIcon
            style={{ marginRight: 8, height: 20, width: 20, color: "#fff" }}
          />
          Connect with Gmail
        </button>
        <p>or</p>
        <button className="sync-button" onClick={() => setShowAddTask(true)}>
          Add task via Sortify
        </button>
      </div>
    );
  }

  if (tasks === null) {
    return (
      <div className="placeholder empty">
        <InboxIcon fontSize="large" color="disabled" />
        <p>You have not synced your emails yet.</p>
        <button className="sync-button" onClick={fetchTasks}>
          Click here to sync
        </button>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="placeholder empty">
        <InboxIcon fontSize="large" color="disabled" />
        <p>No tasks on your list. Enjoy your day!</p>
        <button className="sync-button" onClick={fetchTasks}>
          Or click here to load more
        </button>
      </div>
    );
  }

  return (
    <div className="task-list">
      <LastUpdated loading={loading} lastUpdated={lastUpdated} />
      {safeTasks.map((task, index) => (
        <TaskCard
          key={index}
          task={task}
          isDone={task.checked}
          isPriority={task.priority}
          toggleTask={() => toggleTask(index)}
          togglePriority={() => togglePriority(index)}
          handleArchiveTask={() => handleArchiveTask(index)}
          onSelectTask={() => onSelectTask(task, index)}
          index={index}
        />
      ))}
    </div>
  );
};

export default TaskList;
