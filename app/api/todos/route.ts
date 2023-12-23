import { getUserFromClerkID } from '@/util/auth'
import { prisma } from '@/util/db'
import { NextResponse} from 'next/server'
import { update } from '@/util/actions'

export const POST = async (request: Request) => {
    const data = await request.json()
    const user = await getUserFromClerkID()
    const entry = await prisma.todo.create({
        data: {
            title: data.title || 'none',
            startAt: data.startAt || new Date(),
            endAt: data.endAt || new Date(),
            type: data.type || 1,
            muscle: data.muscle || 1,
            supportedarms: data.supported || false,
            supportedlegs: data.supportedlegs || false,
            user: {
                connect: {
                    id: user.id,
                },
            },
            landmark : {
                create: {
                    landmark_shoulder_right: [0, 0, 0],
                    landmark_shoulder_left:  [0, 0, 0],
                    landmark_elbow_right: [0, 0, 0],
                    landmark_elbow_left: [0, 0, 0],
                    landmark_wrist_right: [0, 0, 0],
                    landmark_wrist_left: [0, 0, 0],
                    landmark_hip_right: [0, 0, 0],
                    landmark_hip_left: [0, 0, 0],
                    landmark_index_right: [0, 0, 0],
                    landmark_index_left: [0, 0, 0],
                    landmark_neck: [0, 0, 0],
                    landmark_nose:  [0, 0, 0],
                    landmark_eye_right: [0, 0, 0],
                    landmark_eye_left: [0, 0, 0],
                    landmark_trunk: [0, 0, 0],
                    landmark_ear_left: [0, 0, 0],
                    landmark_ear_right: [0, 0, 0],
                    userId: user.id, // assuming user can be null
                },
            },
            rula: {
                create: {
                    score_a: 0,
                    score_b: 0,
                    Rula_score_A: 0,
                    Rula_score_B: 0,
                    Rula_score_C: 0,
                    userId: user.id, // assuming user can be null

                    },
                },
            },
        })

        update(['/todos'])
        return NextResponse.json({ data: entry })
    }
