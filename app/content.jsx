"use client"

import {useLocale} from "@/app/contexts/LocaleContext";

export default function HomeContent() {
    const { t } = useLocale();

    return (
        <>
            {t('home-page')}
        </>
    );
}