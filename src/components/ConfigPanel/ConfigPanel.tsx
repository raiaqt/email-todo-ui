import React, { useState, useEffect } from "react";
import logout from "../../api/logout";
import disconnectGmail from "../../api/disconnectGmail";
import connectGmail from "../../api/connectGmail";
import "./ConfigPanel.css";
import MailIcon from '@mui/icons-material/Mail';

const ConfigPanel: React.FC = () => {
  const [isGmailConnected, setIsGmailConnected] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("gmailEmail") as string;
    setEmailAddress(email);
    setIsGmailConnected(!!email);
  }, []);

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
        <h6><MailIcon style={{ marginRight: '4px' }} /> Gmail Account</h6>
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
