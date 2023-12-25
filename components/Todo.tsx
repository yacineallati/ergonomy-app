import Link from 'next/link'


const Todo = ({ entry }: { entry: any }) => {
    const date = new Date(entry.startAt);
    return (
        <div className='cursor-pointer overflow-hidden rounded-lg bg-secondary shadow'>
            <div className='flex justify-between items-center px-4 py-5 sm:p-3'>
                <div className='space-x-4'>
                <span className="text-primary pl-2">{entry.title}</span>
                <span className="text-primary">{date.toLocaleString()}</span>
                </div>
                <div className='space-x-4'>
                <Link href={`/todos/${entry.id}`}>
                <span className='text-primary rounded-lg bg-tertiary p-2'>edit</span>
                </Link>
                <Link href={`/Rula/${entry.id}`}>
                <span className='text-primary rounded-lg bg-tertiary p-2'>view worker</span>
                </Link>
                </div>
            </div>
        </div>
    )
}

export default Todo