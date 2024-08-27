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

export default function HomeContent() {
    const { t, langue } = useLocale();
    const {currentStep, setCurrentStep } = useUser();

    const [data, setData] = useState({
        locale: langue,
        caracters: [],
        mainCaracter: '',
        places: [],
        eras: [],
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
                eras: [],
                ageRange: 5,
                time: 3,
                genres: [],
                moral: false,
                inputCustom: ''
            })
        }
    }, [currentStep]);

    const [error, setError] = useState('');
    const [newStory, setNewStory] = useState('');
    const [loading, setLoading] = useState(false);

    const steps = [
        {id: 1, content: <Step1 />},
        {id: 2, content: <Step2 data={data} setData={setData} />},
        {id: 3, content: <Step3 data={data} setData={setData} />},
        {id: 4, content: <Step4 data={data} setData={setData} />},
        {id: 5, content: <Step5 loading={loading} error={error} newStory={newStory} />},
    ];

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCurrentStep(currentStep + 1)
        setError('');
        setLoading(true);
        try {
            const response = await axios.post('/api/generate', { data });
            setNewStory(response.data.story);
            //TODO: Faire la redirection vers la page /story/[id] apres avoir créer la story dans Prisma
        } catch (err) {
            setError('Error processing the data');
        } finally {
            setLoading(false)
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
                    </motion.div>
                ): (
                    <motion.div
                        initial={{ opacity: 0, y: 80, filter: 'blur(8px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: 80, filter: 'blur(8px)' }}
                        transition={{
                            type: 'spring',
                            ease: "easeOut",
                            duration: 1,
                            bounce: 0.5,
                            delay: 1.5
                        }}
                        className="mx-auto fixed z-30 bottom-10 left-0 flex w-full gap-3 px-3 items-center justify-center">
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
                                    {loading ? t('loading') : t('create')}
                                </motion.p>
                                {loading ? <Skeleton className="h-6 w-6 bg-gray-800 rounded-full" /> : <Sparkles/>}
                            </Button>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}