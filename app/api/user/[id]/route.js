import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';

export async function GET(request, { params }) {
    const { id } = params;

    const session = await getServerSession(request);

    if (!session) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    try {
        const user = await prisma.user.findFirst({
            where: { id: Number(id) },
        });

        if (!user) {
            return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
        }

        return new Response(JSON.stringify({ user }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Failed to fetch user' }), { status: 500 });
    }
}