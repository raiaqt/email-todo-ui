import React, { useState, useEffect } from "react";

interface LastUpdatedProps {
  loading?: boolean;
  lastUpdated: string | null;
}

const LastUpdated: React.FC<LastUpdatedProps> = ({ loading, lastUpdated }) => {
  const formatRelativeTime = (timestamp: string | null): string => {
    if (!timestamp) return "Unknown";
    const updatedTime = new Date(timestamp);
    if (isNaN(updatedTime.getTime())) {
      return "Invalid date";
    }
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - updatedTime.getTime()) / 1000);
    if (diffInSeconds === 0) return "just now";
    if (diffInSeconds < 60) return diffInSeconds === 1 ? "1 second ago" : `${diffInSeconds} seconds ago`;
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return diffInMinutes === 1 ? "1 minute ago" : `${diffInMinutes} minutes ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return diffInHours === 1 ? "1 hour ago" : `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return diffInDays === 1 ? "1 day ago" : `${diffInDays} days ago`;
  };

  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!lastUpdated) return;
    function scheduleNextUpdate() {
      const now = new Date();
      const updatedTime = new Date(lastUpdated!);
      const diffInSeconds = Math.floor((now.getTime() - updatedTime.getTime()) / 1000);
      let delay;
      if (diffInSeconds < 60) {
        delay = 30000; // 30 seconds
      } else {
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) {
          delay = 300000; // 5 minutes
        } else {
          const diffInHours = Math.floor(diffInMinutes / 60);
          if (diffInHours < 24) {
            delay = 3600000; // 1 hour
          } else {
            delay = 3600000; // fallback for days
          }
        }
      }
      return setTimeout(() => {
        setTick(prev => prev + 1);
      }, delay);
    }
    const timer = scheduleNextUpdate();
    return () => clearTimeout(timer);
  }, [tick, lastUpdated]);

  return (
    <div className="last-updated" style={{ fontSize: "0.8em", fontWeight: "500", color: "#656c69", marginBottom: "0", textAlign: "center" }}>
      {loading ? "Creating latest tasks..." : `Last updated ${formatRelativeTime(lastUpdated)}`}
    </div>
  );
};

export default LastUpdated; 