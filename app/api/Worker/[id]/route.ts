import {prisma} from '@/util/db'
import {NextResponse} from 'next/server'
import { revalidatePath } from 'next/cache'
import { getUserFromClerkID } from '@/util/auth'

export const PATCH = async (request: Request, {params}: {params:any}) => {
    const { updates } = await request.json()
    const user = await getUserFromClerkID()
    const entry = await prisma.worker.update({
        where: {
            userId_id: {
                userId: user.id,
                id: params.id
            }
        },
        data: updates
    })


    revalidatePath('/Worker/[id]', 'page')
    return NextResponse.json({ data: entry })
}