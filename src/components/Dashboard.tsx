import React, { useState } from 'react';
import styles from './Dashboard.module.css';

// Define a Task type for our tasks
interface Task {
  id: number;
  name: string;
  source: string;
  tags: string[];
}

const Dashboard: React.FC = () => {
  // Dummy tasks data
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, name: "Reply to client email", source: "✉️ Gmail", tags: ["Follow-up"] },
    { id: 2, name: "Update project timeline", source: "✉️ Outlook", tags: ["Urgent"] },
    { id: 3, name: "Schedule meeting with team", source: "✉️ Yahoo", tags: [] }
  ]);

  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  const markTaskDone = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const snoozeTask = (id: number) => {
    console.log(`Snooze task ${id}`);
  };

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>Sortify</div>
        <ul className={styles.nav}>
          <li className={`${styles.navItem} ${styles.active}`}>📥 Inbox To-Dos</li>
          <li className={styles.navItem}>📅 Upcoming</li>
          <li className={styles.navItem}>✅ Completed</li>
          <li className={styles.navItem}>⚙️ Settings</li>
          <li className={`${styles.navItem} ${styles.upgrade}`}>
            🚀 Upgrade <span className={styles.proBadge}>Pro</span>
          </li>
        </ul>
      </aside>
      <main className={styles.main}>
        <header className={styles.header}>
          <div>
            <h2>Good Morning</h2>
            <p>{currentDate}</p>
          </div>
          <div className={styles.userAvatar}></div>
        </header>
        <section className={styles.aiDigest}>
          <h3>AI Digest</h3>
          <p>You have {tasks.length} important tasks today</p>
          <p>Based on your emails, your priorities are: Follow-up, Urgent.</p>
        </section>
        <section className={styles.todayPanel}>
          <h3>Today</h3>
          {tasks.length === 0 ? (
            <div className={styles.emptyState}>No tasks for today.</div>
          ) : (
            tasks.map(task => (
              <div key={task.id} className={styles.taskCard}>
                <div className={styles.taskDetails}>
                  <strong>{task.name}</strong>
                  <span>{task.source}</span>
                  {task.tags.length > 0 && (
                    <div className={styles.taskTags}>
                      {task.tags.map((tag, idx) => (
                        <span key={idx} className={styles.tag}>{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className={styles.taskActions}>
                  <button className={`${styles.taskButton} ${styles.mark}`} onClick={() => markTaskDone(task.id)}>
                    Mark Done
                  </button>
                  <button className={`${styles.taskButton} ${styles.snooze}`} onClick={() => snoozeTask(task.id)}>
                    Snooze
                  </button>
                  <button className={`${styles.taskButton} ${styles.view}`}>
                    View Email
                  </button>
                </div>
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard; 