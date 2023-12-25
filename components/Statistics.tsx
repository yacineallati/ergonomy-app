"use client"
import React, { useState, useEffect } from 'react';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import dynamic from 'next/dynamic';

const LineChart = dynamic(
    () => import('recharts').then((mod) => mod.LineChart),
    { ssr: false }
  );
const Statistics = ({ entries, workers, todos }) => {
    const [workerId, setWorkerId] = useState('');
    const [todoId, setTodoId] = useState(todos[0]?.id ||'');
    const [data, setData] = useState([]);

    useEffect(() => {
        console.log('useEffect triggered'); // Log when useEffect is triggered
        console.log('Current workerId:', workerId); // Log current workerId
        console.log('Current todoId:', todoId); // Log current todoId
        if (workerId && todoId) {
            const filteredEntries = entries.filter(entry => entry.workerId === workerId && entry.todoId === todoId);
            console.log('Filtered entries:', filteredEntries); // Log filtered entries
            const newData = filteredEntries.map(entry => ({
                date: new Date(entry.createdAt).toISOString().slice(0, -8),
                scoreA: entry.score_a,
                scoreB: entry.score_b,
                RulaScore: entry.score_c,
            }));
            console.log('New data:', newData); // Log new data
            setData(newData);
        }
    }, [workerId, todoId, entries]);

    return (
<div className="flex flex-col items-center space-y-4">
    <select 
        onChange={(e) => {
            console.log('WorkerId selected:', e.target.value); // Log when a workerId is selected
            setWorkerId(e.target.value);
        }}
        className="p-2 rounded-lg border border-gray-300 bg-primary text-tertiary"
    >
        {workers.map(worker => <option key={worker.id} value={worker.id}>{worker.name}</option>)}
    </select>

    <select 
        onChange={(e) => {
            console.log('Todo selected:', e.target.value); // Log when a workerId is selected
            setTodoId(e.target.value);
        }}
        className="p-2 rounded-lg border border-gray-300 bg-primary text-tertiary"
    >
        {todos.map(todo => <option key={todo.id} value={todo.id}>{todo.title}</option>)}
    </select>

    <div className="w-full flex justify-center">
        <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            className="w-full max-w-xl"
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="scoreA" stroke="#7bafb1" name='Rula Table A score' activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="scoreB" stroke="#0F7173" name='Rula table B score'/>
            <Line type="monotone" dataKey="RulaScore" stroke="#F05D5E" name="Rula Score"/>
        </LineChart>
    </div>
</div>
    );
};

export default Statistics;