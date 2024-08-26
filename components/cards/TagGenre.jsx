import {useLocale} from "@/app/contexts/LocaleContext";
import {useEffect, useState} from "react";
import {Plus, X} from "lucide-react";

export default function TagGenre({ genre, data, setData }) {
    const { t } = useLocale();
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        if (data?.genres.includes(genre?.label)) {
            setSelected(true);
        } else {
            setSelected(false);
        }
    }, [genre?.label, data?.genres]);

    const addgenre = (genre) => {
        setData(prev => ({
            ...prev,
            genres: [...prev.genres, genre?.label]
        }));
    };

    const removegenre = (genre) => {
        setData(prev => ({
            ...prev,
            genres: prev.genres.filter(c => c !== genre?.label)
        }));
    };

    const handleClick = () => {
        if (selected) {
            removegenre(genre);
        } else {
            addgenre(genre);
        }
        setSelected(!selected);
    };

    return (
        <button type="button" onClick={handleClick}
                style={selected ? {
                    backgroundColor: `${genre?.color}44`,
                    borderWidth: 1,
                    borderColor: `${genre?.color}bb`
                } : {
                    backgroundColor: `${genre?.color}04`,
                    borderWidth: 1,
                    borderColor: `${genre?.color}10`
                }}
                className={`${selected && 'genre-tag--selected'} py-1 px-2 min-w-10 gap-2 flex flex-row flex-nowrap relative items-center justify-center rounded-full`}>
            {!selected && <Plus color={`${genre?.color}88`} size={14} />}
            <h4 style={selected ? {color: `${genre?.color}ff`} : {color: `${genre?.color}88`}}
                className="text-sm md:text-base text-center no-whitespace">{t(genre?.label)}</h4>
            {selected && <X color={`${genre?.color}dd`} size={14} />}
        </button>
    )
}