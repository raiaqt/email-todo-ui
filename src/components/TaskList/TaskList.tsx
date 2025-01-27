import React from "react";
import "./TaskList.css"; // Import the CSS file for styling

interface Task {
  deadline: string;
  detailed_tasks: string;
  from: string;
  subject: string;
  summary: string;
}

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <div className="task-list">
      {tasks.map((task, index) => (
        <div key={index} className="task-item">
          <div className="task-info">
            <p className="task-deadline">
              {task.deadline && /^\d{4}-\d{2}-\d{2}$/.test(task.deadline)
                ? task.deadline
                : "No deadline"}
            </p>
            <p className="task-summary">{task.summary}</p>
          </div>
          <div className="task-actions">
            {/* <button onClick={() => onMarkAsDone(task)} className="btn btn-done">
              Mark as Done
            </button>
            <button onClick={() => onIgnore(task)} className="btn btn-ignore">
              Ignore
            </button>
            <button
              onClick={() => onViewDetails(task)}
              className="btn btn-details"
            >
              View Details
            </button> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
