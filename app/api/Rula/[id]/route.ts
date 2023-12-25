import { prisma } from '@/util/db'
import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getUserFromClerkID } from '@/util/auth'
import { calculate_score_A , calculate_score_B, calculate_Rula_score_C} from '@/util/ai'

export const POST = async (request: Request, { params }: { params: any }) => {
    const user = await getUserFromClerkID();
    console.log('PATCH called with params:', params);

    const { updates } = await request.json();
    console.log('Updates:', updates);

    const entry = await prisma.todo.findUnique({
        where: {
            userId_id: {
                userId: user.id,
                id: params.id,
            },
        },
    })
    const score_a = await calculate_score_A(updates, entry)
    const score_b = await calculate_score_B(updates, entry)
    const score_c = await calculate_Rula_score_C(score_a, score_b, entry)
    const savedlandmarks = await prisma.landmarks.create({
        data: {
            landmark_shoulder_left: updates.landmark_shoulder_left,
            landmark_shoulder_right: updates.landmark_shoulder_right,
            landmark_elbow_left: updates.landmark_elbow_left,
            landmark_elbow_right: updates.landmark_elbow_right,
            landmark_wrist_left: updates.landmark_wrist_left,
            landmark_wrist_right: updates.landmark_wrist_right,
            landmark_hip_left: updates.landmark_hip_left,
            landmark_hip_right: updates.landmark_hip_right,
            landmark_index_left: updates.landmark_index_left,
            landmark_index_right: updates.landmark_index_right,
            score_a : score_a,
            score_b : score_b,
            score_c : score_c,
            todo:{
                connect:{
                    id: entry.id,
                }
            },
            worker: {
                connect: {
                    id: entry.workerId,
                },
            },
            user: {
                connect: {
                    id: user.id,
                },
            },
        },
    });


    revalidatePath('/Rula/[id]', 'page');
    return NextResponse.json({ data: {...entry, landmarks : savedlandmarks}});
};