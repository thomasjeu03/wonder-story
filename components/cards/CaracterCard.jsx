import Image from "next/image";
import {useLocale} from "@/app/contexts/LocaleContext";
import {useEffect, useState} from "react";
import {CircleCheck} from "lucide-react";
import {motion} from "framer-motion";

export default function CaracterCard({ caracter, data, setData }) {
    const { t } = useLocale();
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        if (data?.caracters.includes(caracter?.label)) {
            setSelected(true);
        } else {
            setSelected(false);
        }
    }, [caracter?.label, data?.caracters]);

    const addCaracter = (caracter) => {
        setData(prev => ({
            ...prev,
            caracters: [...prev.caracters, caracter?.label]
        }));
    };

    const removeCaracter = (caracter) => {
        setData(prev => ({
            ...prev,
            caracters: prev.caracters.filter(c => c !== caracter?.label)
        }));
    };

    const handleClick = () => {
        if (selected) {
            removeCaracter(caracter);
        } else {
            addCaracter(caracter);
        }
        setSelected(!selected);
    };

    return (
        <motion.button
            initial={{filter: 'blur(8px)', opacity: 0}}
            animate={{filter: 'blur(0px)', opacity: 1}}
            transition={{
                type: 'spring',
                ease: "easeOut",
                duration: 2,
                bounce: 0.2,
                delay: caracter?.index * 0.08
            }}
            type="button" onClick={handleClick} className={`${selected && 'caracter-card--selected'} caracter-card w-full min-w-40 flex flex-col bg-fuchsia-950/20 overflow-hidden relative rounded-xs sm:rounded-md border-2 border-fuchsia-800/30 shadow-lg`}>
            <Image
                src={caracter?.img}
                alt={caracter?.label}
                className="w-full object-cover"
                width={200}
                priority
                height={200}
                style={{ aspectRatio: '5/4' }}
                quality={80}
            />
            {selected && (
                <div className="absolute top-0.5 sm:top-1 left-0.5 sm:left-1 sm:p-0.5 bg-fuchsia-950 rounded-full">
                    <CircleCheck className="text-fuchsia-500 w-5 h-5 md:w-7 md:h-7"/>
                </div>
            )}
            <div className="p-1 sm:p-2 md:p-3">
                <h4 className="text-sm md:text-base text-left text-fuchsia-200">{t(caracter?.label)}</h4>
            </div>
        </motion.button>
    )
}