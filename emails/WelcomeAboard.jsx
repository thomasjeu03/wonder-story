import { Html, Button, Img, Section, Text, Hr } from "@react-email/components";

const URL = process.env.NODE_ENV === "development" ? process.env.NEXT_URL_DEVELOPMENT : process.env.NEXT_URL_PRODUCTION

export default function WelcomeAboard({ name }) {
    return (
        <Html lang="fr" dir="ltr">
            <Section style={{
                maxWidth: '600px',
                margin: '0 auto',
                backgroundColor: '#0e0b0e',
                padding: '25px',
                borderRadius: '30px',
                outline: '1px dashed',
                outlineColor: '#6b7280',
                outlineOffset: '-8px',
                boxShadow: '0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -4px rgba(0,0,0,.1)',
                fontFamily: 'SF-Pro, Arial, sans-serif',
                color: '#b9b9b9' }}>
                <Section style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <Img src={`${URL}/img/logo-white.png`} alt="Logo Wonder Story" style={{ width: '150px' }} />
                </Section>

                <Text style={{ fontSize: '24px', color: '#fff', textAlign: 'center', marginBottom: '20px' }}>Bienvenue dans l&rsquo;univers magique de Wonder Story, {name}!</Text>

                <Text style={{ fontSize: '16px', lineHeight: '1.5', marginBottom: '20px' }}>
                    Nous sommes ravis de vous accueillir dans notre application dédiée à la création d&rsquo;histoires fantastiques pour les enfants. Wonder Story vous permet d&rsquo;explorer un monde plein de récits captivants, où chaque histoire est aussi unique que l&rsquo;imagination de votre enfant.
                </Text>

                <Text style={{ fontSize: '16px', lineHeight: '1.5', marginBottom: '20px' }}>
                    Pour profiter pleinement de toutes les fonctionnalités de Wonder Story, et permettre à vos enfants de créer des histoires sans limite, découvrez notre offre <strong style={{ color: '#fff' }}>Premium</strong> !
                </Text>

                <Section style={{ textAlign: 'center', margin: '30px 0' }}>
                    <Button href={`${URL}/account`} style={{
                        display: 'inline-block',
                        outline: '1px dashed #6b7280',
                        outlineOffset: '-4px',
                        boxShadow: '0 10px 15px -3px rgba(255,255,255,.1),0 4px 6px -4px rgba(255,255,255,.1)',
                        backgroundColor: '#fff',
                        color: '#0e0b0e',
                        padding: '1rem',
                        fontSize: '1.125rem',
                        lineHeight: '1.75rem',
                        fontWeight: '600',
                        borderRadius: '20px',
                        textDecoration: 'none',
                    }}>
                        Découvrir Wonder Story Premium
                    </Button>
                </Section>

                <Text style={{ fontSize: '16px', lineHeight: '1.5', marginBottom: '20px' }}>
                    Avec Premium, accédez à des histoires personnalisées en illimité, de nouveaux mondes et personnages à explorer, et bien plus encore pour éveiller la créativité de vos enfants !
                </Text>

                <Hr style={{ border: 'none', borderTop: '1px solid #A1A1A1', margin: '20px 0' }} />

                <Text style={{ fontSize: '12px', color: '#8c8c8c', textAlign: 'center' }}>
                    © 2024 Wonder Story. Tous droits réservés.
                </Text>
            </Section>
        </Html>
    );
};

