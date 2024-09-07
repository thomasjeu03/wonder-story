import Image from "next/image";
import {useLocale} from "@/app/contexts/LocaleContext";
import {useEffect, useState} from "react";
import {CircleCheck} from "lucide-react";

export default function PlaceCard({ place, data, setData, placeTagColor }) {
    const { t } = useLocale();
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        if (data?.places.includes(place?.name)) {
            setSelected(true);
        } else {
            setSelected(false);
        }
    }, [place?.name, data?.places]);

    const addPlace = (place) => {
        setData(prev => ({
            ...prev,
            places: [...prev.places, place?.name]
        }));
    };

    const removePlace = (place) => {
        setData(prev => ({
            ...prev,
            places: prev.places.filter(c => c !== place?.name)
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
                className={`${selected && 'place-card--selected'} place-card w-full min-w-40 gap-3 flex flex-col relative items-center justify-center rounded-sm`}>
            <Image
                src={`/img/places/${place?.image ? place?.image : place?.name}.jpg`}
                alt={t(place?.name)}
                style={{
                    backgroundColor: `${placeTagColor}44`,
                    border: `2px solid${placeTagColor}FF`
                }}
                className="w-40 h-40 md:w-40 md:h-40 aspect-square object-cover rounded-full bg-fuchsia-950/20 overflow-hidden border-2 border-fuchsia-800/30 shadow-lg"
                width={100}
                priority
                height={100}
                quality={80}
            />
            {selected && (
                <div className="absolute top-0.5 sm:top-1 left-0.5 sm:left-1 sm:p-0.5 bg-fuchsia-950 rounded-full">
                    <CircleCheck className="text-fuchsia-500 w-5 h-5 md:w-7 md:h-7"/>
                </div>
            )}
            <h4 className="text-sm md:text-base text-center text-fuchsia-50">{t(place?.name)}</h4>
        </button>
    )
}