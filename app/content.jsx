"use client"

import {useState} from "react";
import {Button} from "@/components/ui/button";
import Step1 from "@/components/generatorSteps/Step1";
import Step2 from "@/components/generatorSteps/Step2";
import {useLocale} from "@/app/contexts/LocaleContext";
import {ArrowLeft, ArrowRight, Sparkles} from "lucide-react";
import {motion} from "framer-motion";
import axios from "axios";
import {Skeleton} from "@/components/ui/skeleton";
import MarkdownRenderer from "@/components/MarkdownRenderer";

export default function HomeContent() {
    const { t } = useLocale();

    const [data, setData] = useState({
        ageRange: '',
        caracters: [],
        mainCaracter: '',
        places: [],
        eras: [],
        time: '',
        genres: [],
        moral: false,
        inputCustom: '',
    });

    const [currentStep, setCurrentStep] = useState(0);
    const [error, setError] = useState('');
    const [newStory, setNewStory] = useState('');
    const [loading, setLoading] = useState(false);

    const steps = [
        {id: 1, content: <Step1 />},
        {id: 2, content: <Step2 data={data} setData={setData} currentStep={currentStep} setCurrentStep={setCurrentStep} />}
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
        setError('');
        setLoading(true);
        try {
            const response = await axios.post('/api/generate', { data });
            setNewStory(response.data.story);
        } catch (err) {
            setError('Error processing the data');
        } finally {
            setLoading(false)
        }
    };

    return (
        <section className="min-h-min w-full flex flex-col items-center justify-center gap-6 sm:gap-12"
                 style={{height: 'calc(100dvh - 48px)'}}>

            {steps[currentStep].content}

            {currentStep === 0 ? (
                <Button
                    size="lg"
                    onClick={handleNext}
                    className="shadow-lg shadow-amber-500"
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
                        {t('create-now')}
                    </motion.p>
                    <Sparkles/>
                </Button>
            ): (
                <div className="absolute z-30 bottom-10 left-0 flex w-full gap-3 items-center justify-center">
                    {currentStep !== 0 && (
                        <Button
                            disabled={currentStep === 0}
                            onClick={handlePrev}
                            variant="secondary"
                            size="lg"
                        >
                            <ArrowLeft />
                            {t('come-back')}
                        </Button>
                    )}
                    {currentStep !== steps.length - 1 ? (
                        <Button
                            disabled={currentStep === steps.length - 1}
                            onClick={handleNext}
                            size="lg"
                        >
                            {t('next')}
                            <ArrowRight />
                        </Button>
                    ):(
                        <Button
                            size="lg"
                            onClick={handleSubmit}
                            className="shadow-lg shadow-amber-500"
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
                </div>
            )}

            {error && <p className="text-red-500">{error}</p>}

            {!loading && !error && newStory && <MarkdownRenderer story={newStory}/>}
        </section>
    );
}