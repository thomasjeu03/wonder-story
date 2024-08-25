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
                        content: 'Répond moi toujours en créer une histoire pour enfant sous format markdown, je ne veux que le contenu de l histoire en incorporant les données du prompte',
                    },
                    {
                        role: 'user',
                        content: 'Crée moi uns histoire pour un enfant de ' + data.ageRange + 'ans. ' +
                            'Cette histoire aura comme personnages: ' + data.caracters.join(', ') + '. `' +
                            'Le personnage principal sera ' + data.mainCaracter + '. ' + data.inputCustom,
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