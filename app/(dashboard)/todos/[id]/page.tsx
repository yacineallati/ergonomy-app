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
const getWorkers = async (id: string) => {
    const user = await getUserFromClerkID()
    const workers = await prisma.worker.findMany({
        where: {
            userId: user.id
        }
    });
    console.log('Workers:', workers);
    return workers;
  }

const NewTodopage = async ({ params }: { params: any}) => {
    
    const entry = await getTodos(params.id)
    const workers = await getWorkers(params.id)
    return (
        <div className='bg-primary h-full'>
            <NewTodoForm entry={entry} b={ workers } />
        </div>
    )
}

export default NewTodopage