import { useState, useMemo } from 'react';
import { TaskInput } from './components/TaskInput';
import { TaskList } from './components/TaskList';
import { TaskTabs, type Tab } from './components/TaskTabs';
import { TaskProvider, useTasks } from './context/TaskContext';
import './App.css';

function TaskManagerContent() {
  const [activeTab, setActiveTab] = useState<Tab>('all');
  const { tasks } = useTasks();

  const counts = useMemo(() => {
    return {
      all: tasks.length,
      active: tasks.filter((t) => !t.completed).length,
      completed: tasks.filter((t) => t.completed).length,
    };
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    switch (activeTab) {
      case 'active':
        return tasks.filter((t) => !t.completed);
      case 'completed':
        return tasks.filter((t) => t.completed);
      default:
        return tasks;
    }
  }, [tasks, activeTab]);

  return (
    <div className="app-container">
      <div className="app-card">
        <header className="app-header">
          <h1>Task Manager</h1>
        </header>

        <TaskInput />

        <TaskTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          counts={counts}
        />

        <TaskList tasks={filteredTasks} />

        <footer className="app-footer">
        </footer>
      </div>
    </div>
  );
}

function App() {
  return (
    <TaskProvider>
      <TaskManagerContent />
    </TaskProvider>
  );
}

export default App;
