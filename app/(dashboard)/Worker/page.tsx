import NewWorker from '@/components/NewWorker'
import Worker  from '@/components/Worker'
import { prisma } from '@/util/db'
import Link from 'next/link'
import { getUserFromClerkID } from "@/util/auth"




const getWorkers = async () => {
    const user = await getUserFromClerkID()
    const data = await prisma.worker.findMany({
        where: {
            userId: user.id,
        },
        orderBy: {
            createdAt: 'desc',
        },
    })

    return data
}


const workerspage = async () => { 
    const data = await getWorkers()
    return (
        <div className="px-6 py-8 bg-primary h-full">
            <div className='space-y-2'>
            <NewWorker />
            {data.map((entry) => (
              <div key={entry.id}>
                  <Worker entry={entry} />
              </div>
            ))}
        </div>
        
        </div>
    )
}

export default workerspage