import {Button} from "@/components/ui/button";
import {signIn} from "next-auth/react";
import Link from 'next/link';

import logoWhite from   "../../public/img/logo-white.png";
import bgLandingPage from   "../../public/img/bg-landing-page.png";
import mockup from   "../../public/img/mockup.png";
import premiumCard from   "../../public/img/premiumCard.png";
import bgPremiumCard from   "../../public/img/bg-premium-card.png";
import bgFooter from   "../../public/img/footer.png";
import benefit1 from   "../../public/img/landingPage/benefit1.png";
import benefit2 from   "../../public/img/landingPage/benefit2.png";
import step1 from   "../../public/img/landingPage/step1.png";
import step2 from   "../../public/img/landingPage/step2.png";
import step3 from   "../../public/img/landingPage/step3.png";
import google from   "../../public/img/google.png";
import apple from   "../../public/img/apple.png";
import Image from "next/image";
import {useLocale} from "@/app/contexts/LocaleContext";
import {Sparkles, XIcon, CheckIcon, Timer, Globe} from "lucide-react";
import {useState} from "react";
import {Skeleton} from "@/components/ui/skeleton";

export default function LandingPage() {
    const {t} = useLocale();

    const [appleLoading, setAppleLoading] = useState(false)
    const [googleLoading, setGoogleLoading] = useState(false)
    // TODO: landing page
    return (
        <>
            <header className="flex flex-col items-center justify-start w-full pt-36 md:pt-52">
                <Image src={bgLandingPage} priority quality={100} width={2000}
                       className="pointer-events-none absolute top-0 left-0 w-full h-dvh md:h-auto -z-10"
                       alt='background image Wonder Story landing page'/>
                <nav
                    className="w-full flex items-center justify-center fixed top-0 z-50 left-0">
                    <div className="gradient-blur -z-10 h-24 md:h-32">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div className="gradient-blur-reverse -z-10 h-16 lg:h-32">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div className="w-full p-3 flex justify-between items-center max-w-5xl">
                        <a href="/">
                            <Image src={logoWhite} height={'34'} width={'183'} priority quality={100}
                                   alt='Wonder Studio logo white'/>
                        </a>
                        <ul className="flex flex-row gap-8 items-center justify-end">
                            {/*<li>*/}
                            {/*    <a href="/#benefits" className="text-gray-200 hover:text-gray-50">{t('benefits')}</a>*/}
                            {/*</li>*/}
                            {/*<li>*/}
                            {/*    <a href="/#how-it-works"*/}
                            {/*       className="text-gray-200 hover:text-gray-50">{t('how-it-work')}</a>*/}
                            {/*</li>*/}
                            {/*<li>*/}
                            {/*    <a href="/#price" className="text-gray-200 hover:text-gray-50">{t('price')}</a>*/}
                            {/*</li>*/}
                            {/*<li>*/}
                            {/*    <a href="/#faq" className="text-gray-200 hover:text-gray-50">{t('faqs')}</a>*/}
                            {/*</li>*/}
                            <li>
                                <Button onClick={() => signIn("google")}>{t('create-story')}</Button>
                            </li>
                        </ul>
                    </div>
                </nav>
                <h1 className="sr-only">Wonder Story - Générateur d histoires pour enfants</h1>
                <div className="flex flex-col items-center gap-12 w-full max-w-3xl">
                    <div className="flex flex-col items-center gap-6 w-full">
                        <h2 className="text-center font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-balance">{t('landing-hero-title')}</h2>
                        <h3 className="text-center text-gray-400 text-balance max-w-xl">{t('landing-hero-subtitle')}</h3>
                    </div>
                    <Button size="lg" onClick={() => signIn("google")}>
                        {t('create-story')}
                        <Sparkles/>
                    </Button>
                    <div className="flex gap-4 flex-wrap items-center justify-center">
                        <Button variant="secondary"
                            onClick={() => {
                                setGoogleLoading(true)
                                signIn("google")
                            }}>
                            {googleLoading ? (
                                <Skeleton className="w-36 h-6"/>
                            ):(
                                <>
                                    <Image src={google} alt='google logo' quality={50} width={25}/>
                                    {t('login-with')} Google
                                </>
                            )}
                        </Button>

                        {/*TODO: apple auth*/}
                        {/*<Button variant="secondary"*/}
                        {/*    onClick={() => {*/}
                        {/*        setAppleLoading(true)*/}
                        {/*        signIn("apple")*/}
                        {/*    }}>*/}
                        {/*    {appleLoading ? (*/}
                        {/*        <Skeleton className="w-36 h-6"/>*/}
                        {/*    ):(*/}
                        {/*        <>*/}
                        {/*            <Image src={apple} alt='apple logo' quality={50} width={20}/>*/}
                        {/*            {t('login-with')} Apple*/}
                        {/*        </>*/}
                        {/*    )}*/}
                        {/*</Button>*/}
                    </div>
                </div>
                <Image src={mockup} priority quality={100} width={1300} alt='Wonder Story mockup'/>
            </header>
            <main className="w-full flex flex-col justify-start items-center gap-48 mt-48 mb-48">
                <section id='benefits' className="w-full flex-col gap-12 flex max-w-5xl">
                    <div className="w-full flex flex-col gap-4">
                        <h2 className="font-handwriting text-5xl lg:text-7xl">{t('section-benefits-title')}</h2>
                        <h3 className="text-md md:text-2xl text-gray-400">{t('section-benefits-subtitle')}</h3>
                    </div>
                    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="price-card col-auto md:col-span-2 m-auto p-0 gap-0">
                            <div className="flex flex-col items-center justify-center gap-3 w-full p-6">
                                <h4 className='font-handwriting text-gray-300 text-4xl w-full flex flex-row gap-3'>
                                    <Timer size={32}/>
                                    {t('dont-waste-time')}
                                </h4>
                                <p className="text-gray-200 w-full">
                                    {t('your-story-in-less-than-a-minute')}
                                </p>
                            </div>
                            <Image src={benefit1} priority quality={100}
                                   className="w-full h-auto"
                                   alt='Wonder Story benefit 1'/>
                        </div>
                        <div className="price-card col-auto md:col-span-1 p-0 gap-0 relative min-h-96">
                            <div className="flex flex-col gap-3 w-full p-6 z-10">
                                <h4 className='font-handwriting text-gray-300 text-4xl w-full flex flex-row gap-3'>
                                    <Globe size={32}/>
                                    {t('benefit-2-title')}
                                </h4>
                                <p>{t('benefit-2')}</p>
                            </div>
                            <Image src={benefit2} priority quality={100}
                                   className="w-full h-auto absolute bottom-0 left-0 right-0 -z-10"
                                   alt='Wonder Story benefit 2'/>
                        </div>
                    </div>
                    <p className="text-gray-300 text-center w-full">{t('benefit-3')}</p>
                </section>

                <section id="how-it-works" className="w-full gap-12 flex flex-col items-center max-w-5xl">
                    <div className="w-full flex flex-col gap-4">
                        <h2 className="text-center font-handwriting text-5xl lg:text-7xl">{t('section-steps-title')}</h2>
                        <h3 className="text-center text-md md:text-2xl text-gray-400">{t('section-steps-subtitle')}</h3>
                    </div>
                    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                        <div className="price-card col-auto md:col-span-1 p-0 gap-0 relative max-w-sm m-auto">
                            <div className="flex flex-col gap-3 w-full p-6 z-10">
                                <h4 className='font-handwriting text-gray-300 text-4xl w-full flex flex-row gap-3'>
                                    <span className="text-3xl">1.</span>{t('step-1-title')}
                                </h4>
                                <p className="text-gray-300">{t('step-1-subtitle')}</p>
                            </div>
                            <Image src={step1} priority quality={80}
                                   className="w-full h-auto"
                                   alt='Wonder Story step 1'/>
                        </div>
                        <div className="price-card col-auto md:col-span-1 p-0 gap-0 relative max-w-sm m-auto">
                            <div className="flex flex-col gap-3 w-full p-6 z-10">
                                <h4 className='font-handwriting text-gray-300 text-4xl w-full flex flex-row gap-3'>
                                    <span className="text-3xl">2.</span>{t('step-2-title')}
                                </h4>
                                <p className="text-gray-300">{t('step-2-subtitle')}</p>
                            </div>
                            <Image src={step2} priority quality={80}
                                   className="w-full h-auto"
                                   alt='Wonder Story step 2'/>
                        </div>
                        <div className="price-card col-auto md:col-span-1 p-0 gap-0 relative max-w-sm m-auto">
                            <div className="flex flex-col gap-3 w-full p-6 z-10">
                                <h4 className='font-handwriting text-gray-300 text-4xl w-full flex flex-row gap-3'>
                                    <span className="text-3xl">3.</span>{t('step-3-title')}
                                </h4>
                                <p className="text-gray-300">{t('step-3-subtitle')}</p>
                            </div>
                            <Image src={step3} priority quality={80}
                                   className="w-full h-auto"
                                   alt='Wonder Story step 3'/>
                        </div>
                    </div>
                    <Button size="lg" className="mt-6" onClick={() => signIn("google")}>
                        {t('create-story')}
                        <Sparkles/>
                    </Button>
                </section>

                <section id='testimonials' className="w-full gap-12 flex flex-col max-w-5xl">
                    <div className="w-full flex flex-col gap-4">
                        <h2 className="font-handwriting text-5xl lg:text-7xl">{t('section-testimonials-title')}</h2>
                        <h3 className="text-md md:text-2xl text-gray-400">{t('section-testimonials-subtitle')}</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="price-card testimonial-card flex flex-col items-center p-6 gap-2 max-w-96 m-auto">
                            <p className="text-xl text-center">{t('testimonial1')}</p>
                            <span className="text-center text-gray-400">{t('testimonial1-author')}</span>
                        </div>
                        <div className="price-card testimonial-card flex flex-col items-center p-6 gap-2 max-w-96 m-auto">
                            <p className="text-xl text-center">{t('testimonial2')}</p>
                            <span className="text-center text-gray-400">{t('testimonial2-author')}</span>
                        </div>
                        <div className="price-card testimonial-card flex flex-col items-center p-6 gap-2 max-w-96 m-auto">
                            <p className="text-xl text-center">{t('testimonial3')}</p>
                            <span className="text-center text-gray-400">{t('testimonial3-author')}</span>
                        </div>
                    </div>
                </section>

                <section id='price' className="w-full gap-12 flex flex-col justify-start items-start max-w-5xl">
                    <div className="w-full flex flex-col gap-4">
                        <h2 className="text-center font-handwriting text-5xl lg:text-7xl text-balance">{t('section-price-title')}</h2>
                        <h3 className="text-center text-md md:text-2xl text-gray-400 text-balance">{t('section-price-subtitle')}</h3>
                    </div>
                    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="price-card max-w-md m-auto">
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
                            className="price-card price-card--premium col-auto md:col-span-2 p-0 flex flex-row overflow-hidden relative">
                            <Image src={bgPremiumCard} priority quality={100}
                                   className="absolute h-full top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 -z-10 saturate-150"
                                   alt='Wonder Story premium price'/>
                            <div className="flex flex-col gap-12 w-full p-6">
                                <div className="flex flex-col items-center justify-center gap-3 w-full">
                                    <h4 className='font-handwriting text-gray-300 text-3xl w-full'>Premium</h4>
                                    <p className="text-gray-200">
                                        <span
                                            className="font-handwriting text-5xl text-foreground">4,99€</span> /{t('month')}
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
                                        <CheckIcon color={'lightgreen'}/>
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
                                <Image src={premiumCard} priority quality={100}
                                       className="w-full h-full object-cover rounded-md border-2 border-amber-200"
                                       alt='Wonder Story premium price'/>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer className='flex flex-col w-full'>
                {/*TODO: all extras pages*/}
                <Link href="https://thomasjeu.fr" target='_blank' rel='noopener'
                      className="w-full text-center text-gray-400 text-sm">{t('made_by')} Thomas JEU</Link>
                <Image src={bgFooter} priority quality={100}
                       className="w-full h-auto relative"
                       alt='Wonder Story footer image'/>
            </footer>
        </>
    );
}