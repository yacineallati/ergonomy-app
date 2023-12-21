const Todo = ({ entry }: { entry: any }) => {
    const date = new Date(entry.startAt);
    return (
        <div className='cursor-pointer overflow-hidden rounded-lg bg-secondary shadow'>
            <div className='px-4 py-5 sm:p-3'>
                <span className="text-tertiary">{entry.title}</span>
                <span className="text-tertiary">{date.toLocaleString()}</span>
            </div>
        </div>
    )
}

export default Todo