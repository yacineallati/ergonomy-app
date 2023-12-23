'use client'

import { useState, FormEvent } from 'react';
import { addTodo } from '@/util/api';



const NewTodoForm = ({ entry }: {entry : any}) => {
    const [title, setTitle] = useState('');
    const [startAt, setStartAt] = useState('');
    const [endAt, setEndAt] = useState('');
    const [type, setType] = useState('');
    const [muscle, setMuscle] = useState('');
    const [supportedarms, setSupportedarms] = useState('');
    const [supportedlegs, setSupportedlegs] = useState('');

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
            await addTodo(entry.id, {
                title: title,
                startAt: startAt + ':00Z',
                endAt: endAt + ':00Z',
                type: Number(type),
                muscle: Number(muscle),
                supportedarms: Boolean(supportedarms),
                supportedlegs: Boolean(supportedlegs),
            });
    }
    return (
        <form onSubmit={handleSubmit}>
            <input
                className="text-tertiary"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
            />
            <input
                className="text-tertiary"
                type="datetime-local"
                value={startAt}
                onChange={(e) => setStartAt(e.target.value)}
                placeholder="Start At"
            />
            <input
                className="text-tertiary"
                type="datetime-local"
                value={endAt}
                onChange={(e) => setEndAt(e.target.value)}
                placeholder="End At"
            />
            <select
                className="text-tertiary"
                value={type}
                onChange={(e) => setType(e.target.value)}
            >
                <option className="text-tertiary" value="1">
                    Type 1
                </option>
                <option className="text-tertiary" value="2">
                    Type 2
                </option>
                <option className="text-tertiary" value="3">
                    Type 3
                </option>
            </select>
            <select
                className="text-tertiary"
                value={muscle}
                onChange={(e) => setMuscle(e.target.value)}
            >
                <option className="text-tertiary" value="1">
                    Muscle 1
                </option>
                <option className="text-tertiary" value="2">
                    Muscle 2
                </option>
            </select>
            <select
                className="text-tertiary"
                value={supportedarms}
                onChange={(e) => setSupportedarms(e.target.value)}
            >
                <option className="text-tertiary" value="false">
                    not supported
                </option>
                <option className="text-tertiary" value="true">
                    supported
                </option>
            </select>
            <select
                className="text-tertiary"
                value={supportedlegs}
                onChange={(e) => setSupportedlegs(e.target.value)}
            >
                <option className="text-tertiary" value="false">
                    not supported
                </option>
                <option className="text-tertiary" value="true">
                    supported
                </option>
            </select>
            <button type="submit">Submit</button>
        </form>
    );
};

export default NewTodoForm;