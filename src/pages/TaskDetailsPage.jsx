import { useParams, useNavigate } from 'react-router-dom';

export default function TaskDetailsPage({ tasks }) {
  const { id } = useParams();
  const n = useNavigate();
  const t = tasks.find(x => x.id === Number(id));

  if (!t) return <p>Задача не найдена</p>;

  return (
    <div>
      <button onClick={() => n('/tasks')}>← Назад к списку</button>
      <h1>{t.title}</h1>
      <p>{t.description}</p>
      <p>Статус: {t.done ? 'выполнена' : 'в работе'}</p>
    </div>
  );
}