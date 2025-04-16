import React from "react";
import "./TaskCard.css";
import ArchiveIcon from "@mui/icons-material/ArchiveOutlined";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { motion } from "framer-motion";
import { Task } from "../../interface";

interface TaskCardProps {
  task: Task;
  isDone: boolean;
  isPriority?: boolean;
  toggleTask?: () => void;
  togglePriority?: () => void;
  handleArchiveTask?: () => void;
  hideButtons?: boolean;
  onSelectTask: (task: Task) => void;
}

const formatDeadline = (deadline: string): string => {
  const validRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!deadline || !validRegex.test(deadline)) return "No deadline";
  const today = new Date();
  const todayStr = today.toISOString().slice(0, 10);
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().slice(0, 10);
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().slice(0, 10);
  if (deadline === todayStr) return "Today";
  if (deadline === tomorrowStr) return "Tomorrow";
  if (deadline === yesterdayStr) return "Yesterday";
  return deadline;
};

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  isDone,
  isPriority = false,
  toggleTask = () => {},
  togglePriority = () => {},
  handleArchiveTask = () => {},
  hideButtons = false,
  onSelectTask
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

          <div className="task-meta-group">
            {task.deadline && (
              <span className="task-deadline">
                {formatDeadline(task.deadline)}
              </span>
            )}
            <div className="task-actions-mobile">
              <button className="task-btn archive" onClick={handleArchiveTask}>
                <ArchiveIcon />
              </button>
              <button className="task-btn prioritize" onClick={togglePriority}>
                {isPriority ? <StarIcon /> : <StarBorderIcon />}
              </button>
              <button className="task-btn open-task" onClick={(e) => { e.stopPropagation(); onSelectTask(task); }}>
                <ChevronRightIcon />
              </button>
            </div>
          </div>
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
          <button className="task-btn open-task" onClick={(e) => { e.stopPropagation(); onSelectTask(task); }}>
            <ChevronRightIcon />
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default TaskCard;
