import React, { useState, useEffect } from "react";
import "./TaskList.css";
import InboxIcon from "@mui/icons-material/Inbox";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import EmailIcon from "@mui/icons-material/Email";
import TaskCard from "../TaskCard/TaskCard";
import LastUpdated from "../LastUpdated/LastUpdated";
import connectGmail from "../../api/connectGmail";

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
  isGmailConnected: boolean;
  setShowAddTask: (show: boolean) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  error,
  fetchTasks,
  loading,
  isGmailConnected,
  setShowAddTask,
}) => {
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    if (!loading) {
      const storedTasks = localStorage.getItem("tasks");
      console.log("storedTasks", storedTasks);
      if (storedTasks) {
        const parsedTasks = JSON.parse(storedTasks) as Task[];
        console.log("parsedTasks", parsedTasks);
        const tasksWithFields = parsedTasks.map((task: Task) => ({
          ...task,
          checked: task.checked !== undefined ? task.checked : false,
          priority:
            task.priority !== undefined
              ? task.priority
              : !task.deadline || task.deadline === "No deadline"
              ? false
              : new Date(task.deadline).toDateString() ===
                new Date().toDateString(),
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

  const safeTasks = tasks as Task[];

  const toggleTask = (index: number) => {
    const newTasks = [...safeTasks];
    newTasks[index].checked = !newTasks[index].checked;
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

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
    archiveList.push(taskToArchive);
    localStorage.setItem("archive", JSON.stringify(archiveList));
  };

  useEffect(() => {
    if (tasks && tasks.length > 0) {
      const firstNewTaskElement = document.querySelector(".task-card.new-task");
      if (firstNewTaskElement) {
        firstNewTaskElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  }, [tasks]);

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
          <EmailIcon style={{ marginRight: 8, height: 20, width: 20 }} />
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
        />
      ))}
    </div>
  );
};

export default TaskList;
