'use client'
import { NewTodo } from '@/util/api'
import { useRouter} from 'next/navigation'

const newTodo = ()  => {
    const router = useRouter()
    const handleOnClick = async () => {
        const data = await NewTodo()
        router.push(`/todos/${data.id}`)
    }
    return (
        <div className='cursor-pointer overflow-hidden rounded-lg bg-secondary shadow'>
        <div className='px-4 py-5 sm:p-3' onClick={handleOnClick}>
            <span className="text-Mint">New Todo</span>
        </div>
            
            
        </div>
    )
}

export default newTodo

