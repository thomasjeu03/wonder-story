import {Button} from "@/components/ui/button";
import {signIn} from "next-auth/react";

import logoWhite from   "../../public/img/logo-white.png";
import bgLandingPage from   "../../public/img/bg-landing-page.png";
import Image from "next/image";
import {useLocale} from "@/app/contexts/LocaleContext";
import {Sparkles} from "lucide-react";

export default function LandingPage() {
    const {t} = useLocale();
    // TODO: landing page
    return (
        <>
            <header className="flex flex-col items-center justify-start w-full pt-52">
                <Image src={bgLandingPage} priority quality={100} className="pointer-events-none absolute top-0 left-0 w-full h-auto -z-10"
                       alt='background image Wonder Story landing page'/>
                <nav
                    className="w-full flex items-center justify-center fixed top-0 z-50 left-0 border-b border-gray-700 bg-background/70 backdrop-blur-lg">
                    <div className="w-full p-3 flex justify-between items-center max-w-5xl">
                        <a href="/">
                            <Image src={logoWhite} height={'34'} width={'183'} priority quality={100}
                                   alt='Wonder Studio logo white'/>
                        </a>
                        <ul className="flex flex-row gap-8 items-center justify-end">
                            <li>
                                <a href="/#features" className="text-gray-400 hover:text-gray-200">{t('features')}</a>
                            </li>
                            <li>
                                <a href="/#how-it-works"
                                   className="text-gray-400 hover:text-gray-200">{t('how-it-work')}</a>
                            </li>
                            <li>
                                <a href="/#price" className="text-gray-400 hover:text-gray-200">{t('price')}</a>
                            </li>
                            <li>
                                <a href="/#faq" className="text-gray-400 hover:text-gray-200">{t('faqs')}</a>
                            </li>
                            <li>
                                <Button onClick={() => signIn("google")}>{t('login')}</Button>
                            </li>
                        </ul>
                    </div>
                </nav>
                <h1 className="sr-only">Wonder Story - Générateur d histoires pour enfants</h1>
                <div className="flex flex-col items-center gap-9 w-full max-w-2xl">
                    <h2 className="text-center font-semibold text-5xl">{t('landing-hero-title')}</h2>
                    <h3 className="text-center text-gray-400">{t('landing-hero-subtitle')}</h3>
                    <Button size="lg" onClick={() => signIn("google")}>
                        {t('create-story')}
                        <Sparkles/>
                    </Button>
                </div>
            </header>
            <main className="w-full flex flex-col justify-start items-center gap-52 mt-52 mb-52">
                <section className="w-full gap-8 flex max-w-5xl">
                    <div className="w-full flex flex-col gap-4">
                        <h2>Notre générateur d'histoires</h2>
                        <h3>Des histoires personnalisées, conçues pour inspirer et éduquer.</h3>
                    </div>
                    <div>

                    </div>
                </section>
                <section className="w-full gap-8 flex justify-start items-start max-w-5xl">
                    <div className="w-full flex flex-col gap-4">
                        <h2 className="text-center">Comment ca marche ?</h2>
                        <h3 className="text-center">Créez des histoires en quelques étapes simples.</h3>
                    </div>
                    <div>

                    </div>
                </section>
            </main>
            <footer>
                Footer
            </footer>
        </>
    );
}