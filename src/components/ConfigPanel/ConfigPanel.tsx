import React, { useState, useEffect } from "react";
import logout from "../../api/logout";
import disconnectGmail from "../../api/disconnectGmail";
import connectGmail from "../../api/connectGmail";
import "./ConfigPanel.css";
import MailIcon from "@mui/icons-material/Mail";

interface ConfigPanelProps {
  mode: string;
  setMode: (mode: string) => void;
  refreshInterval: number;
  setRefreshInterval: (refreshInterval: number) => void;
}
const ConfigPanel: React.FC<ConfigPanelProps> = ({ mode, setMode, refreshInterval, setRefreshInterval }) => {
  const [isGmailConnected, setIsGmailConnected] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("gmailEmail") as string;
    setEmailAddress(email);
    setIsGmailConnected(!!email);
  }, []);
  const handleModeToggle = () => {
    setMode(mode === "clean" ? "creative" : "clean");
  };

  const handleClearAllData = () => {
    if (
      window.confirm(
        "Are you sure you want to clear all data? This action cannot be undone."
      )
    ) {
      localStorage.removeItem("tasks");
      localStorage.removeItem("archive");
      localStorage.removeItem("lastUpdated");
      window.location.reload();
    }
  };

  return (
    <div className="config-panel">
      <div className="config-card">
        <h6>
          <MailIcon style={{ marginRight: "4px" }} /> Gmail Account
        </h6>
        <p>
          {isGmailConnected
            ? `Connected as ${emailAddress}`
            : "Not connected to Gmail"}
        </p>
        {isGmailConnected ? (
          <button className="gmail-connected-button" onClick={disconnectGmail}>
            Disconnect Gmail
          </button>
        ) : (
          <button className="gmail-disconnected-button" onClick={connectGmail}>
            Connect with Gmail
          </button>
        )}
      </div>
      <div className="config-card">
        <h6>General Settings</h6>
        <p>Configure mode and refresh interval.</p>
        <div className="general-settings-item">
          <label htmlFor="modeSwitch">
            <strong>Creative mode:</strong>
          </label>
          <label className="switch">
            <input
              type="checkbox"
              id="modeSwitch"
              checked={mode === "creative"}
              onChange={handleModeToggle}
            />
            <span className="slider"></span>
          </label>
          <span style={{ marginLeft: "8px" }}>
            {mode === "creative" ? "On" : "Off"}
          </span>
        </div>
        <div className="general-settings-item">
          <label htmlFor="refreshInput">
            <strong>Refresh every:</strong>
          </label>
          <input
            type="number"
            style={{ width: "50px" }}
            id="refreshInput"
            placeholder="4"
            min="1"
            max="24"
            value={refreshInterval}
            onChange={(e) => setRefreshInterval(parseInt(e.target.value))}
          />
          <span className="hours-text">hour(s)</span>
        </div>
      </div>
      <div className="config-card">
        <h6>Clear All Data</h6>
        <p>This will remove all tasks, archives, and reset your session.</p>
        <button className="clear-data-button" onClick={handleClearAllData}>
          Clear All Data
        </button>
      </div>
      <div className="config-card">
        <h6>Logout</h6>
        <p>End your session securely.</p>
        <button className="logout-button" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ConfigPanel;
