import './App.css';
import { useState, useEffect } from 'react';
import type { Todo } from './types';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const getTodos = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/todos');

      if (!res.ok) {
        throw new Error('Kunde inte hämta todos');
      }

      const data = await res.json();
      setTodos(data);
    } catch (err) {
      setError('Något gick fel vid hämtning av todos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  if (loading) return <p>Laddar...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Att göra lista</h1>
      <ul>
        {todos.map((todo) =>(
          <li key={todo._id}>
            {todo.title} - {todo.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App
