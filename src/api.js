const b = 'http://localhost:3001/api/tasks';

export async function getTasks() {
  const r = await fetch(b);
  if (!r.ok) throw new Error('Не удалось загрузить задачи');
  return r.json();
}

export async function createTask(title, description) {
  const r = await fetch(b, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description }),
  });
  if (!r.ok) throw new Error('Не удалось создать задачу');
  return r.json();
}

export async function toggleTask(id) {
  const r = await fetch(`${b}/${id}`, { method: 'PATCH' });
  if (!r.ok) throw new Error('Не удалось обновить задачу');
  return r.json();
}

export async function removeTask(id) {
  const r = await fetch(`${b}/${id}`, { method: 'DELETE' });
  if (!r.ok) throw new Error('Не удалось удалить задачу');
}