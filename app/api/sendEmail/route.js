import { resend }from '@/lib/resend';
import TrialEndTemplate from "@/emails/TrialEndTemplate";

export async function POST(request) {
    try {
        const { name, email } = await request.json();

        const emailHtml = TrialEndTemplate({ name });

        const response = await resend.emails.send({
            from: 'no-reply@email.wonder-story.app',
            to: email,
            subject: 'Bientôt la fin de votre période d essai',
            html: emailHtml,
        });

        return new Response(JSON.stringify({ success: true, messageId: response.id }), { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
}