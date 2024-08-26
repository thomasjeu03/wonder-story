import { H1 } from "@/components/typo/H1";
import { useLocale } from "@/app/contexts/LocaleContext";
import {motion} from "framer-motion";

export default function Step1() {
    const { t } = useLocale();

    return (
        <>
            <h1 className="sr-only">Wonder Story</h1>
            <motion.div
                initial={{y: 40, filter: 'blur(8px)', opacity: 0}}
                animate={{y: 0, filter: 'blur(0px)', opacity: 1}}
                exit={{y: -40, filter: 'blur(8px)', opacity: 0}}
                transition={{
                    type: 'spring',
                    ease: "easeOut",
                    duration: 5,
                    delay: 0,
                    bounce: 0.2,
                }}>
                <H1 style={{ marginTop: 'calc(30dvh)' }}>{t('wonderful-stories-start-here')}</H1>
            </motion.div>
        </>
    );
}