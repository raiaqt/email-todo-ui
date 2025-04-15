import React, { useEffect, useState } from "react";
import LandingPage from "./components/LandingPage";
import ToDoList from "./components/ToDoList";
import Loader from "./components/Loader";
import { exchangeCodeForTokens, refreshAccessToken } from "./api/auth";
import { jwtDecode } from "jwt-decode";
import { JwtPayloadWithName } from "./types";
import "./App.css";

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [name, setName] = useState<string | null>(null);
  const [gmailSuccess, setGmailSuccess] = useState<boolean>(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const authorizationCode = params.get("code");

    if (authorizationCode) {
      window.history.replaceState({}, document.title, window.location.pathname);
      setLoading(true);
      exchangeCodeForTokens(authorizationCode, () => {
        setLoading(false);
        setGmailSuccess(true);
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
    localStorage.setItem(
      "gmailName",
      (decodedToken as JwtPayloadWithName).name
    );
    localStorage.setItem(
      "gmailEmail",
      (decodedToken as JwtPayloadWithName).email
    );

    setLoading(false);
  };

  useEffect(() => {
    handleAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const name = localStorage.getItem("name");
    setName(name);
  }, []);

  return (
    <div className="app-container">
      {loading ? <Loader /> : name ? <ToDoList gmailLoading={loading} gmailSuccess={gmailSuccess} /> : <LandingPage />}
    </div>
  );
};

export default App;
