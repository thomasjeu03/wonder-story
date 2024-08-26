import { H2 } from "@/components/typo/H2";
import {motion} from "framer-motion";

import { useLocale } from "@/app/contexts/LocaleContext";

export default function Step4({ data, setData }) {
    const { t } = useLocale();

    return (
        <>
            <motion.div
                initial={{y: 40, filter: 'blur(8px)', opacity: 0}}
                animate={{y: 0, filter: 'blur(0px)', opacity: 1}}
                exit={{y: -40, filter: 'blur(8px)', opacity: 0}}
                transition={{
                    type: 'spring',
                    ease: "easeOut",
                    duration: 1.5,
                    bounce: 0.2,
                }}
                className="flex flex-col gap-3 w-full max-w-4xl">
                <H2>{t('age-range')}</H2>
            </motion.div>
        </>
    );
}