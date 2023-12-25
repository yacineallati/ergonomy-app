import {prisma} from '@/util/db'
import {NextResponse} from 'next/server'
import { revalidatePath } from 'next/cache'
import { getUserFromClerkID } from '@/util/auth'

export const DELETE = async (request: Request, {params}: {params:any}) => {
    const user = await getUserFromClerkID()
    const entry = await prisma.todo.delete({
        where: {
            userId_id: {
                userId: user.id,
                id: params.id
            }
        }
    })

    revalidatePath('/todos', 'page')
    return NextResponse.json({ data: entry })
}

export const PATCH = async (request: Request, {params}: {params:any}) => {
    const { updates } = await request.json()
    const user = await getUserFromClerkID()
    const entry = await prisma.todo.update({
        where: {
            userId_id: {
                userId: user.id,
                id: params.id
            }
        },
        data: updates
    })


    revalidatePath('/todos/[id]', 'page')
    return NextResponse.json({ data: entry })
}
export const GET = async () => {
    const workers = await prisma.worker.findMany()
    return NextResponse.json({ data: workers })
}