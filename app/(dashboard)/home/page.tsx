import React from 'react'
import Link from 'next/link'

const HomePage: React.FC = () => {
    return (
        <div className='flex justify-center items-center h-screen space-x-4 bg-primary'>
            <div className='w-1/4 h-64 bg-secondary flex justify-center items-center rounded-lg shadow-md'>
                <Link href="/todos" className='text-white text-lg'>Todos</Link>
            </div>
            <div className='w-1/4 h-64 bg-quaternary flex justify-center items-center rounded-lg shadow-md'>
                <Link href="/Worker" className='text-white text-lg'>Workers</Link>
            </div>
            <div className='w-1/4 h-64 bg-quinary flex justify-center items-center rounded-lg shadow-md'>
                <Link href="/Statistics" className='text-white text-lg'>Statistics</Link>
            </div>
        </div>
    );
};

export default HomePage;