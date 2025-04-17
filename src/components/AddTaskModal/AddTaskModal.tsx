import React from "react";
import { addTask, sendTask } from "../../api/addTask";
import Drawer from "../Drawer/Drawer";
import "./AddTaskModal.css";

interface AddTaskModalProps {
  show: boolean;
  onClose: () => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ show, onClose }) => {
  const [assignMode, setAssignMode] = React.useState<"self" | "other">("self");
  const [sendTo, setSendTo] = React.useState("");
  const [task, setTask] = React.useState("");
  const [deadline, setDeadline] = React.useState("");
  const [noDeadline, setNoDeadline] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const recipient = assignMode === "self" ? "" : sendTo;
      let data;
      if (assignMode === "self") {
        data = await addTask({ deadline, summary: task });
      } else {
        data = await sendTask(recipient, task, deadline || undefined);
      }
      console.log("Task sent successfully", data);
      setSendTo("");
      setTask("");
      setDeadline("");
      setNoDeadline(false);
      setAssignMode("self");
      onClose();
    } catch (error) {
      console.error("Error sending task", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!show) return null;

  return (
    <Drawer onClose={onClose} header="Add Task">
      <div className="add-task-content animated">
        <form onSubmit={handleSubmit}>
          <div className="assign-toggle">
            <label
              className={`assign-option ${
                assignMode === "self" ? "selected" : ""
              }`}
            >
              <input
                type="radio"
                name="assignMode"
                value="self"
                checked={assignMode === "self"}
                onChange={() => setAssignMode("self")}
              />
              Assign to Myself
            </label>
            <label
              className={`assign-option ${
                assignMode === "other" ? "selected" : ""
              }`}
            >
              <input
                type="radio"
                name="assignMode"
                value="other"
                checked={assignMode === "other"}
                onChange={() => setAssignMode("other")}
              />
              Send to Someone
            </label>
          </div>

          {assignMode === "other" && (
            <div className="form-group fade-in">
              <label htmlFor="sendTo">Send to Email</label>
              <input
                id="sendTo"
                type="email"
                placeholder="Send to"
                value={sendTo}
                onChange={(e) => setSendTo(e.target.value)}
                required={assignMode === "other"}
              />
            </div>
          )}

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="task">Task</label>
              <textarea
                id="task"
                placeholder="Task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                maxLength={160}
                rows={3}
                style={{ resize: "vertical" }}
                required
              />
              <span
                style={{
                  fontSize: "12px",
                  color: "#6b7280",
                  display: "block",
                  textAlign: "right",
                }}
              >
                {task.length} / 160
              </span>
            </div>
            <div className="form-group">
              <label htmlFor="deadline">Deadline</label>
              <input
                id="deadline"
                type="date"
                placeholder="Deadline"
                min={today}
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                disabled={noDeadline}
                required={!noDeadline}
              />
              <label
                style={{
                  width: "100%",
                  fontSize: "12px",
                  marginTop: "4px",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                <input
                  type="checkbox"
                  checked={noDeadline}
                  onChange={(e) => {
                    setNoDeadline(e.target.checked);
                    if (e.target.checked) setDeadline("");
                  }}
                  style={{ marginRight: "4px", width: "16px", height: "16px" }}
                />
                <span style={{ width: "100%", textAlign: "left" }}>
                  No deadline
                </span>
              </label>
            </div>
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </Drawer>
  );
};

export default AddTaskModal;
