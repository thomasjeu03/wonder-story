import Image from "next/image";
import {useLocale} from "@/app/contexts/LocaleContext";
import {useEffect, useState} from "react";
import {CircleCheck} from "lucide-react";

export default function EraCard({ era, data, setData }) {
    const { t } = useLocale();
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        if (data?.eras.includes(era?.label)) {
            setSelected(true);
        } else {
            setSelected(false);
        }
    }, [era?.label, data?.eras]);

    const addEra = (era) => {
        setData(prev => ({
            ...prev,
            eras: [...prev.eras, era?.label]
        }));
    };

    const removeEra = (era) => {
        setData(prev => ({
            ...prev,
            eras: prev.eras.filter(c => c !== era?.label)
        }));
    };

    const handleClick = () => {
        if (selected) {
            removeEra(era);
        } else {
            addEra(era);
        }
        setSelected(!selected);
    };

    return (
        <button type="button" onClick={handleClick} className={`${selected && 'era-card--selected'} era-card w-full min-w-40 flex flex-col bg-fuchsia-950/20 overflow-hidden relative rounded-xs sm:rounded-md border-2 border-fuchsia-800/30 shadow-lg`}>
            <Image
                src={era?.img}
                alt={era?.label}
                className="w-full aspect-square object-cover"
                width={200}
                priority
                height={200}
                quality={80}
            />
            {selected && (
                <div className="absolute top-0.5 sm:top-1 left-0.5 sm:left-1 sm:p-0.5 bg-fuchsia-950 rounded-full">
                    <CircleCheck className="text-fuchsia-500 w-5 h-5 md:w-7 md:h-7"/>
                </div>
            )}
            <div className="p-1 sm:p-2 md:p-3">
                <h4 className="text-sm md:text-base text-left text-fuchsia-200">{t(era?.label)}</h4>
            </div>
        </button>
    )
}