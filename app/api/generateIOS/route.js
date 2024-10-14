import { NextResponse } from 'next/server';
import axios from 'axios';

export const maxDuration = 30;
export const dynamic = 'force-dynamic';

// TODO : optimiser le prompte pour IOS
export async function POST(request) {
    const { data } = await request.json();

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-4o-mini',
                messages: [
                    {
                        role: 'system',
                        content: 'Tu es un assistant spécialisé en création d\'histoires pour enfants. ' +
                            'Ton rôle est de générer un titre accrocheur et une histoire adaptée à un enfant, qui est adaptée à leur age et au niveau du vocabulaire.' +
                            'Je veux que le contenu de l histoire incorpore les données du prompte. ' +
                            'Le retour doit inclure le titre et l\'histoire, chacun séparé par une balise spéciale, que je te fournirai.' +
                            'ATTENTION: Tu sais faire attention à choisir la bonne traduction en fonction du local situé en fin de prompt, il est obligatoire de prendre cela en compte',
                    },
                    {
                        role: 'user',
                        content: 'Crée une histoire pour un enfant de ' + data.ageRange + ' ans. ' +
                            'Les personnages sont : ' + data.caracters.join(', ') + '. ' +
                            'Le temps de lecture est : ' + data.time + ' minutes. ' +
                            'La morale de l\'histoire est nécessaire si le champ "moral" est égal à true : "moral" = ' + (data.moral ? 'true' : 'false') + ' . ' +
                            'Sépare le titre de l\'histoire avec cette balise : "[TITLE_END]".' +
                            'Ne rajoute surtout pas de balise "[TITLE]" au début du titre.' +
                            'L\'histoire doit être traduite en : "' + data.locale + '". '
                    },
                ],
                max_tokens: data.time * 1500,
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const fullContent = response.data.choices[0].message.content;
        const [storyTitle, storyContent] = fullContent.split('[TITLE_END]').map(part => part.trim());

        return NextResponse.json({ storyTitle, storyContent }, { status: 200 });
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}