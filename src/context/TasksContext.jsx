import { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { getTasks } from '../api';

const c = createContext(null);

function red(s, a) {
  switch (a.type) {
    case 'SET': return a.payload;
    case 'ADD': return [...s, a.payload];
    case 'TOGGLE': return s.map(x => x.id === a.id ? { ...x, done: !x.done } : x);
    case 'DELETE': return s.filter(x => x.id !== a.id);
    case 'CLEAR_DONE': return s.filter(x => !x.done);
    default: return s;
  }
}

export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(red, []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTasks()
      .then(d => {
        dispatch({ type: 'SET', payload: d });
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <c.Provider value={{ tasks, dispatch, loading, error }}>
      {children}
    </c.Provider>
  );
}

export function useTasks() {
  const x = useContext(c);
  if (!x) throw new Error('err');
  return x;
}