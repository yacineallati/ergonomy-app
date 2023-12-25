import { prisma } from '@/util/db'
import { getUserFromClerkID } from "@/util/auth"
import WebcamComponent from '@/components/webcam'


const getTodos = async (id) => {
    console.log('getTodos called with id:', id);
    
    const user = await getUserFromClerkID()
    console.log('User:', user);
    
    const entry = await prisma.todo.findUnique({
        where: {
            userId_id: {
                userId: user.id,
                id: id,
            }
        },
        include: {
            landmarks: true,
        },
    })
    
    console.log('Entry:', entry);
    
    return entry
}

const NewRulapage = async ({ params }: { params: any}) => {
    const entry = await getTodos(params.id)
    return (
        <div>
            <WebcamComponent entry={entry} />
        </div>
    )
}

export default NewRulapage