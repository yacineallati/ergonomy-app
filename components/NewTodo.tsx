'use client'
import { NewTodo } from '@/util/api'
import { useRouter } from 'next/navigation'

const newTodo = () => {
    const router = useRouter()
    const handleOnClick = async () => {
        const { data } = await NewTodo()
        router.push(`/todos/${data.id}`)
    }
    return (
        <div className='flex justify-end items-center'>
            <div className='cursor-pointer overflow-hidden rounded-lg bg-secondary shadow w-48 h-12' onClick={handleOnClick}>
                <div className='px-4 py-2 sm:p-3'>
                    <span className="text-Mint">New Todo</span>
                </div>
            </div>
        </div>
    )
}

export default newTodo