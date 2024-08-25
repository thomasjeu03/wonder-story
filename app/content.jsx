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
import Step3 from "@/components/generatorSteps/Step3";
import Step4 from "@/components/generatorSteps/Step4";

export default function HomeContent() {
    const { t, langue } = useLocale();

    const [data, setData] = useState({
        locale: langue,
        caracters: [],
        mainCaracter: '',
        places: [],
        eras: [],
        ageRange: '',
        time: '',
        genres: [],
        moral: false,
        inputCustom: ''
    });

    const [currentStep, setCurrentStep] = useState(0);
    const [error, setError] = useState('');
    const [newStory, setNewStory] = useState('');
    const [loading, setLoading] = useState(false);

    const steps = [
        {id: 1, content: <Step1 />},
        {id: 2, content: <Step2 data={data} setData={setData} />},
        {id: 3, content: <Step3 data={data} setData={setData} />},
        {id: 4, content: <Step4 data={data} setData={setData} />}
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
        <section className="min-h-min w-full flex flex-col items-center pt-4 sm:pt-6 gap-6 sm:gap-12 pb-20">

            {steps[currentStep].content}

            <div className="gradient-blur-reverse">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            {currentStep === 0 ? (
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
                            delay: 0.5
                        }}
                        style={{overflow: "hidden"}}
                    >
                        {t('create-now')}
                    </motion.p>
                    <Sparkles/>
                </Button>
            ): (
                <div className="mx-auto fixed z-30 bottom-10 left-0 flex w-full gap-3 px-3 items-center justify-center">
                    {currentStep !== 0 && (
                        <Button
                            disabled={currentStep === 0}
                            onClick={handlePrev}
                            className="w-full max-w-64"
                            variant="secondary"
                            size="lg"
                        >
                            <ArrowLeft />
                            {t('come-back')}
                        </Button>
                    )}
                    {currentStep !== steps.length - 1 ? (
                        <Button
                            disabled={currentStep === steps.length - 1 || (currentStep === 1 && data?.caracters?.length === 0) || (currentStep === 2 && data?.places?.length === 0)}
                            onClick={handleNext}
                            className="w-full max-w-64"
                            size="lg"
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
                </div>
            )}

            {error && <p className="text-red-500 max-w-3xl">{error}</p>}

            {!loading && !error && newStory && <MarkdownRenderer story={newStory}/>}
        </section>
    );
}