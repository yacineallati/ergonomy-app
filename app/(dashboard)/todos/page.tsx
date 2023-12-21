import NewTodo from '@/components/NewTodo'
import Todo  from '@/components/Todo'
import { prisma } from '@/util/db'
import Link from 'next/link'


const getTodos = async () => {
    const data = await prisma.todo.findMany({
        orderBy: {
            startAt: 'desc'
        }
    })
    return data
    }


const todos = () => { 
    const data = getTodos()  
    return (
        <div className="px-6 py-8 bg-primary-100/50 h-full">

            <h1>todos</h1>
        </div>
    )
}

export default todos