import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTasks } from '../context/TasksContext';
import { createTask, toggleTask, removeTask } from '../api';

export default function TasksPage() {
  const { tasks, dispatch, loading, error } = useTasks();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [err, setErr] = useState('');
  const [filter, setFilter] = useState('all');

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p style={{ color: 'red' }}>Ошибка: {error}</p>;

  const sub = async e => {
    e.preventDefault();
    if (!title.trim()) {
      setErr('Название обязательно');
      return;
    }
    setErr('');
    try {
      const res = await createTask(title, desc);
      dispatch({ type: 'ADD', payload: res });
      setTitle('');
      setDesc('');
    } catch (ex) {
      setErr(ex.message);
    }
  };

  const tog = async id => {
    try {
      await toggleTask(id);
      dispatch({ type: 'TOGGLE', id });
    } catch (ex) {
      alert(ex.message);
    }
  };

  const rem = async id => {
    try {
      await removeTask(id);
      dispatch({ type: 'DELETE', id });
    } catch (ex) {
      alert(ex.message);
    }
  };

  const visible = tasks.filter(x => {
    if (filter === 'active') return !x.done;
    if (filter === 'done') return x.done;
    return true;
  });

  return (
    <div>
      <h1>Задачи</h1>
      <form onSubmit={sub}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Название" />
        <input value={desc} onChange={e => setDesc(e.target.value)} placeholder="Описание" />
        <button type="submit">Добавить</button>
        {err && <p style={{ color: 'red' }}>{err}</p>}
      </form>

      <div>
        <button onClick={() => setFilter('all')}>Все</button>
        <button onClick={() => setFilter('active')}>Активные</button>
        <button onClick={() => setFilter('done')}>Выполненные</button>
      </div>

      <ul>
        {visible.map(x => (
          <li key={x.id}>
            <input type="checkbox" checked={x.done} onChange={() => tog(x.id)} />
            <Link to={'/tasks/' + x.id} style={{ textDecoration: x.done ? 'line-through' : 'none' }}>
              {x.title}
            </Link>
            <button onClick={() => rem(x.id)}>Удалить</button>
          </li>
        ))}
      </ul>
      <p>Всего: {tasks.length}, выполнено: {tasks.filter(x => x.done).length}</p>
    </div>
  );
}