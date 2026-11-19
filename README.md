# Kanban Task Board

A responsive task management application built with React and Vite. The application helps users organize tasks, track progress, and manage work through a three-column Kanban board.

## Features

- **Task Management:** Create, view, edit, and delete tasks.
- **Kanban Board:** Organize tasks into To Do, In Progress, and Done columns.
- **Task Priorities:** Assign High, Medium, or Low priority.
- **Search:** Find tasks by title or description.
- **Priority Filtering:** Filter tasks according to their priority.
- **Task Movement:** Move tasks between different board columns.
- **Task Archive:** View completed tasks and restore them to the board.
- **Task Details:** Open individual task pages and update their information.
- **Local Storage:** Save tasks in the browser so changes remain after refreshing.
- **Responsive Design:** Use the application on desktop and smaller screens.

## Technologies Used

- React
- JavaScript
- Vite
- React Router DOM
- HTML5
- CSS3
- Browser Local Storage
- Git and GitHub

## Project Structure

```text
kanban-task-board/
├── public/
├── src/
│   ├── components/
│   │   ├── Column.jsx
│   │   ├── FilterBar.jsx
│   │   └── TaskCard.jsx
│   ├── data/
│   │   └── initialTasks.js
│   ├── hooks/
│   │   ├── useLocalStorage.js
│   │   └── useTaskFilter.js
│   ├── pages/
│   │   ├── ArchivePage.jsx
│   │   ├── BoardPage.jsx
│   │   └── TaskDetailPage.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/Keniaumwali/kanban-task-board.git
```

### 2. Navigate to the project directory

```bash
cd kanban-task-board
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open the local URL displayed in your terminal to access the application.

## Production Build

To create a production build, run:

```bash
npm run build
```

The generated production files will be available in the `dist` directory.

## Data Storage

The application uses browser Local Storage to persist task information. Tasks are stored locally in the user's browser, so no external database or backend API is required.

## Repository

GitHub: https://github.com/Keniaumwali/kanban-task-board