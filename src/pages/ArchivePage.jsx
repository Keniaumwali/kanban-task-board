
import { Link } from "react-router-dom";

function ArchivePage({ tasks, onUpdate }) {
  const archivedTasks = tasks.filter(
    (task) => task.archived || task.status === "done"
  );

  const handleRestore = (task) => {
    onUpdate(task.id, {
      archived: false,
      status: "todo",
    });
  };

  return (
    <div className="archive-page">
      <header className="archive-header">
        <div>
          <h1>Task Archive</h1>
          <p>View completed and archived tasks.</p>
        </div>

        <Link to="/" className="back-link">
          ← Back to Board
        </Link>
      </header>

      <div className="archive-list">
        {archivedTasks.length > 0 ? (
          archivedTasks.map((task) => (
            <div className="archive-card" key={task.id}>
              <div>
                <h3>{task.title}</h3>
                <p>{task.description}</p>

                <span className="priority-badge">
                  {task.priority}
                </span>

                <span className="archive-status">
                  {task.archived ? "Archived" : "Completed"}
                </span>
              </div>

              <div className="archive-actions">
                <Link to={`/task/${task.id}`}>
                  View Details
                </Link>

                <button onClick={() => handleRestore(task)}>
                  Restore Task
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-archive">
            <h2>No archived tasks yet</h2>
            <p>Completed tasks will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ArchivePage;