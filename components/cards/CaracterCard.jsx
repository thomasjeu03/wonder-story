import Image from "next/image";
import {useLocale} from "@/app/contexts/LocaleContext";
import {useEffect, useState} from "react";
import {CircleCheck} from "lucide-react";

export default function CaracterCard({ caracter, data, setData, caracterTagColor }) {
    const { t } = useLocale();
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        if (data?.caracters.includes(t(caracter?.name))) {
            setSelected(true);
        } else {
            setSelected(false);
        }
    }, [caracter?.name, data?.caracters]);

    const addCaracter = (caracter) => {
        setData(prev => ({
            ...prev,
            caracters: [...prev.caracters, t(caracter?.name)]
        }));
    };

    const removeCaracter = (caracter) => {
        setData(prev => ({
            ...prev,
            caracters: prev.caracters.filter(c => c !== t(caracter?.name))
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
        <button type="button" onClick={handleClick}
                style={{
                    backgroundColor: `${caracterTagColor}44`,
                    border: `2px solid${caracterTagColor}FF`
                }}
                className={`${selected && 'caracter-card--selected'} caracter-card w-full min-w-40 flex flex-col overflow-hidden relative rounded-xs sm:rounded-md shadow-lg`}>
            <Image
                src={`/img/caracters/${caracter?.image ? caracter?.image : caracter?.name}.jpg`}
                alt={t(caracter?.name)}
                className="w-full object-cover"
                width={200}
                priority
                height={200}
                style={{ aspectRatio: '1' }}
                quality={80}
            />
            {/*TODO: mettre une no-img en fond*/}
            {selected && (
                <div className="absolute top-0.5 sm:top-1 left-0.5 sm:left-1 sm:p-0.5 bg-fuchsia-950 rounded-full">
                    <CircleCheck className="text-fuchsia-500 w-5 h-5 md:w-7 md:h-7"/>
                </div>
            )}
            <div className="p-1 sm:p-2 md:p-3">
                <h4 className="text-sm md:text-base text-left text-fuchsia-50">{t(caracter?.name)}</h4>
            </div>
        </button>
    )
}