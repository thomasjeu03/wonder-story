import { resend }from '@/lib/resend';
import WelcomeAboard from "@/emails/WelcomeAboard";

export async function POST(request) {
    try {
        const { name, email } = await request.json();

        const emailHtml = WelcomeAboard({ name });

        const response = await resend.emails.send({
            from: 'welcome@email.wonder-story.app',
            to: email,
            subject: 'Bienvenue sur Wonder Story',
            html: emailHtml,
        });

        return new Response(JSON.stringify({ success: true, messageId: response.id }), { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
}