import prisma from '@/lib/prisma';

export async function GET(req) {
    const url = new URL(req.url);
    const where = url.searchParams.get('where') || '{}';
    const orderBy = url.searchParams.get('orderBy') || '{}';
    const offset = url.searchParams.get('offset') || '0';
    const limit = url.searchParams.get('limit') || '15';

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
            : { name: 'asc' };

        const placeTags = await prisma.placeTag.findMany({
            where: parsedWhere,
            skip: parseInt(offset, 10),
            take: parseInt(limit, 10),
            orderBy: finalOrderBy
        });

        return new Response(JSON.stringify({ placeTags }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error("Error while fetching placeTags from the database", error);
        return new Response(JSON.stringify({ error: 'Failed to fetch placeTags' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}