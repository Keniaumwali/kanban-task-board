
import TaskCard from "./TaskCard";

function Column({ title, status, tasks, onDelete, onMove }) {
  const columnTasks = tasks.filter(
    (task) => task.status === status && !task.archived
  );

  return (
    <div className="kanban-column">
      <div className="column-header">
        <h2>{title}</h2>
        <span className="task-count">{columnTasks.length}</span>
      </div>

      <div className="column-tasks">
        {columnTasks.length > 0 ? (
          columnTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={onDelete}
              onMove={onMove}
            />
          ))
        ) : (
          <p className="empty-column">No tasks yet</p>
        )}
      </div>
    </div>
  );
}

export default Column;
