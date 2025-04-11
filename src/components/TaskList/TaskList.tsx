import React, { useState, useEffect } from "react";
import "./TaskList.css";

import InboxIcon from "@mui/icons-material/Inbox";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ArchiveIcon from "@mui/icons-material/Archive";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

interface Task {
  deadline: string;
  detailed_tasks: string;
  from: string;
  subject: string;
  summary: string;
}

interface TaskListProps {
  error?: boolean;
  fetchTasks: () => void;
}

const TaskList: React.FC<TaskListProps> = ({ error, fetchTasks }) => {
  const [completed, setCompleted] = useState<boolean[]>([]);
  const [priority, setPriority] = useState<boolean[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const formatRelativeTime = (timestamp: string | null): string => {
    if (!timestamp) return "Unknown";
    const updatedTime = new Date(timestamp);
    if (isNaN(updatedTime.getTime())) {
      return "Invalid date";
    }
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - updatedTime.getTime()) / 1000);
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  };

  useEffect(() => {
    setCompleted(new Array(tasks.length).fill(false));
    setPriority(
      tasks.map((task) =>
        Boolean(task.deadline && task.deadline !== "No deadline")
      )
    );
  }, [tasks]);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
    const lastUpdatedTime = localStorage.getItem("lastUpdated");
    if (lastUpdatedTime) {
      setLastUpdated(lastUpdatedTime);
    }
  }, []);

  const toggleTask = (index: number) => {
    setCompleted((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  const togglePriority = (index: number) => {
    setPriority((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  if (error) {
    return (
      <div className="placeholder error">
        <ErrorOutlineIcon fontSize="large" color="error" />
        <p>Oops! Something went wrong while fetching your tasks.</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="placeholder empty">
        <InboxIcon fontSize="large" color="disabled" />
        <p>You have not synced your emails yet.</p>
        <button className="sync-button" onClick={fetchTasks}>
          Click here to sync past 12h emails
        </button>
      </div>
    );
  }

  return (
    <div className="task-list">
      <div className="last-updated" style={{ fontSize: '0.9em', color: '#666', marginBottom: '0.5em', textAlign: 'center' }}>
        Last updated {formatRelativeTime(lastUpdated)}
      </div>
      {tasks.map((task, index) => {
        const isDone = completed[index];
        const isPriority = priority[index];

        return (
          <div
            key={index}
            className={`task-card ${isPriority ? "priority" : ""} ${
              isDone ? "done" : ""
            }`}
          >
            <label className="task-left">
              <div className="task-checkbox">
                <input
                  type="checkbox"
                  checked={isDone}
                  onChange={() => toggleTask(index)}
                />
              </div>
              <div className="task-content">
                <p className={`task-title ${isDone ? "completed" : ""}`}>
                  {task.summary}
                </p>
                <p className="task-meta">
                  {task.deadline && /^\d{4}-\d{2}-\d{2}$/.test(task.deadline)
                    ? task.deadline
                    : "No deadline"}
                </p>
              </div>
            </label>

            <div className="task-actions">
              <button className="task-btn snooze">
                <ArchiveIcon />
              </button>
              <button
                className="task-btn prioritize"
                onClick={() => togglePriority(index)}
              >
                {isPriority ? <StarIcon /> : <StarBorderIcon />}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TaskList;
