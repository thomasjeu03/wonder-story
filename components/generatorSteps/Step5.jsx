import {useLocale} from "@/app/contexts/LocaleContext";
import Image from "next/image";
import { motion } from "framer-motion";
import {H2} from "@/components/typo/H2";
import {Skeleton} from "@/components/ui/skeleton";

export default function Step5({data, caractersDataBase, caracterTagsDataBase, radius = 80}) {
    const {t} = useLocale();

    const caractersFind = caractersDataBase.filter(caracter =>
        data?.caracters?.includes(t(caracter.name))
    );

    const caractersWithColors = caractersFind.map(caracter => {
        const tag = caracterTagsDataBase.find(tag => tag.id === caracter.caracterTagId);
        return {
            ...caracter,
            color: tag?.color || '#ffffff'
        };
    });

    const calculatePosition = (index, total) => {
        const angleInDegrees = (index / total) * 360;
        const angleInRadians = (angleInDegrees * Math.PI) / 180;
        const x = Math.cos(angleInRadians) * radius;
        const y = Math.sin(angleInRadians) * radius;
        return { x, y };
    };

    return (
        <div className="w-full flex flex-col items-center justify-end relative gap-3 overflow-hidden"
             style={{height: 'calc(100dvh - 200px)'}}>
            <div className="flex flex-row flex-wrap gap-3 items-center justify-center">
                <H2 className="text-center text-gray-300">{t('your-story-is-creating')}</H2>
                <Skeleton className="h-6 w-6 bg-gray-200 rounded-full" />
            </div>

            {/*TODO: animation chargement histoire avec rotation des personnages, lieux et themes*/}

            {caractersWithColors.length > 0 && (
                <motion.div
                    className="relative"
                    style={{
                        position: 'absolute',
                        top: '50%', left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 0, height: 0,
                    }}
                    animate={{ rotate: 360 }}
                    transition={{
                        repeat: Infinity,
                        duration: 20,
                        ease: "linear",
                    }}
                >
                    <div style={{
                        width: `${radius * 3}px`,
                        height: `${radius * 3}px`,
                        position: 'absolute',
                        top: '50%', left: '50%',
                        opacity: 0.5,
                        background: 'radial-gradient(circle, rgba(255, 0, 255, 1) 0%, rgba(255, 44, 55, 1) 100%)',
                        zIndex: 0,
                        borderRadius: '50% 40% 60% 30%',
                        filter: 'blur(80px)',
                        transform: 'translate(-50%, -50%)',
                    }}>

                    </div>
                    {caractersWithColors.length > 0 && caractersWithColors.map((caracter, index) => {
                        const {x, y} = calculatePosition(index, caractersWithColors.length);

                        return (
                            <motion.div
                                key={index}
                                className="overflow-hidden pointer-events-none rounded-md shadow-lg absolute"
                                style={{
                                    left: `${x}px`,
                                    top: `${y}px`,
                                    backgroundColor: `${caracter?.color}44`,
                                    border: `2px solid ${caracter?.color}`,
                                    transform: `translate(-50%, -50%)`,
                                    width: 80,
                                    height: 80,
                                }}
                                animate={{rotate: -360}}
                                transition={{
                                    repeat: Infinity,
                                    duration: 20,
                                    ease: "linear",
                                }}
                            >
                                <Image
                                    src={`/img/caracters/${caracter?.image ? caracter?.image : caracter?.name}.jpg`}
                                    alt={t(caracter?.name)}
                                    className="w-full object-cover"
                                    width={80}
                                    priority
                                    height={80}
                                    style={{aspectRatio: '1'}}
                                    quality={80}
                                />
                            </motion.div>
                        )
                    })}
                </motion.div>
            )}
        </div>
);
}