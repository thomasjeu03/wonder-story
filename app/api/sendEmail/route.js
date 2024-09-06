import { resend }from '@/lib/resend';
import WelcomeAboard from "@/emails/WelcomeAboard";

export async function POST(request) {
    try {
        const { name, email } = await request.json();

        const emailHtml = WelcomeAboard({ name });

        const { data, error } = await resend.emails.send({
            from: 'Wonder Story <welcome@wonder-story.app>',
            to: [email],
            subject: 'Bienvenue sur Wonder Story',
            react: emailHtml,
            tags: [
                {
                    name: 'category',
                    value: 'welcome',
                },
            ],
        });

        if (error) {
            return Response.json({ error }, { status: error.statusCode });
        }

        return Response.json(data);
    } catch (error) {
        console.error('Error sending email:', error);
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
}