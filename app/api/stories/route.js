import prisma from '@/lib/prisma';

export async function GET(req) {
    const { where = '{}', offset = '0', limit = '15', orderBy = '{}' } = req.url || {};
    // TODO: faire fonctionner les params
    try {
        let parsedWhere;
        let parsedOrderBy;

        try {
            parsedWhere = JSON.parse(where);
        } catch (e) {
            return new Response(JSON.stringify({ error: 'Invalid where parameter' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        try {
            parsedOrderBy = JSON.parse(orderBy);
        } catch (e) {
            return new Response(JSON.stringify({ error: 'Invalid orderBy parameter' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const offsetNumber = parseInt(offset, 0);
        const limitNumber = parseInt(limit, 15);

        if (isNaN(offsetNumber) || offsetNumber < 0) {
            return new Response(JSON.stringify({ error: 'Invalid offset parameter' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        if (isNaN(limitNumber) || limitNumber <= 0) {
            return new Response(JSON.stringify({ error: 'Invalid limit parameter' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        const finalOrderBy = Object.keys(parsedOrderBy).length > 0
            ? parsedOrderBy
            : { createdAt: 'desc' };

        const stories = await prisma.story.findMany({
            where: parsedWhere,
            skip: parseInt(offset, 10),
            take: parseInt(limit, 10),
            orderBy: finalOrderBy
        });

        return new Response(JSON.stringify({ stories }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error("Error while fetching stories from the database", error);
        return new Response(JSON.stringify({ error: 'Failed to fetch stories' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}