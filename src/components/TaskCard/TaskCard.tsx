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
  onSelectTask: (task: Task, index: number) => void;
  index: number;
}

const formatDeadline = (deadline: string): string => {
  const validRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!deadline || !validRegex.test(deadline)) return "No deadline";

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const deadlineDate = new Date(deadline);
  deadlineDate.setHours(0, 0, 0, 0);

  const diffTime = deadlineDate.getTime() - today.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return "due today";
  } else if (diffDays > 0) {
    return `due in ${diffDays} day${diffDays > 1 ? "s" : ""}`;
  } else {
    return `${Math.abs(diffDays)} day${Math.abs(diffDays) > 1 ? "s" : ""} past due`;
  }
};

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  isDone,
  isPriority = false,
  toggleTask = () => {},
  togglePriority = () => {},
  handleArchiveTask = () => {},
  hideButtons = false,
  onSelectTask,
  index,
}) => {
  return (
    <motion.div
      layout
      className={`task-card ${isPriority ? "priority" : ""} ${
        isDone && !hideButtons ? "done" : ""
      } ${task.isNew && !hideButtons ? "new-task" : ""}`}
    >
      <label className="task-left">
        <div className="task-checkbox">
          <input type="checkbox" checked={isDone} onChange={toggleTask} />
        </div>
        <div className="task-content">
          <p className={`task-title ${isDone && !hideButtons ? "completed" : ""}`}>
            {task.summary}
          </p>

          <div className="task-meta-group">
            {task.deadline && (
              <span className="task-deadline">
                {formatDeadline(task.deadline)}
              </span>
            )}
            <div className="task-actions-mobile">
              <button
                className="task-btn archive"
                onClick={(e) => {
                  e.stopPropagation();
                  handleArchiveTask();
                }}
              >
                <ArchiveIcon />
              </button>
              <button
                className="task-btn prioritize"
                onClick={(e) => {
                  e.stopPropagation();
                  togglePriority();
                }}
              >
                {isPriority ? <StarIcon /> : <StarBorderIcon />}
              </button>
              <button
                className="task-btn open-task"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectTask(task, index);
                }}
              >
                <ChevronRightIcon />
              </button>
            </div>
          </div>
        </div>
      </label>
      {!hideButtons && (
        <div className="task-actions">
          <button
            className="task-btn archive"
            onClick={(e) => {
              e.stopPropagation();
              handleArchiveTask();
            }}
          >
            <ArchiveIcon />
          </button>
          <button
            className="task-btn prioritize"
            onClick={(e) => {
              e.stopPropagation();
              togglePriority();
            }}
          >
            {isPriority ? <StarIcon /> : <StarBorderIcon />}
          </button>
          <button
            className="task-btn open-task"
            onClick={(e) => {
              e.stopPropagation();
              onSelectTask(task, index);
            }}
          >
            <ChevronRightIcon />
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default TaskCard;
