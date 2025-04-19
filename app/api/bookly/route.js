import { NextResponse } from 'next/server';
import axios from 'axios';

export const maxDuration = 40;
export const dynamic = 'force-dynamic';

export async function POST(request) {
    const { myBooks, provider = 'openai', model = 'gpt-4.1-nano' } = await request.json();

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

    // TODO: donner un format de reponse pour GPT

    try {
        const response = await axios.post(
            `https://api.${aiProviderURL}/chat/completions`,
            {
                model: model,
                messages: [
                    {
                        role: 'system',
                        content: 'Tu es un assistant pour les meuilleurs choix de livre a lire par rapport aux livre déjà lus de quelqu un.'
                    },
                    {
                        role: 'user',
                        content: 'Donne moi de suggestion de livre a lire en fonction de mes livres deja lus. Mes livres deja lus sont ' + JSON.stringify(myBooks)
                    },
                ],
                max_tokens: 4500,
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const books = response.data.choices[0].message.content;

        return NextResponse.json({ books });
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}