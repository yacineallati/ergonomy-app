'use client'
import {useState, FormEvent } from 'react';
import { addWorker } from '@/util/api';

const NewWorkerForm = ({entry}:{entry : any}) => {
    const [name, setName] = useState(entry.name || '');
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
            await addWorker(entry.id, {
                name: name
            })
    }
    return (    
        <form onSubmit={handleSubmit}>
            <input
                className="text-primary p-2 rounded-lg border border-gray-300 bg-tertiary mr-5 ml-5"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
            />
            <button type="submit" className='text-tertiary p-2 rounded-lg border border-gray-300 bg-secondary'>Submit</button>
        </form>
    )
}

export default NewWorkerForm