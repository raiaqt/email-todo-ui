import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import logout from "../../api/logout";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

const ConfigPanel: React.FC = () => {
  const [isGmailConnected, setIsGmailConnected] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  
  useEffect(() => {
    const email = localStorage.getItem("gmailEmail") as string;
    setEmailAddress(email);
    setIsGmailConnected(!!email);
  }, []);

  const handleConnectGmail = () => {
    const scope =
      "openid profile email https://www.googleapis.com/auth/gmail.readonly";
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`;
    window.location.href = authUrl;
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }} style={{ minHeight: "calc(100vh - 185px)" }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Gmail Account
        </Typography>
        <Typography variant="body2" sx={{ mb: 1.5 }}>
          {isGmailConnected ? `Connected as ${emailAddress}` : "Not connected to Gmail"}
        </Typography>
        <Button
          variant={isGmailConnected ? "outlined" : "contained"}
          sx={{
            backgroundColor: isGmailConnected ? "grey.100" : "#D44638",
            color: isGmailConnected ? "text.primary" : "#fff",
            '&:hover': {
              backgroundColor: isGmailConnected ? "grey.200" : "#BF3E32"
            }
          }}
          onClick={handleConnectGmail}
          startIcon={<MailOutlineIcon />}
        >
          {isGmailConnected ? "Reconnect Gmail" : "Connect with Gmail"}
        </Button>
      </Box>
      {isGmailConnected && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Logout
          </Typography>
          <Button
            variant="outlined"
            onClick={logout}
            sx={{
              color: "error.main",
              borderColor: "error.main",
              '&:hover': {
                backgroundColor: "error.light",
                borderColor: "error.dark"
              }
            }}
            startIcon={<ExitToAppIcon />}
          >
            Logout
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ConfigPanel;
