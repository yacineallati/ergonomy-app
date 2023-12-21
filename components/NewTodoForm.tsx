import { useState, FormEvent } from 'react';

interface NewTodoFormProps {
    onSubmit: (data: { title: string; startAt: string; endAt: string; type: string; muscle: string }) => void;
}

const NewTodoForm = ({ onSubmit }: NewTodoFormProps) => {
    const [title, setTitle] = useState('');
    const [startAt, setStartAt] = useState('');
    const [endAt, setEndAt] = useState('');
    const [type, setType] = useState('');
    const [muscle, setMuscle] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit({ title, startAt, endAt, type, muscle });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
            <input type="datetime-local" value={startAt} onChange={(e) => setStartAt(e.target.value)} placeholder="Start At" />
            <input type="datetime-local" value={endAt} onChange={(e) => setEndAt(e.target.value)} placeholder="End At" />
            <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="1">Type 1</option>
                <option value="2">Type 2</option>
                <option value="3">Type 3</option>
            </select>
            <select value={muscle} onChange={(e) => setMuscle(e.target.value)}>
                <option value="1">Muscle 1</option>
                <option value="2">Muscle 2</option>
            </select>
            <button type="submit">Submit</button>
        </form>
    );
}

export default NewTodoForm;