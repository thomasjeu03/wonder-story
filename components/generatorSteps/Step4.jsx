import { H2 } from "@/components/typo/H2";

import { useLocale } from "@/app/contexts/LocaleContext";

export default function Step4({ data, setData }) {
    const { t } = useLocale();

    return (
        <>
            <div className="flex flex-col gap-3 w-full max-w-4xl">
                <H2>{t('age-range')}</H2>
            </div>
        </>
    );
}