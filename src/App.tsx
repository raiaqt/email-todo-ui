import React, { useEffect, useState } from "react";
import GoogleLoginButton from "./components/GoogleLoginButton";
import { jwtDecode } from "jwt-decode"; // For decoding Google ID tokens
import { googleLogout } from "@react-oauth/google";
import ToDoList from "./components/ToDoList";
import { exchangeCodeForTokens } from "./api/auth";
import "./App.css";

const App: React.FC = () => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const authorizationCode = params.get("code");

    if (authorizationCode) {
      exchangeCodeForTokens(authorizationCode, setUser);
    }
  }, []);

  useEffect(() => {
    // On app load, check for stored ID token
    const storedToken = localStorage.getItem("idToken");
    if (storedToken) {
      const decodedToken = jwtDecode(storedToken);

      const now = Math.floor(Date.now() / 1000);
      if (decodedToken.exp > now) {
        setUser(decodedToken.name); // Token is valid, set user as logged in
      } else {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("idToken");
      }
    }
  }, []);

  const handleLogout = () => {
    googleLogout();
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("idToken");
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-logo">SortifyAI</h1>
        {user && (
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        )}
      </header>
      {user ? <ToDoList user={user} /> : <GoogleLoginButton />}
    </div>
  );
};

export default App;
