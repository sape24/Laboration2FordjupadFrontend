import { useState } from 'react';

interface TodoFormProps {
  addTodo: (title: string, description: string, status: string) => Promise<void>;
}

function TodoForm({ addTodo }: TodoFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('ej_paborjad');
  const [formError, setFormError] = useState('');

  const handleSubmit = async () => {
    if (title.trim().length < 3) {
      setFormError('Titel måste vara minst 3 tecken');
      return;
    }
    if (description.length > 200) {
      setFormError('Beskrivning får max vara 200 tecken');
      return;
    }

    setFormError('');

    try {
      await addTodo(title, description, status);
      setTitle('');
      setDescription('');
      setStatus('ej_paborjad');
    } catch (err) {
      setFormError('Kunde inte spara todo, försök igen');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Lägg till todo</h2>

      {formError && <p style={{ color: 'red' }}>{formError}</p>}

      <div>
        <label>
          Titel:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label>
          Beskrivning:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label>
          Status:
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="ej_paborjad">Ej påbörjad</option>
            <option value="pagaende">Pågående</option>
            <option value="avklarad">Avklarad</option>
          </select>
        </label>
      </div>

      <button onClick={handleSubmit}>Lägg till</button>
    </div>
  );
}

export default TodoForm;