import { NavLink, Outlet } from 'react-router-dom';
import { useTasks } from '../context/TasksContext';

export default function Layout() {
  const { tasks } = useTasks();
  const activeCount = tasks.filter(t => !t.done).length;

  return (
    <div className="app">
      <header>
        <nav>
          <NavLink to="/" end>Главная</NavLink>
          <NavLink to="/tasks">Задачи ({activeCount})</NavLink>
          <NavLink to="/stats">Статистика</NavLink>
          <NavLink to="/about">О проекте</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>TaskFlow, 2026</footer>
    </div>
  );
}