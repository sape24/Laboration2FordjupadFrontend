import './App.css';
import { useState, useEffect } from 'react';
import type { Todo } from './types';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

//Huvudkomponent som äger listav av todos och sköter all kommunikation med API
function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const API_URL = import.meta.env.VITE_API_URL;

  //Hämtar alla todos från API
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

  //Skapar en ny todo och lägger till den först i listan
  const addTodo = async(title: string, description: string, status: string) => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({title, description, status}),
    });

    if (!res.ok) {
      throw new Error('Kunde inte lägga till todo');
    }

    //Använder serverns svar med id så listan får rätt nycekl
    const newTodo = await res.json();
    setTodos([newTodo, ...todos])
  }

  //Uppdaterar status på en todo och byter ut den i listan
  const updateStatus = async (id: string, status: string) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({status}),
    });

    if (!res.ok) {
      throw new Error('Kunde inte uppdatera todo');
    }

    const updatedTodo = await res.json();
    setTodos(todos.map((todo) => (todo._id === id ? updatedTodo : todo)));
  };

  //Tar bort en todo och filtrerar bort den ur listan
  const deleteTodo = async (id: string) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      throw new Error('Kunde inte ta bort todo');
    }

    setTodos(todos.filter((todo) => todo._id !== id));
  }

  //Hämtar todos en gång när komponenten laddas
  useEffect(() => {
    getTodos();
  }, []);

  if (loading) return <p>Laddar...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='container'>
      <h1>Att göra lista</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList
        todos={todos}
        updateStatus={updateStatus}
        deleteTodo={deleteTodo}
      />
    </div>
  );
}
export default App
