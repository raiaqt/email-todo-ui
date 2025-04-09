import React, { useEffect, useState } from "react";
import LandingPage from "./components/LandingPage";
import ToDoList from "./components/ToDoList";
import "./App.css";

const App: React.FC = () => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    // Example: Check for a token or user session.
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <div className="app-container">
      {user ? <ToDoList user={user} /> : <LandingPage />}
    </div>
  );
};

export default App;