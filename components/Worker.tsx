import Link from 'next/link'

const Worker = ({ entry }: { entry: any }) => {
    const date = new Date(entry.createdAt);
    return (
        <div className='cursor-pointer overflow-hidden rounded-lg bg-secondary shadow'>
            <div className='flex justify-between items-center px-4 py-5 sm:p-3'>
            <div className='space-x-4'>
                <span className="text-primary pl-2">{entry.name}</span>
                <span className="text-primary">{date.toLocaleString()}</span>
            </div>
            <div className='space-x-4'>
                <Link href={`/Worker/${entry.id}`}>
                    <span className='text-primary rounded-lg bg-tertiary p-2 mr-2'>edit</span>
                </Link>
            </div>
            </div>
        </div>
    )
}

export default Worker