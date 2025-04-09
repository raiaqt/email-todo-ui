import React, { useState, useEffect } from "react";
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
  const [completed, setCompleted] = useState<boolean[]>([]);

  useEffect(() => {
    setCompleted(new Array(tasks.length).fill(false));
  }, [tasks]);

  const toggleTask = (index: number) => {
    setCompleted(prev => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  return (
    <div className="task-list">
      {tasks.map((task, index) => (
        <div key={index} className="task-item">
          <input
            type="checkbox"
            checked={completed[index]}
            onChange={() => toggleTask(index)}
          />
          <div className="task-info">
            <div className="task-info-line">
              <p className={`task-summary ${completed[index] ? 'completed' : ''}`}>
                {task.summary}
              </p>
              <p className="task-deadline">
                {task.deadline && /^\d{4}-\d{2}-\d{2}$/.test(task.deadline)
                  ? task.deadline
                  : "No deadline"}
              </p>
            </div>
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
