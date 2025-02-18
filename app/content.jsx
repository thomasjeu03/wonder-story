"use client"

import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import Step1 from "@/components/generatorSteps/Step1";
import Step2 from "@/components/generatorSteps/Step2";
import {useLocale} from "@/app/contexts/LocaleContext";
import {ArrowLeft, ArrowRight, Sparkles} from "lucide-react";
import {motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {Skeleton} from "@/components/ui/skeleton";
import Step3 from "@/components/generatorSteps/Step3";
import Step4 from "@/components/generatorSteps/Step4";
import {useUser} from "@/app/contexts/UserContext";
import Step5 from "@/components/generatorSteps/Step5";
import { useRouter } from "next/navigation";
import {getCaracters, getCaracterTags, getPlaces, getPlaceTags} from "@/lib/api";
import {BuyButton} from "@/components/buy/BuyButton";

export default function HomeContent() {
    const { t, langue } = useLocale();
    const {currentStep, setCurrentStep, user, canGenerate, isPremium } = useUser();
    const router = useRouter();

    const [data, setData] = useState({
        locale: langue,
        caracters: [],
        mainCaracter: '',
        places: [],
        ageRange: 5,
        time: 3,
        genres: [],
        moral: false,
        inputCustom: ''
    });

    useEffect(() => {
        if (currentStep === 0) {
            setData({
                locale: langue,
                caracters: [],
                mainCaracter: '',
                places: [],
                ageRange: 5,
                time: 3,
                genres: [],
                moral: false,
                inputCustom: ''
            })
        }
    }, [currentStep]);

    const [caracterTags, setCaracterTags] = useState([]);
    const [loadingCaracterTags, setLoadingCaracterTags] = useState(true);
    const [limitCaracterTags, setLimitCaracterTags] = useState(20)
    const [offsetCaracterTags, setOffsetCaracterTags] = useState(0)

    const [caracters, setCaracters] = useState([]);
    const [loadingCaracters, setLoadingCaracters] = useState(true);
    const [limitCaracters, setLimitCaracters] = useState(100)
    const [offsetCaracters, setOffsetCaracters] = useState(0)

    const [placeTags, setPlaceTags] = useState([]);
    const [loadingPlaceTags, setLoadingPlaceTags] = useState(true);
    const [limitPlaceTags, setLimitPlaceTags] = useState(20)
    const [offsetPlaceTags, setOffsetPlaceTags] = useState(0)

    const [places, setPlaces] = useState([]);
    const [loadingPlaces, setLoadingPlaces] = useState(true);
    const [limitPlaces, setLimitPlaces] = useState(100)
    const [offsetPlaces, setOffsetPlaces] = useState(0)

    useEffect(() => {
        async function fetchCaracters() {
            setLoadingCaracters(true);
            try {
                const response = await getCaracters({}, offsetCaracters, limitCaracters);
                setCaracters(response);
            } catch (error) {
                setLoadingCaracters(false)
            } finally {
                setLoadingCaracters(false);
            }
        }

        async function fetchCategories() {
            setLoadingCaracterTags(true);
            try {
                const response = await getCaracterTags({}, offsetCaracterTags, limitCaracterTags);
                setCaracterTags(response);
            } catch (error) {
                setLoadingCaracterTags(false)
            } finally {
                setLoadingCaracterTags(false);
            }
        }

        async function fetchPlaces() {
            setLoadingPlaces(true);
            try {
                const response = await getPlaces({}, offsetPlaces, limitPlaces);
                setPlaces(response);
            } catch (error) {
                setLoadingPlaces(false)
            } finally {
                setLoadingPlaces(false);
            }
        }

        async function fetchPlaceTags() {
            setLoadingPlaceTags(true);
            try {
                const response = await getPlaceTags({}, offsetPlaceTags, limitPlaceTags);
                setPlaceTags(response);
            } catch (error) {
                setLoadingPlaceTags(false)
            } finally {
                setLoadingPlaceTags(false);
            }
        }

        fetchCategories();
        fetchCaracters();
        fetchPlaces();
        fetchPlaceTags();
    }, [limitCaracterTags, limitCaracters, offsetCaracterTags, offsetCaracters, offsetPlaces, limitPlaces, offsetPlaceTags, limitPlaceTags]);

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const steps = [
        {id: 1, content: <Step1 />},
        {id: 2, content: <Step2 data={data} setData={setData} loadingCaracters={loadingCaracters} loadingCaracterTags={loadingCaracterTags} caracterTags={caracterTags} caracters={caracters} />},
        {id: 3, content: <Step3 data={data} setData={setData} loadingPlaces={loadingPlaces} loadingPlaceTags={loadingPlaceTags} placeTags={placeTags} places={places} />},
        {id: 4, content: <Step4 data={data} setData={setData} />},
        {id: 5, content: <Step5 data={data} caractersDataBase={caracters} caracterTagsDataBase={caracterTags} placeTagsDataBase={placeTags} placesDataBase={places} />},
    ];

    const handleNext = () => {
        if (canGenerate) {
            if (currentStep < steps.length - 1) {
                setCurrentStep(currentStep + 1);
            }
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (canGenerate) {
            setCurrentStep(currentStep + 1)
            setError('');
            setLoading(true);
            try {
                // TODO: utiliser Deepseek quand l'API sera disponible
                const response = await axios.post('/api/generate', {
                    data,
                    userId: user?.id,
                    // provider: 'deepseek',
                    // model: 'deepseek-chat'
                });
                router.push(`/story/${response.data.id}`);
            } catch (err) {
                setError('Error processing the data');
            } finally {
                setLoading(false)
            }
        }
    };

    return (
        <section className="min-h-min w-full flex flex-col items-center pt-4 sm:pt-6 gap-6 sm:gap-12 pb-20">
            <AnimatePresence mode="popLayout" transition={{ delay: 0 }}>
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, y: 80, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -80, filter: 'blur(8px)' }}
                    transition={{
                        type: 'spring',
                        duration: 1.2,
                        ease: "easeOut",
                        bounce: 0.2,
                    }}
                    className="w-full flex flex-col items-center gap-6 sm:gap-12"
                >
                    {steps[currentStep].content}
                </motion.div>

                {currentStep === 4 ? (
                    <></>
                ) : (
                    <>
                        {currentStep === 0 ? (
                            <motion.div
                                initial={{ opacity: 0, y: 80, filter: 'blur(8px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, y: 80, filter: 'blur(8px)' }}
                                transition={{
                                    type: 'spring',
                                    ease: "easeOut",
                                    duration: 1,
                                    bounce: 0.5,
                                    delay: 0.5
                                }}
                            >
                                {canGenerate ? (
                                    <div className="flex flex-col items-center gap-4">
                                        <Button
                                            size="lg"
                                            onClick={handleNext}
                                            style={{boxShadow: '0 6px 24px rgba(249, 244, 249, 0.3)', gap: 0}}
                                        >
                                            <motion.p
                                                initial={{width: 0, marginRight: 0}}
                                                animate={{width: 'auto', marginRight: 12}}
                                                transition={{
                                                    type: 'spring',
                                                    ease: "easeOut",
                                                    duration: 1,
                                                    bounce: 0.5,
                                                    delay: 1
                                                }}
                                                style={{overflow: "hidden"}}
                                            >
                                                {t('create-now')}
                                            </motion.p>
                                            <Sparkles/>
                                        </Button>
                                        {!isPremium && (
                                            <>
                                                <p className="text-sm text-gray-500 text-center">{t('you-have-already-generated')} {user?.storiesGenerated}/10 {t('stories')}</p>
                                                <BuyButton varient="secondary" size="default"/>
                                            </>
                                        )}
                                    </div>
                                ): (
                                    <div className="flex flex-col items-center gap-3">
                                        <p className="text-amber-500 text-center">{t('your-reached-the-10-free-trials')}</p>
                                        <BuyButton/>
                                    </div>
                                )}
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{opacity: 0, y: 80, filter: 'blur(8px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, y: 80, filter: 'blur(8px)' }}
                                transition={{
                                    type: 'spring',
                                    ease: "easeOut",
                                    duration: 1,
                                    bounce: 0.5,
                                    delay: 1.5
                                }}
                                className="mx-auto fixed z-30 bottom-10 left-0 flex w-full gap-3 px-6 items-center justify-center">
                                <Button
                                    onClick={handlePrev}
                                    className="w-full max-w-64"
                                    variant="secondary"
                                    size="lg"
                                >
                                    <ArrowLeft />
                                    {t('back')}
                                </Button>
                                {(currentStep !== steps.length - 2 && currentStep !== steps.length - 1) ? (
                                    <Button
                                        size="lg"
                                        onClick={handleNext}
                                        disabled={currentStep === steps.length - 1 || (currentStep === 1 && data?.caracters?.length === 0) || (currentStep === 2 && data?.places?.length === 0)}
                                        className="w-full max-w-64"
                                    >
                                        {t('next')}
                                        <ArrowRight />
                                    </Button>
                                ):(
                                    <Button
                                        size="lg"
                                        onClick={handleSubmit}
                                        className="w-full max-w-64"
                                        style={{boxShadow: '0 6px 24px rgba(249, 244, 249, 0.3)', gap: 0}}
                                    >
                                        <motion.p
                                            initial={{width: 0, marginRight: 0}}
                                            animate={{width: 'auto', marginRight: 12}}
                                            transition={{
                                                type: 'spring',
                                                ease: "easeOut",
                                                duration: 1,
                                                bounce: 0.5,
                                                delay: 0.5
                                            }}
                                            style={{overflow: "hidden"}}
                                        >
                                            {canGenerate ? (
                                                <>
                                                    {loading ? t('loading') : t('create')}
                                                </>
                                            ):(
                                                t('your-reached-the-10-free-trials')
                                            )}
                                        </motion.p>
                                        {loading ? <Skeleton className="h-6 w-6 bg-gray-800 rounded-full" /> : <Sparkles/>}
                                    </Button>
                                )}
                            </motion.div>
                        )}
                    </>
                )}
            </AnimatePresence>
        </section>
    );
}