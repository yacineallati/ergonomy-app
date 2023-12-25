import { getUserFromClerkID } from '@/util/auth'
import { prisma } from '@/util/db'
import { NextResponse} from 'next/server'
import { update } from '@/util/actions'

export const POST = async (request: Request) => {
    const data = await request.json()
    const user = await getUserFromClerkID()
    const entry = await prisma.todo.create({
        data: {
            title: data.title ,
            startAt: data.startAt,
            endAt: data.endAt,
            type: data.type,
            muscle: data.muscle,
            supportedarms: data.supportedarms,
            supportedlegs: data.supportedlegs,
            worker: {
                connect: {
                    id: "9670f4b6-f521-4e7c-a173-b38faf1f4853",
                },
            },
            user: {
                connect: {
                    id: user.id,
                },
            },

            },
        })

        update(['/todos'])
        return NextResponse.json({ data: entry })
    }

