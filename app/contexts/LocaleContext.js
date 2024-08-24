"use client"

import React, {createContext, useContext, useEffect, useState} from "react";
import translationsData from "../../public/translations/translation.json";

const LocaleContext = createContext(null);

export const LocaleProvider = (props) => {
    const [langue, setLangue] = useState(() => {
        const storedLangue = localStorage.getItem("langue");
        return storedLangue
            ? JSON.parse(storedLangue)
            : "fr";
    });

    const [languesDisponibles, setLanguesDisponibles] = useState([
        { code: "en", label: "English" },
        { code: "fr", label: "Français" },
        { code: "it", label: "Italiano" },
        { code: "de", label: "Italiano" },
    ]);

    useEffect(() => {
        const userLangue = navigator.language.split('-')[0];

        const langueExistante = languesDisponibles.find(lang => lang.code === userLangue);

        setLangue(langueExistante ? userLangue : "fr");
    }, [languesDisponibles]);

    useEffect(() => {
        localStorage.setItem("langue", JSON.stringify(langue));
    }, [langue]);


    const t = (tag) => {
        const translationEntry = translationsData.translations.find(entry => entry.tag === tag);
        if (translationEntry) {
            return translationEntry.translations[langue] || translationEntry.translations.en;
        }
        return tag;
    };

    return (
        <LocaleContext.Provider value={{t}}>
            {props.children}
        </LocaleContext.Provider>
    );
};

export const useLocale = () => useContext(LocaleContext);

