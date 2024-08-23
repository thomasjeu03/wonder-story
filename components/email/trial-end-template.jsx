export const TrialEndTemplate = ({ name }) => (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#333', lineHeight: '1.6', backgroundColor: '#f4f4f4', padding: '20px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <img src="https://wonder-story.app/img/logo.png" alt="Your Logo" style={{ width: '150px' }} />
            </div>

            <h1 style={{ fontSize: '24px', color: '#222', marginBottom: '20px' }}>Bonjour, {name}!</h1>

            <p style={{ fontSize: '16px', marginBottom: '20px' }}>
                Nous espérons que vous avez apprécié votre période d essai avec nous! Nous souhaitons vous informer que votre essai gratuit se termine dans moins de <strong>3 jours</strong>.
            </p>
            <p style={{ fontSize: '16px', marginBottom: '20px' }}>
                Ne manquez pas l opportunité de continuer à profiter de tous nos avantages et fonctionnalités exclusives. Passez dès maintenant à notre offre <strong>Premium</strong> pour un accès illimité!
            </p>

            <div style={{ textAlign: 'center', margin: '30px 0' }}>
                <a href="https://wonder-story.app/account" style={{
                    display: 'inline-block',
                    backgroundColor: '#007bff',
                    color: '#ffffff',
                    padding: '15px 30px',
                    fontSize: '16px',
                    borderRadius: '5px',
                    textDecoration: 'none'
                }}>
                    Passer à Premium
                </a>
            </div>

            <p style={{ fontSize: '16px', marginBottom: '20px' }}>
                Merci d avoir choisi notre service. Nous sommes ravis de vous compter parmi nos utilisateurs et nous espérons continuer cette aventure ensemble.
            </p>

            <hr style={{ border: 'none', borderTop: '1px solid #dddddd', margin: '20px 0' }} />
            <p style={{ fontSize: '12px', color: '#777', textAlign: 'center' }}>
                © 2024 Wonder Story. Tous droits réservés.
            </p>
        </div>
    </div>
);
