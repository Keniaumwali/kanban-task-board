
function FilterBar({
  searchTerm,
  setSearchTerm,
  priority,
  setPriority,
}) {
  const priorities = ["All", "High", "Medium", "Low"];

  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Search tasks by title or description..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        className="search-input"
      />

      <div className="priority-filters">
        {priorities.map((level) => (
          <button
            key={level}
            className={`filter-button ${
              priority === level ? "active" : ""
            }`}
            onClick={() => setPriority(level)}
          >
            {level}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterBar;
