import type { Todo } from '../types';
import TodoItem from '../components/TodoItem';
import '../components/TodoList.css'

interface TodoListProps {
  todos: Todo[];
  updateStatus: (id: string, status: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
}

//Rendererar listan av todos och  skickar vidare funktionerna till varje TodoItem
function TodoList({ todos, updateStatus, deleteTodo }: TodoListProps) {
  if (todos.length === 0) {
    return <p>Inga todos ännu.</p>;
  }

  return (
    <ul className='todo-list'>
      {/* Skapar en TodoItem per todo med _id som unik nyckel */}
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          updateStatus={updateStatus}
          deleteTodo={deleteTodo}
        />
      ))}
    </ul>
  );
} 

export default TodoList;