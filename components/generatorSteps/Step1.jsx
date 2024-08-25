import { H1 } from "@/components/typo/H1";
import { useLocale } from "@/app/contexts/LocaleContext";

export default function Step1() {
    const { t } = useLocale();

    return (
        <>
            <h1 className="sr-only">Wonder Story</h1>
            <H1>{t('wonderful-stories-start-here')}</H1>
        </>
    );
}