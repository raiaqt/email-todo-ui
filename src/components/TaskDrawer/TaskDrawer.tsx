import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import ArchiveIcon from "@mui/icons-material/Archive";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import EventNoteIcon from "@mui/icons-material/EventNote";
import styles from "./TaskDrawer.module.css";
import { Task } from "../../interface";

interface TaskDrawerProps {
  task: Task;
  onClose: () => void;
  onArchive: (index: number) => void;
  onPrioritize: (index: number) => void;
  index: number;
}

const TaskDrawer: React.FC<TaskDrawerProps> = ({
  task,
  onClose,
  onArchive,
  onPrioritize,
  index,
}) => {
  const formatDeadline = (deadline: string) => {
    if (!deadline) return "No deadline";
    const date = new Date(deadline);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleArchive = () => {
    onArchive(index);
    // onClose();
  };

  const handlePrioritize = () => {
    onPrioritize(index);
    // onClose();
  };

  return (
    <div className={styles.drawerOverlay} onClick={onClose}>
      <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.drawerHeader}>
          <div className={styles.metaBlock} style={{ paddingBottom: 12 }}>
            <span
              className={styles.metaValue}
              style={{ fontWeight: 600, fontSize: "16px", paddingBottom: 0 }}
            >
              Task Details
            </span>
          </div>
          <button onClick={onClose} className={styles.closeButton}>
            <CloseIcon />
          </button>
        </div>
        <div className={styles.drawerContent}>
          <div className={styles.metaBlockDeadline}>
            <EventNoteIcon
              style={{ fontSize: 18, marginRight: 6, color: "#6b7280" }}
            />
            <span className={styles.deadlineBadge}>
              {formatDeadline(task.deadline)}
            </span>
          </div>
          <div className={styles.metaBlock}>
            <span className={styles.metaLabel}>{task.from} wrote:</span>
            <div className={styles.textContainerBlue}>
              <span className={styles.metaValue} style={{ fontWeight: 600 }}>{task.subject}</span>
            </div>
          </div>
          <div className={styles.metaBlock}>
            <span className={styles.metaLabel}>Tasks:</span>
            <div className={styles.textContainer}>
              <span className={styles.metaValue}>{task.summary}</span>
            </div>
          </div>
          <div className={styles.drawerFooter}>
            <button
              className={`${styles.actionButton} ${styles.actionButton_archive}`}
              onClick={handleArchive}
            >
              <ArchiveIcon fontSize="small" /> Archive
            </button>
            <button
              className={`${styles.actionButton} ${styles.actionButton_prioritize}`}
              onClick={handlePrioritize}
            >
              {task.priority ? <StarIcon fontSize="small" /> : <StarBorderIcon fontSize="small" />} {task.priority ? "Deprioritize" : "Prioritize"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDrawer;
