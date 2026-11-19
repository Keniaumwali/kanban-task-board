
import "./App.css";
import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import initialTasks from "./data/initialTasks";
import useLocalStorage from "./hooks/useLocalStorage";

import BoardPage from "./pages/BoardPage";
import TaskDetailPage from "./pages/TaskDetailPage";
import ArchivePage from "./pages/ArchivePage";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedTasks = localStorage.getItem("kanbanTasks");

    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks);

        if (Array.isArray(parsedTasks)) {
          setTasks(parsedTasks);
          setIsLoading(false);
          return;
        }
      } catch (error) {
        console.error("Error loading saved tasks:", error);
      }
    }

    const timer = setTimeout(() => {
      setTasks(initialTasks);
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  useLocalStorage("kanbanTasks", tasks, !isLoading);

  const addTask = (taskData) => {
    const newTask = {
      id: crypto.randomUUID(),
      title: taskData.title,
      description: taskData.description,
      status: taskData.status || "todo",
      priority: taskData.priority || "Medium",
      archived: false,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setTasks((previousTasks) => [...previousTasks, newTask]);
  };

  const moveTask = (taskId, newStatus) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === taskId
          ? { ...task, status: newStatus, archived: false }
          : task
      )
    );
  };

  const updateTask = (taskId, updatedData) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedData } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== taskId)
    );
  };

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>
        <h2>Loading your Kanban Board...</h2>
        <p>Please wait while we prepare your tasks.</p>
      </div>
    );
  }

  return (
    <BrowserRouter basename="/kanban-task-board">
      <Routes>
        <Route
          path="/"
          element={
            <BoardPage
              tasks={tasks}
              onAdd={addTask}
              onMove={moveTask}
              onUpdate={updateTask}
              onDelete={deleteTask}
            />
          }
        />

        <Route
          path="/task/:id"
          element={
            <TaskDetailPage
              tasks={tasks}
              onUpdate={updateTask}
              onDelete={deleteTask}
            />
          }
        />

        <Route
          path="/archive"
          element={
            <ArchivePage
              tasks={tasks}
              onUpdate={updateTask}
            />
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
