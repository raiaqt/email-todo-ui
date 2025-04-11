import React, { useState, useEffect } from "react";
import "./TaskList.css";
import InboxIcon from "@mui/icons-material/Inbox";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import TaskCard from "../TaskCard/TaskCard";

interface Task {
  deadline: string;
  detailed_tasks: string;
  from: string;
  subject: string;
  summary: string;
  checked: boolean;
  priority: boolean;
  isNew?: boolean;
}

interface TaskListProps {
  error?: boolean;
  fetchTasks: () => void;
  loading?: boolean;
}

const TaskList: React.FC<TaskListProps> = ({ error, fetchTasks, loading }) => {
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
    if (!loading) {
      const storedTasks = localStorage.getItem("tasks");
      if (storedTasks) {
        const parsedTasks = JSON.parse(storedTasks) as Task[];
        const tasksWithFields = parsedTasks.map((task: Task) => ({
          ...task,
          checked: task.checked !== undefined ? task.checked : false,
          priority: task.priority !== undefined ? task.priority : (!task.deadline || task.deadline === "No deadline" ? false : new Date(task.deadline).toDateString() === new Date().toDateString())
        }));
        setTasks(tasksWithFields);
      }
      const lastUpdatedTime = localStorage.getItem("lastUpdated");
      if (lastUpdatedTime) {
        setLastUpdated(lastUpdatedTime);
      }
    }
  }, [loading]);

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

  const toggleTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks[index].checked = !newTasks[index].checked;
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const togglePriority = (index: number) => {
    const newTasks = [...tasks];
    newTasks[index].priority = !newTasks[index].priority;
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  // NEW: Function to archive a task
  const handleArchiveTask = (index: number) => {
    const taskToArchive = tasks[index];
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    const currentArchive = localStorage.getItem("archive");
    const archiveList = currentArchive ? JSON.parse(currentArchive) : [];
    archiveList.push(taskToArchive);
    localStorage.setItem("archive", JSON.stringify(archiveList));
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
          Click here to sync
        </button>
      </div>
    );
  }

  return (
    <div className="task-list">
      <div className="last-updated" style={{ fontSize: '0.8em', color: '#666', marginBottom: '0', textAlign: 'center' }}>
        {loading ? "Creating latest tasks..." : `Last updated ${formatRelativeTime(lastUpdated)}`}
      </div>
      {tasks.map((task, index) => (
        <TaskCard
          key={index}
          task={task}
          isDone={task.checked}
          isPriority={task.priority}
          toggleTask={() => toggleTask(index)}
          togglePriority={() => togglePriority(index)}
          handleArchiveTask={() => handleArchiveTask(index)}
        />
      ))}
    </div>
  );
};

export default TaskList;
