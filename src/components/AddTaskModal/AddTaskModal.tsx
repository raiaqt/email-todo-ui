import React from "react";
import { addTask } from "../../api/addTask";
import "./AddTaskModal.css";

interface AddTaskModalProps {
  show: boolean;
  onClose: () => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({
  show,
  onClose,
}) => {
  const [sendTo, setSendTo] = React.useState("");
  const [task, setTask] = React.useState("");
  const [deadline, setDeadline] = React.useState("");
  const [noDeadline, setNoDeadline] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await addTask(sendTo, task, deadline ? deadline : undefined);
      console.log("Email sent successfully", data);
      onClose();
    } catch (error) {
      console.error("Error sending email", error);
    }
  };

  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal-content animated">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Add Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group half">
              <label htmlFor="sendTo">Send to Email</label>
              <input
                id="sendTo"
                type="email"
                placeholder="Send to"
                value={sendTo}
                onChange={(e) => setSendTo(e.target.value)}
                required
              />
            </div>
            <div className="form-group half">
              <label htmlFor="deadline">Deadline</label>
              <input
                id="deadline"
                type="date"
                placeholder="Deadline"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                disabled={noDeadline}
                required={!noDeadline}
              />
              <label style={{ width: '100%', fontSize: '12px', marginTop: '4px', display: 'inline-flex', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  checked={noDeadline}
                  onChange={(e) => { setNoDeadline(e.target.checked); if(e.target.checked) setDeadline(''); }}
                  style={{ marginRight: '4px', width: '16px', height: '16px' }}
                />
                <span style={{ width: '100%', textAlign: 'left' }}>No deadline</span>
              </label>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="task">Task</label>
            <textarea
              id="task"
              placeholder="Task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              maxLength={160}
              rows={3}
              style={{ resize: 'vertical' }}
              required
            />
            <span style={{ fontSize: '12px', color: '#6b7280', display: 'block', textAlign: 'right' }}>
              {task.length} / 160
            </span>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
