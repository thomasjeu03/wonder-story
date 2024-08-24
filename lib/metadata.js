export default function generateMetadata({
    title = 'Wonder Story - Générateur d’histoires pour enfants',
    description = 'Découvrez Wonder Story, un générateur d’histoires pour enfants. Des histoires merveilleuses pour offrir à vos enfants des récits uniques et captivants à chaque lecture.',
    image = "/img/og-image.png",
    url = "https://wonder-story.app" },
    applicationName = "Wonder Story",
) {
    return {
        title,
        description,
        canonical: url,
        keywords: "Wonder Story, Générateur d’histoires, Histoires pour enfants, Contes merveilleux, IA pour enfants, Récits interactifs, Contes personnalisés, Histoires éducatives, Générateur de contes, Histoires en ligne, Récits IA, Littérature enfantine",
        author: "Thomas Jeu",
        themeColor: "#1c171c",
        viewport: "width=device-width, initial-scale=1",
        robots: "index, follow",
        charset: "utf-8",
        applicationName: applicationName,
        appleMobileWebAppTitle: applicationName,
        appleMobileWebAppCapable: "yes",
        appleTouchFullscreen: "yes",
        appleMobileWebAppStatusBarStyle: "default",
        msapplicationTileColor: "#1c171c",
        msapplicationConfig: "/img/icon/browserconfig.xml",
        msapplicationTapHighlight: "yes",
        mobileWebAppCapable: "yes",
        formatDetection: {
            telephone: false,
        },
        manifest: '/site.webmanifest',
        locale: "fr-FR",
        openGraph: {
            title,
            description,
            url,
            siteName: applicationName,
            locale: "fr_FR",
            type: "website",
            images: image
                ? [
                    {
                        url: image,
                        width: 1200,
                        height: 675,
                        alt: title,
                    },
                ]
                : [],
        },
        twitter: {
            card: "summary_large_image",
            site: "@WonderStory",
            creator: "@ThomasJeu39",
            domain: url,
            title,
            description,
            images: image ? [image] : [],
        },
        icons: {
          icon: '/img/icon/favicon-32x32.png',
          apple: '/img/icon/apple-touch-icon.png',
        },
        other: {
            links: [
                { rel: "canonical", href: url },
                { rel: "icon", href: "/img/icon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
                { rel: "icon", href: "/img/icon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
                { rel: "apple-touch-icon", href: "/img/icon/apple-touch-icon.png", sizes: "180x180" },
                { rel: "manifest", href: "/site.webmanifest", crossOrigin: "use-credentials" },
                { rel: "mask-icon", href: "/img/icon/safari-pinned-tab.svg", color: "#bf40bf" },
                { rel: "shortcut icon", href: "/img/icon/favicon.ico" },
            ],
        },
    };
}
