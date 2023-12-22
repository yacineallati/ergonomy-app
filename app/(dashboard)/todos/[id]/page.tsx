import NewTodoForm from '@/components/NewTodoForm'
import { prisma } from '@/util/db'

const getTodos = async ({id}: {id:any}) => {
    const entry = await prisma.todo.findUnique({
        where: {
            id: id,
        },
    })
    return entry
}

const NewTodopage = async ({ params }: { params: any}) => {
    const entry = await getTodos(params.id)
    return (
        <div>
            <NewTodoForm entry={entry} />
        </div>
    )
}

export default NewTodopage