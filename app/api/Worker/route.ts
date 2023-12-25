import { getUserFromClerkID } from '@/util/auth'
import { prisma } from '@/util/db'
import { NextResponse } from 'next/server'
import { update } from '@/util/actions'

export const POST = async (request: Request) => {
    const data = await request.json()
    const user = await getUserFromClerkID()
    const entry = await prisma.worker.create({
        data: {
            name: data.name,
            user: {
                connect: {
                    id: user.id,
                },
            },
        },
    })

    update(['/Worker'])
    return NextResponse.json({ data: entry })
}

