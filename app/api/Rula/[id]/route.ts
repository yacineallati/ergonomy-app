import { prisma } from '@/util/db'
import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { calculate_score_A } from '@/util/ai'
import { getUserFromClerkID } from '@/util/auth'

export const PATCH = async (request: Request, { params }: { params: any }) => {
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
            data: updates,
        },
    });

    revalidatePath('/Rula/[id]', 'page');
    return NextResponse.json({ data:entry});
};