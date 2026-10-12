const e = require('express');
const c = require('cors');
const app = e();

app.use(c());
app.use(e.json());

let t = [
  { id: 1, title: 'Изучить маршрутизацию', description: 'React Router', done: true },
  { id: 2, title: 'Подключить сервер', description: 'fetch + Express', done: false },
];
let n = 3;

app.get('/api/tasks', (req, res) => res.json(t));

app.post('/api/tasks', (req, res) => {
  const { title, description } = req.body;
  if (!title || !title.trim()) {
    return res.status(400).json({ error: 'Название обязательно' });
  }
  const x = { id: n++, title: title.trim(), description: description || '', done: false };
  t.push(x);
  res.status(201).json(x);
});

app.patch('/api/tasks/:id', (req, res) => {
  const x = t.find(i => i.id === Number(req.params.id));
  if (!x) return res.status(404).json({ error: 'Задача не найдена' });
  x.done = !x.done;
  res.json(x);
});

app.delete('/api/tasks/:id', (req, res) => {
  t = t.filter(i => i.id !== Number(req.params.id));
  res.status(204).end();
});

app.listen(3001, () => console.log('API: http://localhost:3001'));