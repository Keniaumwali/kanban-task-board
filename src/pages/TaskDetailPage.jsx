
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

function TaskDetailPage({ tasks, onUpdate, onDelete }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const task = tasks.find((item) => item.id === id);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");
  const [priority, setPriority] = useState("Medium");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
      setPriority(task.priority);
    }
  }, [task]);

  if (!task) {
    return (
      <div className="not-found">
        <h2>Task Not Found</h2>
        <p>The task you are looking for does not exist.</p>
        <Link to="/">Return to Board</Link>
      </div>
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    onUpdate(task.id, {
      title,
      description,
      status,
      priority,
    });

    navigate("/");
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (confirmed) {
      onDelete(task.id);
      navigate("/");
    }
  };

  return (
    <div className="task-detail-page">
      <Link to="/" className="back-link">
        ← Back to Board
      </Link>

      <div className="detail-card">
        <h1>Edit Task</h1>
        <p>Update your task information below.</p>

        <form onSubmit={handleSubmit}>
          <label>Task Title</label>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />

          <label>Description</label>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows="5"
            required
          />

          <label>Status</label>
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>

          <label>Priority</label>
          <select
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <div className="detail-actions">
            <button type="submit" className="save-button">
              Save Changes
            </button>

            <button
              type="button"
              className="delete-button-large"
              onClick={handleDelete}
            >
              Delete Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskDetailPage;
