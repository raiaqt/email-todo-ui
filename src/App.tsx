import React, { useEffect, useState } from "react";
import LandingPage from "./components/LandingPage";
import ToDoList from "./components/ToDoList";
import Loader from "./components/Loader";
import "./App.css";
import { exchangeCodeForTokens, refreshAccessToken } from "./api/auth";
import { jwtDecode } from "jwt-decode";
import { JwtPayloadWithName } from "./types";

const App: React.FC = () => {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const authorizationCode = params.get("code");

    if (authorizationCode) {
      window.history.replaceState({}, document.title, window.location.pathname);
      setLoading(true);
      exchangeCodeForTokens(authorizationCode, (user: string) => {
        setUser(user);
        setLoading(false);
      });
    }
  }, []);

  const getValidToken = async () => {
    const storedToken = localStorage.getItem("idToken");
    if (storedToken) {
      try {
        const decodedToken = jwtDecode(storedToken);
        const now = Math.floor(Date.now() / 1000);
        const isTokenValid =
          decodedToken && decodedToken.exp && decodedToken.exp > now;
        if (isTokenValid) {
          return storedToken;
        }

        const refreshToken = localStorage.getItem("refreshToken");
        const refreshedToken = await refreshAccessToken(refreshToken);
    
        return refreshedToken;
      } catch (error) {
        console.error("Failed to decode token, refreshing token.", error);
        localStorage.removeItem("idToken");
      }
    }
    return null;
  };

  const handleAuth = async () => {
    setLoading(true);
    const validToken = await getValidToken();
    if (!validToken) {
      setLoading(false);
      return;
    }

    const decodedToken = jwtDecode(validToken);
    console.log("decodedToken", decodedToken);
    localStorage.setItem("name", (decodedToken as JwtPayloadWithName).name);
    localStorage.setItem("email", (decodedToken as JwtPayloadWithName).email);

    setUser((decodedToken as JwtPayloadWithName).email);
    setLoading(false);
  };

  useEffect(() => {
    handleAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app-container">
      {loading ? <Loader /> : user ? <ToDoList user={user} /> : <LandingPage />}
    </div>
  );
};

export default App;
