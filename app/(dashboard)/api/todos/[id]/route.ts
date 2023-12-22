import {prisma} from '@/util/db'
import {NextResponse} from 'next/server'
import { revalidatePath } from 'next/cache'

export const PATCH = async (request: Request, {params}: {params:any}) => {
    const { updates } = await request.json()
    const entry = await prisma.todo.update({
        where: {
            id: params.id
        },
        data: updates
    })


    revalidatePath('/todos/[id]', 'page')
    return NextResponse.json({ data: entry })
}