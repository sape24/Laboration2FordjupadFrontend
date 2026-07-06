import type { Todo } from '../types';
import TodoItem from '../components/TodoItem';
import '../components/TodoList.css'

interface TodoListProps {
  todos: Todo[];
  updateStatus: (id: string, status: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
}

function TodoList({ todos, updateStatus, deleteTodo }: TodoListProps) {
  if (todos.length === 0) {
    return <p>Inga todos ännu.</p>;
  }

  return (
    <ul className='todo-list'>
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