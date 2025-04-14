import React, { useState, useEffect } from "react";
import "./ConfigDrawer.css";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Button from "@mui/material/Button";
import disconnectGmail from "../api/disconnectGmail";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

interface ConfigDrawerProps {
  open: boolean;
  onClose: () => void;
  onOpen?: () => void;
}

const ConfigDrawer: React.FC<ConfigDrawerProps> = ({ open, onClose, onOpen }) => {
  const [isGmailConnected, setIsGmailConnected] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const [manualTask, setManualTask] = useState({ summary: "", deadline: "" });
  const [sendTask, setSendTask] = useState({ email: "", task: "", deadline: "" });

  useEffect(() => {
    const email = localStorage.getItem("gmailEmail") as string;
    setEmailAddress(email);
    setIsGmailConnected(!!email);
  }, []);

  const handleToggle = () => {
    if (open) {
      onClose();
    } else if (onOpen) {
      onOpen();
    }
  };

  const handleConnectGmail = () => {
    const scope =
      "openid profile email https://www.googleapis.com/auth/gmail.readonly";
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`;
    window.location.href = authUrl;
  };

  return (
    <div
      onMouseEnter={() => {
        if (!open && onOpen && window.innerWidth > 768) onOpen();
      }}
      className={`configDrawer ${open ? "open" : "closed"}`}
    >
      {/* Drawer Toggle Button */}
      <div onClick={handleToggle} className="toggleButton">
        {open ? (
          <KeyboardDoubleArrowRightIcon style={{ color: "#999" }} />
        ) : (
          <KeyboardDoubleArrowLeftIcon style={{ color: "#999" }} />
        )}
      </div>

      {/* Floating Close Button for Mobile */}
      {open && window.innerWidth <= 768 && (
        <button className="btnFloatingClose" onClick={onClose}>✕</button>
      )}

      {/* Drawer Content */}
      {open ? (
        <div className="content">
          {/* Gmail Connection */}
          <div className="section">
            <span className="section-title">Gmail Account</span>
            <div className="gmailStatusText">
              <p className="gmailConnectionText">
                {isGmailConnected
                  ? `Connected as ${emailAddress}`
                  : "Not connected to Gmail"}
              </p>
              {isGmailConnected ? (
                <Button
                  variant="outlined"
                  className="btnDisconnectGmail"
                  startIcon={<MailOutlineIcon />}
                  onClick={disconnectGmail}
                >
                  Disconnect Gmail
                </Button>
              ) : (
                <Button
                  variant="contained"
                  className="btnConnectGmail"
                  startIcon={<MailOutlineIcon />}
                  onClick={handleConnectGmail}
                >
                  Connect with Gmail
                </Button>
              )}
            </div>
          </div>

          {/* Add Manual Task */}
          <div className="section">
            <span className="section-title">Add Manual Task</span>
            <input
              type="text"
              placeholder="Task summary"
              className="inputField"
              value={manualTask.summary}
              onChange={(e) =>
                setManualTask({ ...manualTask, summary: e.target.value })
              }
            />
            <input
              type="date"
              className="inputField"
              value={manualTask.deadline}
              onChange={(e) =>
                setManualTask({ ...manualTask, deadline: e.target.value })
              }
            />
            <Button variant="outlined" className="btnSecondary">
              Add Task
            </Button>
          </div>

          {/* Send Task */}
          <div className="section">
            <span className="section-title">Send Task to Someone</span>
            <input
              type="email"
              placeholder="Recipient email"
              className="inputField"
              value={sendTask.email}
              onChange={(e) =>
                setSendTask({ ...sendTask, email: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Task description"
              className="inputField"
              value={sendTask.task}
              onChange={(e) =>
                setSendTask({ ...sendTask, task: e.target.value })
              }
            />
            <input
              type="date"
              className="inputField"
              value={sendTask.deadline}
              onChange={(e) =>
                setSendTask({ ...sendTask, deadline: e.target.value })
              }
            />
            <Button variant="outlined" className="btnSecondary">
              Send Task
            </Button>
          </div>
        </div>
      ) : (
        <div className="content-closed" />
      )}
    </div>
  );
};

export default ConfigDrawer;
