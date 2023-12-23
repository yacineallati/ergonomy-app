import NewTodoForm from '@/components/NewTodoForm'
import { prisma } from '@/util/db'
import { getUserFromClerkID } from "@/util/auth"


const getTodos = async (id) => {
    const user = await getUserFromClerkID()
    const entry = await prisma.todo.findUnique({
        where: {
            userId_id: {
                userId: user.id,
                id: id,
            }
        }

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