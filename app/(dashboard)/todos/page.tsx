import NewTodo from '@/components/NewTodo'
import Todo  from '@/components/Todo'
import { prisma } from '@/util/db'
import Link from 'next/link'
import { getUserFromClerkID } from "@/util/auth"




const getTodos = async () => {
    const user = await getUserFromClerkID()
    const data = await prisma.todo.findMany({
        where: {
            userId: user.id,
        },
        orderBy: {
            startAt: 'desc',
        },
        include: {
          worker: true,
        },
    })

    return data
}



const todospage = async () => { 
    const data = await getTodos()
    return (
        <div className="px-6 py-8 bg-primary h-full">
            <div className='space-y-2'>
            <NewTodo />
            
            {data.map((entry) => (
              <div key={entry.id}>
                  <Todo entry={entry} />
              </div>
            ))}
            </div>
        </div>
    )
}

export default todospage