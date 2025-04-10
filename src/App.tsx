import React, { useEffect, useState } from "react";
import LandingPage from "./components/LandingPage";
import ToDoList from "./components/ToDoList";
import "./App.css";
import { exchangeCodeForTokens } from "./api/auth";
import { jwtDecode } from "jwt-decode";
import { JwtPayloadWithName } from "./types";

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
      if (decodedToken && decodedToken.exp && decodedToken.exp > now) {
        setUser((decodedToken as JwtPayloadWithName).name); // Token is valid, set user as logged in
      } else {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("idToken");
      }
    }
  }, []);

  return (
    <div className="app-container">
      {user ? <ToDoList user={user} /> : <LandingPage />}
    </div>
  );
};

export default App;