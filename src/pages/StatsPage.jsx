import { useTasks } from '../context/TasksContext';
import { removeTask } from '../api';

export default function StatsPage() {
  const { tasks, dispatch, loading, error } = useTasks();

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p style={{ color: 'red' }}>Ошибка: {error}</p>;

  const total = tasks.length;
  const doneCount = tasks.filter(x => x.done).length;
  const p = total ? Math.round((doneCount / total) * 100) : 0;

  const clearDone = async () => {
    const doneTasks = tasks.filter(x => x.done);
    for (const item of doneTasks) {
      await removeTask(item.id);
    }
    dispatch({ type: 'CLEAR_DONE' });
  };

  return (
    <div>
      <h1>Статистика</h1>
      <p>Всего задач: {total}</p>
      <p>Выполнено: {doneCount}</p>
      <p>Процент выполнения: {p}%</p>
      <button onClick={clearDone}>Удалить выполненные</button>
    </div>
  );
}