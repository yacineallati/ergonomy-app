import NewWorkerForm from '@/components/NewWorkerForm'
import { prisma } from '@/util/db'
import { getUserFromClerkID } from "@/util/auth"

const getWorkers = async (id) => {
    const user = await getUserFromClerkID()
    const entry = await prisma.worker.findUnique({
        where: {
            userId_id: {
                userId: user.id,
                id: id,
            }
        }

    })
    return entry
}

const NewWorkerpage = async ({ params }: { params: any}) => {
    
    const entry = await getWorkers(params.id)
    return (
        <div className='bg-primary h-full'>
            <NewWorkerForm entry={entry} />
        </div>
    )
}

export default NewWorkerpage