import type { Todo } from '../types';
import '../components/TodoItem.css'

interface TodoItemProps {
  todo: Todo;
  updateStatus: (id: string, status: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
}

function TodoItem({ todo, updateStatus, deleteTodo }: TodoItemProps) {

  const statusColor =
  todo.status === 'avklarad'
  ? '#38a169'
  : todo.status === 'pagaende'
  ? '#d69e2e'
  : '#a0aec0';

  const dotStyle = {
    display: 'inline-block',
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: statusColor,
    marginRight: '0.5rem',
  }
  return (
    <li className='todo-item'>
      <h3>
        <span style={dotStyle}></span>
        {todo.title}
      </h3>
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