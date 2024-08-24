"use client"

import React, {createContext, useContext, useEffect, useState} from "react";
import translationsData from "../../public/translations/translation.json";

const LocaleContext = createContext(null);

export const LocaleProvider = (props) => {
    const [langue, setLangue] = useState('fr')

    const localeAllowed = [
        { code: "en", label: "English" },
        { code: "fr", label: "Français" },
        { code: "it", label: "Italiano" },
        { code: "de", label: "Deutsch" },
    ]

    useEffect(() => {
        const userLocale = navigator.language.split('-')[0];

        const localeExist = localeAllowed.find(loc => loc.code === userLocale);

        setLangue(localeExist ? userLocale : "fr");
    }, []);

    const t = (tag) => {
        const translationEntry = translationsData.t.find(entry => entry.tag === tag);
        if (translationEntry) {
            return translationEntry.t[langue] || translationEntry.t.fr;
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

