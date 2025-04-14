import React from "react";
import "./TaskCard.css";
import ArchiveIcon from "@mui/icons-material/Archive";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { motion } from "framer-motion";

interface Task {
  deadline: string;
  detailed_tasks: string;
  from: string;
  subject: string;
  summary: string;
  isNew?: boolean;
}

interface TaskCardProps {
  task: Task;
  isDone: boolean;
  isPriority?: boolean;
  toggleTask?: () => void;
  togglePriority?: () => void;
  handleArchiveTask?: () => void;
  hideButtons?: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  isDone,
  isPriority = false,
  toggleTask = () => {},
  togglePriority = () => {},
  handleArchiveTask = () => {},
  hideButtons = false,
}) => {
  return (
    <motion.div
      layout
      className={`task-card ${isPriority ? "priority" : ""} ${
        isDone ? "done" : ""
      } ${task.isNew && !hideButtons ? "new-task" : ""}`}
    >
      <label className="task-left">
        <div className="task-checkbox">
          <input type="checkbox" checked={isDone} onChange={toggleTask} />
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
      {!hideButtons && (
        <div className="task-actions">
          <button className="task-btn archive" onClick={handleArchiveTask}>
            <ArchiveIcon />
          </button>
          <button className="task-btn prioritize" onClick={togglePriority}>
            {isPriority ? <StarIcon /> : <StarBorderIcon />}
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default TaskCard;
