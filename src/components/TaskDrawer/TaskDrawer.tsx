import React from "react";
import ArchiveIcon from "@mui/icons-material/Archive";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import EventNoteIcon from "@mui/icons-material/EventNote";
import DeleteIcon from "@mui/icons-material/Delete";
import Drawer from "../Drawer/Drawer";
import "./TaskDrawer.css";
import { Task } from "../../interface";

interface TaskDrawerContentProps {
  task: Task;
  onClose: () => void;
  onArchive: (index: number) => void;
  onPrioritize: (index: number) => void;
  index: number;
  hideButtons?: boolean;
  onDeleteArchive: (index: number) => void;
}

const TaskDrawerContent: React.FC<TaskDrawerContentProps> = ({
  task,
  onClose,
  onArchive,
  onPrioritize,
  index,
  hideButtons = false,
  onDeleteArchive,
}) => {
  const formatDeadline = (deadline: string) => {
    if (!deadline) return "No Deadline";
    const date = new Date(deadline);
    if (isNaN(date.getTime())) return "No Deadline";
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatDay = (deadline: string) => {
    if (!deadline) return "";
    const date = new Date(deadline);
    if (isNaN(date.getTime())) return "";
    return date.toLocaleDateString("en-US", { weekday: "long" });
  };

  const day = formatDay(task.deadline);

  const handleArchive = () => {
    onArchive(index);
    onClose();
  };

  const handlePrioritize = () => {
    onPrioritize(index);
    onClose();
  };

  const handleDeleteArchive = () => {
    onDeleteArchive(index);
    onClose();
  };

  return (
    <Drawer onClose={onClose} header="Task Details">
      <div className="drawerContent">
        <div className="metaBlockDeadline">
          <EventNoteIcon
            style={{ fontSize: 18, marginRight: 6, color: "#6b7280" }}
          />
          <span className="deadlineBadge">{formatDeadline(task.deadline)}</span>
          {day && <span className="dayBadge">{day}</span>}
        </div>
        <div className="metaBlock">
          {/* <div className="textContainerBlue"> */}
          {/* <span className="metaValue" style={{ fontWeight: 600 }}>
              {task.from}
            </span> */}
          {/* </div> */}
        </div>
        <div className="metaBlock">
          <span className="metaLabel">From {task.from}:</span>
          <div className="textContainerBlue">
            <span className="metaValue">{task.subject}</span>
          </div>
        </div>
        <div className="metaBlock">
          <span className="metaLabel">Tasks:</span>
          <div className="textContainer">
            <span className="metaValue">{task.summary}</span>
          </div>
        </div>
        <div className="drawerFooter">
          {hideButtons ? (
            <button
              className="actionButton actionButton_archive"
              onClick={handleDeleteArchive}
            >
              <DeleteIcon fontSize="small" /> Delete
            </button>
          ) : (
            <>
              <button
                className="actionButton actionButton_archive"
                onClick={handleArchive}
              >
                <ArchiveIcon fontSize="small" /> Archive
              </button>
              <button
                className="actionButton actionButton_prioritize"
                onClick={handlePrioritize}
              >
                {task.priority ? (
                  <StarIcon fontSize="small" />
                ) : (
                  <StarBorderIcon fontSize="small" />
                )}{" "}
                {task.priority ? "Deprioritize" : "Prioritize"}
              </button>
            </>
          )}
        </div>
      </div>
    </Drawer>
  );
};

export default TaskDrawerContent;
