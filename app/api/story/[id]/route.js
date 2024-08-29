import prisma from '@/lib/prisma';

export async function GET(req, { params }) {
    const { id } = params;

    try {
        const story = await prisma.story.findFirst({
            where: { id: Number(id) },
        });

        if (!story) {
            return new Response(JSON.stringify({ error: 'Story not found' }), { status: 404 });
        }

        return new Response(JSON.stringify({ story }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}