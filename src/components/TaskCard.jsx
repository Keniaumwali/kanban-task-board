
import { Link } from "react-router-dom";

function TaskCard({ task, onDelete, onMove }) {
  return (
    <div className="task-card">
      <div className="task-card-header">
        <span className={`priority-badge ${task.priority.toLowerCase()}`}>
          {task.priority}
        </span>

        <button
          className="delete-button"
          onClick={() => onDelete(task.id)}
          aria-label={`Delete ${task.title}`}
        >
          ×
        </button>
      </div>

      <Link to={`/task/${task.id}`} className="task-link">
        <h3>{task.title}</h3>
        <p>{task.description}</p>

        <div className="task-card-footer">
          <span>Task #{task.id}</span>
          <span>View details →</span>
        </div>
      </Link>

      <div className="task-move-control">
        <label htmlFor={`move-${task.id}`}>Move to:</label>

        <select
          id={`move-${task.id}`}
          value={task.status}
          onChange={(event) => onMove(task.id, event.target.value)}
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
    </div>
  );
}

export default TaskCard;
