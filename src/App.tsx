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
  const [loading, setLoading] = useState<boolean>(false);

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
      const decodedToken = jwtDecode(storedToken);
      const now = Math.floor(Date.now() / 1000);
      const isTokenValid =
        decodedToken && decodedToken.exp && decodedToken.exp > now;
      if (isTokenValid) {
        return storedToken;
      }
    }

    const refreshToken = localStorage.getItem("refreshToken");
    const refreshedToken = await refreshAccessToken(refreshToken);

    console.log(refreshedToken);
    return refreshedToken;
  };

  const handleAuth = async () => {
    const validToken = await getValidToken();
    const decodedToken = jwtDecode(validToken);
    console.log("decodedToken", decodedToken);
    setUser((decodedToken as JwtPayloadWithName).email);
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
