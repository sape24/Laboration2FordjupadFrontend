import './App.css';
import { useState, useEffect } from 'react';
import type { Todo } from './types';
import TodoForm from './components/TodoForm';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const API_URL = import.meta.env.VITE_API_URL;

  const getTodos = async () => {
    try {
      const res = await fetch(API_URL);

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

  const addTodo = async(title: string, description: string, status: string) => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({title, description, status}),
    });

    if (!res.ok) {
      throw new Error('Kunde inte lägga till todo');
    }

    const newTodo = await res.json();
    setTodos([newTodo, ...todos])
  }

  useEffect(() => {
    getTodos();
  }, []);

  if (loading) return <p>Laddar...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Att göra lista</h1>
      <TodoForm addTodo={addTodo} />
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
