import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import ArchiveIcon from "@mui/icons-material/Archive";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import EventNoteIcon from "@mui/icons-material/EventNote";
import styles from "./TaskDrawer.module.css";

interface TaskDrawerProps {
  task: {
    subject: string;
    summary: string;
    from: string;
    deadline: string;
  };
  onClose: () => void;
}

const TaskDrawer: React.FC<TaskDrawerProps> = ({ task, onClose }) => {
  const formatDeadline = (deadline: string) => {
    if (!deadline) return "No deadline";
    const date = new Date(deadline);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className={styles.drawerOverlay} onClick={onClose}>
      <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.drawerHeader}>
          <button onClick={onClose} className={styles.closeButton}>
            <CloseIcon />
          </button>
        </div>
        <div className={styles.drawerContent}>
          <div
            className={styles.metaBlock}
            style={{ paddingBottom: 12, borderBottom: "1px solid #e5e7eb" }}
          >
            <span
              className={styles.metaValue}
              style={{ fontWeight: 600, fontSize: "16px" }}
            >
              {task.subject}
            </span>
          </div>
          <div className={styles.metaBlockDeadline}>
            <EventNoteIcon
              style={{ fontSize: 18, marginRight: 6, color: "#6b7280" }}
            />
            <span className={styles.deadlineBadge}>
              {formatDeadline(task.deadline)}
            </span>
          </div>

          <div className={styles.metaBlock}>
            <span className={styles.metaLabel}>From {task.from}:</span>
            <div className={styles.textContainer}>
              <span className={styles.metaValue}>{task.summary}</span>
            </div>
          </div>
          <div className={styles.drawerFooter}>
            <button className={styles.actionButton}>
              <ArchiveIcon fontSize="small" /> Archive
            </button>
            <button className={styles.actionButton}>
              <StarBorderIcon fontSize="small" /> Prioritize
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDrawer;
