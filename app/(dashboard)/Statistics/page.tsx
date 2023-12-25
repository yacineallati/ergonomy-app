import { prisma } from '@/util/db'
import { getUserFromClerkID } from "@/util/auth"
import Statistics from '@/components/Statistics'

const getTodos = async (id) => {
    const user = await getUserFromClerkID()
    const todos = await prisma.todo.findMany({
        where: {
            userId: user.id,
        }
    })
    return todos
}

const getWorkers = async (id) => {
    const user = await getUserFromClerkID()
    const workers = await prisma.worker.findMany({
        where: {
            userId: user.id
        }
    });
    return workers;
}

const getStatistics = async (id) => {
    const user = await getUserFromClerkID()
    const entries = await prisma.landmarks.findMany({
        where: {
            userId: user.id,
        }
    })

    return entries
}

const NewStatisticspage = async ({params}: {params:any}) => {
    const todos = await getTodos(params.id)
    const workers = await getWorkers(params.id)
    const entries = await getStatistics(params.id)
    console.log(todos);



    return (
        <div className='bg-primary h-full'>
            <Statistics entries={entries} workers = {workers} todos = {todos} />
        </div>
    )
}

export default NewStatisticspage
