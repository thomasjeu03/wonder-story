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
                            'Répond moi toujours en créer une histoire sous format markdown, de plus lorsqu il y a des dialogues de personnages tu les mets dans des balises < code >. ' +
                            'Tu es un expert dans la mise en forme MarkDown pour ces histoires. ' +
                            'Je ne veux que le contenu de l histoire en incorporant toutes les données du prompte. ' +
                            'ATTENTION: Tu sais faire attention à choisir la bonne traduction en fonction du locale situé en fin de prompt, il est obligatoire de prendre cela en compte',
                    },
                    {
                        role: 'user',
                        content: 'Crée moi uns histoire pour un enfant de ' + data.ageRange + 'ans. ' +
                            'Cette histoire aura comme personnages: ' + data.caracters.join(', ') + '. ' +
                            'Le personnage principal sera donc ' + data.mainCaracter + '. ' +
                            'Cette histoire se déroulera à travers les lieux suivant: ' + data.places.join(', ') + ', ' +
                            'durant cette époque temporele: ' + data.eras.join(', ') + '. ' +
                            data.inputCustom +
                            'Traduis obligatoirement cette histoire en : "' + data.locale + '".',
                    },
                ],
                max_tokens: 800,
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