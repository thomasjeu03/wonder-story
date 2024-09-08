import { Html, Button, Img, Section, Text, Hr } from "@react-email/components";

const URL = process.env.NODE_ENV === "development" ? process.env.NEXT_URL_DEVELOPMENT : process.env.NEXT_URL_PRODUCTION

export default function WelcomePremium({ name }) {
    const thisYear = new Date().getFullYear();
    return (
        <Html lang="fr" dir="ltr">
            <Section style={{
                maxWidth: '600px',
                margin: '0 auto',
                backgroundColor: '#0e0b0e',
                padding: '8px',
                borderRadius: '24px',
                fontFamily: 'SF-Pro, Arial, sans-serif',
                color: '#b9b9b9' }}>
                <Section style={{
                    padding: '17px',
                    borderRadius: '16px',
                    outline: '1px dashed #6b7280',
                    fontFamily: 'SF-Pro, Arial, sans-serif',
                    color: '#b9b9b9'
                }}>
                    <Section style={{ textAlign: 'center', marginBottom: '30px' }}>
                        <Button href={URL}>
                            <Img src={`${URL}/img/logo-white-premium.png`} alt="Logo Wonder Story premium" style={{ width: '150px' }} />
                        </Button>
                    </Section>

                    <Section>
                        <Img src={`${URL}/img/og-image-premium.png`} alt="Image Premium" style={{ width: '100%', maxWidth: '300px', margin: '0 auto', borderRadius: '16px' }} />
                    </Section>

                    <Text style={{ fontSize: '24px', lineHeight: '32px', color: '#fff', textAlign: 'center', marginBottom: '20px', textWrap: 'balance' }}>
                        Merci pour ton abonnement Premium, {name} !
                    </Text>

                    <Text style={{ fontSize: '16px', lineHeight: '1.5', marginBottom: '20px', color: '#b9b9b9' }}>
                        Nous sommes ravis de te compter parmi nos membres Premium ! Grâce à ton abonnement, tu accèdes à des histoires personnalisées et illimitées, de nouveaux personnages, des mondes fantastiques à découvrir, et bien plus encore.
                    </Text>

                    <Text style={{ fontSize: '16px', lineHeight: '1.5', marginBottom: '20px', color: '#b9b9b9' }}>
                        Tu peux dès à présent profiter de toutes ces fonctionnalités exclusives pour éveiller l’imagination de tes enfants.
                    </Text>

                    <Text style={{ fontSize: '16px', lineHeight: '1.5', marginBottom: '20px', color: '#b9b9b9' }}>
                        Pour rappel, ton abonnement se renouvelle automatiquement et peut être résilié à tout moment, sans engagement. Tu peux gérer ton abonnement dans ta page profil sur le bouton <i>Gérer mon abonnement</i>.
                    </Text>

                    <Section style={{ textAlign: 'center', margin: '30px 0' }}>
                        <Button href={`${URL}`} style={{
                            display: 'inline-block',
                            boxShadow: '0 10px 15px -3px rgba(255,255,255,.1),0 4px 6px -4px rgba(255,255,255,.1)',
                            backgroundColor: '#fff',
                            borderRadius: '20px',
                            textDecoration: 'none',
                            padding: '4px'
                        }}>
                            <div style={{
                                outline: '1px dashed #6b7280',
                                padding: '12px',
                                color: '#0e0b0e',
                                borderRadius: '16px',
                                fontSize: '1.125rem',
                                lineHeight: '1.75rem',
                                fontWeight: '600',
                            }}>
                                Découvrir mon espace Premium
                            </div>
                        </Button>
                    </Section>

                    <Text style={{ fontSize: '16px', lineHeight: '1.5', marginBottom: '20px', color: '#b9b9b9' }}>
                        Merci encore de faire partie de notre aventure et de laisser la magie des histoires Wonder Story enrichir la créativité de vos enfants !
                    </Text>

                    <Hr style={{ border: 'none', borderTop: '1px solid #A1A1A1', margin: '20px 0' }} />

                    <Text style={{ fontSize: '12px', color: '#8c8c8c', textAlign: 'center' }}>
                        © {thisYear} Wonder Story. Tous droits réservés.
                    </Text>
                </Section>
            </Section>
        </Html>
    );
};

