import { prisma } from '@/util/db'
import { NextResponse} from 'next/server'
import { update } from '@/util/actions'

export const POST = async (request: Request) => {
    const data = await request.json()
    const entry = await prisma.todo.create({
        data: {
            title: data.title || 'none',
            startAt: data.startAt || new Date(),
            endAt: data.endAt || new Date(),
            type: data.type || 1,
            muscle: data.muscle || 1,
        }
    })
    update(['/todos'])
    return NextResponse.json({ data: entry })
}