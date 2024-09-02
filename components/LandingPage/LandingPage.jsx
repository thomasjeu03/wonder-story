import {Button} from "@/components/ui/button";
import {signIn} from "next-auth/react";

import logoWhite from   "../../public/img/logo-white.png";
import bgLandingPage from   "../../public/img/bg-landing-page.png";
import mockup from   "../../public/img/mockup.png";
import premiumCard from   "../../public/img/premiumCard.png";
import bgPremiumCard from   "../../public/img/bg-premium-card.png";
import Image from "next/image";
import {useLocale} from "@/app/contexts/LocaleContext";
import {Sparkles, XIcon, CheckIcon} from "lucide-react";

export default function LandingPage() {
    const {t} = useLocale();
    // TODO: landing page
    return (
        <>
            <header className="flex flex-col items-center justify-start w-full pt-52">
                <Image src={bgLandingPage} priority quality={100} width={2000} className="pointer-events-none absolute top-0 left-0 w-full h-auto -z-10"
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
                                <a href="/#benefits" className="text-gray-400 hover:text-gray-200">{t('benefits')}</a>
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
                <div className="flex flex-col items-center gap-12 w-full max-w-2xl">
                    <div className="flex flex-col items-center gap-6 w-full">
                        <h2 className="text-center font-semibold text-5xl text-balance">{t('landing-hero-title')}</h2>
                        <h3 className="text-center text-gray-400 text-balance max-w-xl">{t('landing-hero-subtitle')}</h3>
                    </div>
                    <Button size="lg" onClick={() => signIn("google")}>
                        {t('create-story')}
                        <Sparkles/>
                    </Button>
                </div>
                {/*mockup fait sur shots.so*/}
                {/*TODO: refaire le mockup when app is ready*/}
                <Image src={mockup} priority quality={100} width={1000} className="mt-16"
                       alt='Wonder Story mockup'/>
            </header>
            <main className="w-full flex flex-col justify-start items-center gap-48 mt-48 mb-48">
                <section id='benefits' className="w-full flex-col gap-12 flex max-w-5xl">
                    <div className="w-full flex flex-col gap-4">
                        <h2 className="font-handwriting text-5xl">{t('section-benefits-title')}</h2>
                        <h3 className="text-2xl text-gray-400">{t('section-benefits-subtitle')}</h3>
                    </div>
                    <div>
d
                    </div>
                </section>

                <section id="how-it-works" className="w-full gap-12 flex flex-col items-center max-w-5xl">
                    <div className="w-full flex flex-col gap-4">
                        <h2 className="text-center font-handwriting text-5xl">{t('section-steps-title')}</h2>
                        <h3 className="text-center text-2xl text-gray-400">{t('section-steps-subtitle')}</h3>
                    </div>
                    <div>
d
                    </div>
                </section>

                <section id='testimonials' className="w-full gap-12 flex flex-col max-w-5xl">
                    <div className="w-full flex flex-col gap-4">
                        <h2 className="font-handwriting text-5xl">{t('section-testimonials-title')}</h2>
                        <h3 className="text-2xl text-gray-400">{t('section-testimonials-subtitle')}</h3>
                    </div>
                    <div>
d
                    </div>
                </section>

                <section id='price' className="w-full gap-12 flex flex-col justify-start items-start max-w-5xl">
                    <div className="w-full flex flex-col gap-4">
                        <h2 className="text-center font-handwriting text-5xl text-balance">{t('section-price-title')}</h2>
                        <h3 className="text-center text-2xl text-gray-400 text-balance">{t('section-price-subtitle')}</h3>
                    </div>
                    <div className="w-full grid grid-cols-3 gap-6">
                        <div className="price-card">
                            <div className="flex flex-col items-center justify-center gap-3 w-full">
                                <h4 className='font-handwriting text-gray-300 text-3xl w-full'>{t('free_trial')}</h4>
                                <p className="text-gray-200">
                                    <span className="font-handwriting text-5xl text-foreground">0,00€</span>
                                </p>
                                <p className="text-gray-300 text-sm text-center">{t('try_for_free_discover_magic')}</p>
                            </div>
                            <ul>
                                <li className="flex flex-row gap-2"><CheckIcon
                                    color={'lightgreen'}/>{t('up_to_three_stories_generated')}</li>
                                <li className="flex flex-row gap-2"><CheckIcon
                                    color={'lightgreen'}/>{t('basic_story_customization')}</li>
                                <li className="flex flex-row gap-2"><XIcon color={'red'}/>{t('personal_library_access')}
                                </li>
                                <li className="flex flex-row gap-2"><XIcon color={'red'}/>{t('unlimited_stories')}</li>
                                <li className="flex flex-row gap-2"><XIcon color={'red'}/>{t('story_download_pdf')}</li>
                                <li className="flex flex-row gap-2"><XIcon
                                    color={'red'}/>{t('advanced_story_customization')}</li>
                            </ul>
                            <Button variant="secondary" className="w-full" onClick={() => signIn("google")}>
                                {t('start-free-trial')}
                            </Button>
                        </div>
                        <div
                            className="price-card price-card--premium col-span-2 p-0 flex flex-row overflow-hidden relative">
                            <Image src={bgPremiumCard} priority quality={100}
                                   className="absolute h-full top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 -z-10 saturate-150"
                                   alt='Wonder Story premium price'/>
                            <div className="flex flex-col gap-12 w-full p-6">
                                <div className="flex flex-col items-center justify-center gap-3 w-full">
                                <h4 className='font-handwriting text-gray-300 text-3xl w-full'>Premium</h4>
                                    <p className="text-gray-200">
                                        <span className="font-handwriting text-5xl text-foreground">4,99€</span> /{t('month')}
                                    </p>
                                    <p className="text-gray-300 text-sm text-center">{t('subtitle-card-premium')}</p>
                                </div>
                                <ul>
                                    <li className="flex flex-row gap-2">
                                        <CheckIcon color={'lightgreen'}/>
                                        {t('unlimited_story_generation')}
                                    </li>
                                    <li className="flex flex-row gap-2">
                                        <CheckIcon color={'lightgreen'}/>
                                        {t('advanced_story_customization')}
                                    </li>
                                    <li className="flex flex-row gap-2">
                                        <CheckIcon color={'lightgreen'} />
                                        {t('full_access_personal_library')}
                                    </li>
                                    <li className="flex flex-row gap-2">
                                        <CheckIcon color={'lightgreen'}/>
                                        {t('story_download_pdf')}
                                    </li>
                                </ul>
                                <div className="w-full flex flex-col gap-2">
                                    <Button size="lg" className="w-full" onClick={() => signIn("google")}>
                                        {t('start-premium')}
                                    </Button>
                                    <p className="text-xs text-gray-200 text-center text-balance">{t('automatic_renewal_no_commitment')}</p>
                                </div>
                            </div>
                            <div className="w-full h-full flex items-center justify-center p-4">
                                <Image src={premiumCard} priority quality={100} className="w-full h-full object-cover rounded-md border-2 border-amber-200"
                                       alt='Wonder Story premium price'/>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer>
                Footer
            </footer>
        </>
    );
}