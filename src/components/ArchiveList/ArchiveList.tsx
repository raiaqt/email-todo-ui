import React, { useState, useEffect } from "react";
import "./ArchiveList.css";
import InboxIcon from "@mui/icons-material/Inbox";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import TaskCard from "../TaskCard/TaskCard";

interface Task {
  deadline: string;
  detailed_tasks: string;
  from: string;
  subject: string;
  summary: string;
}

interface ArchiveListProps {
  error?: boolean;
}

const ArchiveList: React.FC<ArchiveListProps> = ({ error }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const storedArchive = localStorage.getItem("archive");
    if (storedArchive) {
      setTasks(JSON.parse(storedArchive));
    }
  }, []);

  if (error) {
    return (
      <div className="placeholder error">
        <ErrorOutlineIcon fontSize="large" color="error" />
        <p>Oops! Something went wrong while fetching your archived tasks.</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="placeholder empty">
        <InboxIcon fontSize="large" color="disabled" />
        <p>You have no archived tasks.</p>
      </div>
    );
  }

  return (
    <div className="archive-list">
      {tasks.map((task, index) => (
        <TaskCard
          key={index}
          task={task}
          isDone={false}
          hideButtons={true}
        />
      ))}
    </div>
  );
};

export default ArchiveList; 