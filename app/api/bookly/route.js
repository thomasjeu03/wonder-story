import { NextResponse } from 'next/server';
import axios from 'axios';

export const maxDuration = 40;
export const dynamic = 'force-dynamic';

export async function POST(request) {
    const { myBooks, locale, provider = 'openai', model = 'gpt-4.1-nano' } = await request.json();

    let aiProviderURL;
    let apiKey;

    switch (provider) {
        case 'openai':
            aiProviderURL = 'openai.com/v1';
            apiKey = process.env.OPENAI_API_KEY;
            break;
        case 'deepseek':
            aiProviderURL = 'deepseek.com';
            apiKey = process.env.DEEPSEEK_API_KEY;
            break;
        default:
            return new Response(
                JSON.stringify({ error: `Provider ${provider} non supporté.` }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
    }

    try {
        const response = await axios.post(
            `https://api.${aiProviderURL}/chat/completions`,
            {
                model: model,
                messages: [
                    {
                        role: 'system',
                        content: `Tu es un moteur de recommandation de livres très intelligent. 
                        Tu analyses les titres, auteurs, et catégories des livres déjà lus par l'utilisateur pour proposer de nouveaux livres parfaitement adaptés à ses goûts. 
                        Tu ne réponds qu'en JSON pur, sans texte explicatif.`
                    },
                    {
                        role: 'user',
                        content: `Voici mes livres déjà lus : ${JSON.stringify(myBooks, null, 2)}
                        
                        En te basant sur ces livres, recommande-moi 6 livres à lire absolument, triés du meilleur au moins pertinent pour moi, ne me redonne absolument pas de livres deja lus.
                        
                        Le résultat attendu est un tableau JSON exactement dans le même format que celui-ci :
                        [
                            {
                                "title": "string"
                                "inspiratedBy": "string"
                            }
                        ]

                        Le "inspiratedBy" est le titre du livre qui m'a inspiré pour lire ce livre.
                        Respecte **strictement** ce format et n'ajoute **aucun autre champ**.`
                    },
                ],
                max_tokens: 2000,
            },
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
            }
        )

        const books = JSON.parse(response.data.choices[0].message.content)


        if (!books || books.length === 0) {
            return NextResponse.json({ books: [] });
        }

        const requests = books.map(async (book) => {
            try {
                const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
                    params: {
                        q: `intitle:${book?.title}`,
                        maxResults: 1,
                        langRestrict: locale,
                        printType: 'books',
                    },
                });

                const items = response.data.items || [];

                return items.map((item) => ({
                    id: item.id,
                    title: item?.volumeInfo?.title || '',
                    authors: item?.volumeInfo?.authors || [],
                    description: item?.volumeInfo?.description || '',
                    publishedDate: item?.volumeInfo?.publishedDate || '',
                    pageCount: item?.volumeInfo?.pageCount || 0,
                    language: item?.volumeInfo?.language || '',
                    categories: item?.volumeInfo?.categories || [],
                    infoLink: item?.volumeInfo?.infoLink || '',
                    mainCategory: item?.volumeInfo?.mainCategory || '',
                    thumbnail: item?.volumeInfo?.imageLinks?.thumbnail?.replace('http://', 'https://') || '',
                    inspiratedBy: book?.inspiratedBy
                }));
            } catch (error) {
                console.error(`Erreur lors de la recherche du livre : ${book?.title}`, error);
                return []; // En cas d’erreur, retourne un tableau vide pour ne pas casser le reste
            }
        });

        const allResults = await Promise.all(requests);

        const resultToSend = allResults.flat();

        return NextResponse.json({ books: resultToSend });
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}