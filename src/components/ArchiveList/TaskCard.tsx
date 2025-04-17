import React from "react";
import "./TaskCard.css";
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
  hideButtons = false,
  onSelectTask,
  index,
}) => {
  return (
    <motion.div
      layout
      className={`archive-card ${isPriority ? "priority" : ""} ${
        isDone && !hideButtons ? "done" : ""
      }`}
    >
      <label className="task-left">
        <div className="task-checkbox">
          <input type="checkbox" checked={isDone} onChange={toggleTask} />
        </div>
        <div className="task-content">
          <p
            className={`archive-title ${
              isDone && !hideButtons ? "completed" : ""
            }`}
          >
            {task.summary}
          </p>

          <div className="archive-meta-group">
            {task.deadline && (
              <span className="archive-deadline">
                {formatDeadline(task.deadline)}
              </span>
            )}
            <div className="archive-actions-mobile">
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

      <div className="archive-actions">
        {task.deadline && (
          <span className="archive-deadline">{formatDeadline(task.deadline)}</span>
        )}
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
    </motion.div>
  );
};

export default TaskCard;
