import { NextResponse } from 'next/server';
import axios from 'axios';
import prisma from '@/lib/prisma';

export const maxDuration = 40;
export const dynamic = 'force-dynamic';

// TODO : optimiser les promptes
export async function POST(request) {
    const { data, userId, provider = 'openai', model = 'gpt-4o-mini' } = await request.json();

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
                        content: 'Tu es un assistant pour creer des histoires et contes pour enfants. ' +
                            'Répond moi toujours en créant une histoire sous format markdown, de plus lorsqu il y a des dialogues de personnages tu les mets dans des balises < code >. ' +
                            'Tu es un expert dans la mise en forme MarkDown pour ces histoires. Tu as l habitude de raconter des histoires à de nombreux enfant, qui sont adaptée à leur age au niveau du vocabulaire. ' +
                            'Je ne veux que le contenu de l histoire en incorporant toutes les données du prompte. ' +
                            'ATTENTION: Tu sais faire attention à choisir la bonne traduction en fonction du local situé en fin de prompt, il est obligatoire de prendre cela en compte',
                    },
                    {
                        role: 'user',
                        content: 'Crée moi uns histoire pour un enfant de ' + data.ageRange + 'ans. ' +
                            'Les personnages de cette histoire sont: ' + data.caracters.join(', ') + '. ' +
                            'Le personnage principal sera donc ' + data.mainCaracter + '. ' +
                            'Cette histoire se déroulera à travers les lieux suivant: ' + data.places.join(', ') + '. ' +
                            'Cette histoire aura un temps de lecture de: ' + data.time + 'min. ' +
                            'La morale de l\'histoire est nécessaire si le champ "moral" est égal à true : "moral" = ' + (data.moral ? 'true' : 'false') + ' . ' +
                            'Cette histoire se basera sur les thèmes suivants: ' + data.genres.join(', ') + '. ' +
                            'Traduis obligatoirement cette histoire en : "' + data.locale + '".',
                    },
                ],
                max_tokens: data.time * 1500,
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const storyContent = response.data.choices[0].message.content;

        const newStory = await prisma.story.create({
            data: {
                userId: userId,
                content: storyContent,
                ageRange: data.ageRange,
                caracters: data.caracters,
                mainCaracter: data.mainCaracter,
                places: data.places,
                time: data.time,
                moral: data.moral,
                genres: data.genres,
                locale: data.locale,
            },
        });

        await prisma.user.update({
            where: { id: userId },
            data: {
                storiesGenerated: {
                    increment: 1,
                },
            },
        });

        return NextResponse.json({ id: newStory.id });
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}