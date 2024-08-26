import { NextResponse } from 'next/server';
import axios from 'axios';
// TODO : optimiser les promptes
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
                            'Durant cette époque temporelle: ' + data.eras.join(', ') + '. ' +
                            'Cette histoire devra comporter une morale si le mot suivant est egal à true: ' + data.moral + '. ' +
                            'Cette histoire se basera sur les thèmes suivants: ' + data.genres.join(', ') + '. ' +
                            'Traduis obligatoirement cette histoire en : "' + data.locale + '".',
                    },
                ],
                max_tokens: data.time * 1000,
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const storyContent = response.data.choices[0].message.content;

        return NextResponse.json({ story: storyContent });
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}