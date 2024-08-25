import Image from "next/image";
import {useLocale} from "@/app/contexts/LocaleContext";
import {useEffect, useState} from "react";
import {CircleCheck} from "lucide-react";

export default function PlaceCard({ place, data, setData }) {
    const { t } = useLocale();
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        if (data?.places.includes(place?.label)) {
            setSelected(true);
        } else {
            setSelected(false);
        }
    }, [place?.label, data?.places]);

    const addPlace = (place) => {
        setData(prev => ({
            ...prev,
            places: [...prev.places, place?.label]
        }));
    };

    const removePlace = (place) => {
        setData(prev => ({
            ...prev,
            places: prev.places.filter(c => c !== place?.label)
        }));
    };

    const handleClick = () => {
        if (selected) {
            removePlace(place);
        } else {
            addPlace(place);
        }
        setSelected(!selected);
    };

    return (
        <button type="button" onClick={handleClick}
                className={`${selected && 'place-card--selected'} place-card w-full min-w-40 gap-3 flex flex-col relative items-center justify-center`}>
            <Image
                src={place?.img}
                alt={place?.label}
                className="w-full aspect-square object-cover rounded-full bg-fuchsia-950/20 overflow-hidden border-2 border-fuchsia-800/30 shadow-lg"
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
            <h4 className="text-sm md:text-base text-center text-fuchsia-200">{t(place?.label)}</h4>
        </button>
    )
}