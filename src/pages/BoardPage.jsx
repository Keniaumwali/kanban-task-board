
import { useState } from "react";
import { Link } from "react-router-dom";

import Column from "../components/Column";
import FilterBar from "../components/FilterBar";
import useTaskFilter from "../hooks/useTaskFilter";

function BoardPage({ tasks, onAdd, onDelete, onMove }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [priority, setPriority] = useState("All");

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [newPriority, setNewPriority] = useState("Medium");

  const filteredTasks = useTaskFilter(
    tasks.filter((task) => !task.archived),
    searchTerm,
    priority
  );

  const columns = [
    { title: "To Do", status: "todo" },
    { title: "In Progress", status: "in-progress" },
    { title: "Done", status: "done" },
  ];

  const handleAddTask = (event) => {
    event.preventDefault();

    onAdd({
      title,
      description,
      priority: newPriority,
      status: "todo",
    });

    setTitle("");
    setDescription("");
    setNewPriority("Medium");
    setShowForm(false);
  };

  return (
    <div className="board-page">
      <header className="board-header">
        <div>
          <h1>My Kanban Board</h1>
          <p>Organize your work, track progress, and get things done.</p>
        </div>

        <div className="board-actions">
          <span>
            {tasks.filter((task) => !task.archived).length} Active Tasks
          </span>

          <Link to="/archive" className="archive-link">
            View Archive
          </Link>

          <button
            className="add-task-button"
            onClick={() => setShowForm(!showForm)}
          >
            + Add Task
          </button>
        </div>
      </header>

      {showForm && (
        <form className="add-task-form" onSubmit={handleAddTask}>
          <h2>Create New Task</h2>

          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />

          <textarea
            placeholder="Task description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          />

          <select
            value={newPriority}
            onChange={(event) => setNewPriority(event.target.value)}
          >
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>

          <button type="submit">Save Task</button>
        </form>
      )}

      <FilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        priority={priority}
        setPriority={setPriority}
      />

      <div className="kanban-board">
        {columns.map((column) => (
          <Column
            key={column.status}
            title={column.title}
            status={column.status}
            tasks={filteredTasks}
            onDelete={onDelete}
            onMove={onMove}
          />
        ))}
      </div>
    </div>
  );
}

export default BoardPage;
