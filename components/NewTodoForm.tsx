'use client'
import { useEffect, useState, FormEvent } from 'react';
import { addTodo } from '@/util/api';




const NewTodoForm = ({ entry , b}: {entry : any, b: any[]}) => {
    const [title, setTitle] = useState(entry.title ||'');
    const [startAt, setStartAt] = useState((entry.startAt ? new Date(entry.startAt).toISOString().slice(0, -8) : '') || '');
    const [endAt, setEndAt] = useState((entry.endAt ? new Date(entry.endAt).toISOString().slice(0, -8) : '') || '');
    const [type, setType] = useState(entry.type ||'');
    const [muscle, setMuscle] = useState(entry.muscle ||'');
    const [supportedarms, setSupportedarms] = useState(entry.supportedarms ||'');
    const [supportedlegs, setSupportedlegs] = useState(entry.supportedlegs ||'');
    const [workerId, setWorkerId] = useState(entry.workerId || '');
    const [workers, setWorkers] = useState(b || []);
    useEffect(() => {
        if (Array.isArray(b)) {
            setWorkers(b);
        } else {
            console.error('getWorkers did not return an array', b);
            setWorkers([]);
        }
    }, [b]);


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
                workerId: workerId
            });
    console.log("workers are : ",  workers)
    }
    return (    
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
                className="text-primary p-2 rounded-lg border border-gray-300 bg-tertiary"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
            />
            <input
                className="text-primary p-2 rounded-lg border border-gray-300 bg-tertiary"
                type="datetime-local"
                value={startAt}
                onChange={(e) => setStartAt(e.target.value)}
                placeholder="Start At"
            />
            <input
                className="text-primary p-2 rounded-lg border border-gray-300 bg-tertiary"
                type="datetime-local"
                value={endAt}
                onChange={(e) => setEndAt(e.target.value)}
                placeholder="End At"
            />
            <select
                className="text-primary p-2 rounded-lg border border-gray-300 bg-tertiary"
                value={type}
                onChange={(e) => setType(e.target.value)}
            >
                <option className="text-primary" value="1">
                    Type 1
                </option>
                <option className="text-primary" value="2">
                    Type 2
                </option>
                <option className="text-primary" value="3">
                    Type 3
                </option>
            </select>
            <select
                className="text-primary p-2 rounded-lg border border-gray-300 bg-tertiary"
                value={muscle}
                onChange={(e) => setMuscle(e.target.value)}
            >
                <option className="text-primary" value="1">
                    Muscle 1
                </option>
                <option className="text-primary" value="2">
                    Muscle 2
                </option>
            </select>
            <select
                className="text-primary p-2 rounded-lg border border-gray-300 bg-tertiary"
                value={supportedarms}
                onChange={(e) => setSupportedarms(e.target.value)}
            >
                <option className="text-primary" value="false">
                    arms not supported
                </option>
                <option className="text-primary" value="true">
                    arms supported
                </option>
            </select>
            <select
                className="text-primary p-2 rounded-lg border border-gray-300 bg-tertiary"
                value={supportedlegs}
                onChange={(e) => setSupportedlegs(e.target.value)}
            >
                <option className="text-primary" value="false">
                    legs not supported
                </option>
                <option className="text-primary" value="true">
                    legs supported
                </option>
            </select>
            <select
                className="text-primary p-2 rounded-lg border border-gray-300 bg-tertiary"
                value={workerId}
                onChange={(e) => setWorkerId(e.target.value)}
            >
            {workers.map((worker) => (
                <option key={worker.id} className="text-primary" value={worker.id}>
                    {worker.name}
                </option>
            ))}
            </select>
            <button type="submit" className='text-tertiary p-2 rounded-lg border border-gray-300 bg-secondary'>Submit</button>
        </form>
    );
};

export default NewTodoForm;