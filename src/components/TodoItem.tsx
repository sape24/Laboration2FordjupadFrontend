import type { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  updateStatus: (id: string, status: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
}

function TodoItem({ todo, updateStatus, deleteTodo }: TodoItemProps) {
  return (
    <li>
      <strong>{todo.title}</strong>
      {todo.description && <p>{todo.description}</p>}

      <label>
        Status:
        <select
          value={todo.status}
          onChange={(e) => updateStatus(todo._id, e.target.value)}
        >
          <option value="ej_paborjad">Ej påbörjad</option>
          <option value="pagaende">Pågående</option>
          <option value="avklarad">Avklarad</option>
        </select>
      </label>

      <button onClick={() => deleteTodo(todo._id)}>Ta bort</button>
    </li>
  );
}

export default TodoItem;