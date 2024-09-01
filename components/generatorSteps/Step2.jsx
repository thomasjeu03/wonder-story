import { H2 } from "@/components/typo/H2";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {motion} from "framer-motion";

import { useLocale } from "@/app/contexts/LocaleContext";
import {H3} from "@/components/typo/H3";
import CaracterCard from "@/components/cards/CaracterCard";

const caracters= [
    {index: 0, label: 'the-policewoman', value: 'policewoman', img: '/img/caracters/0.jpg'},
    {index: 1, label: 'the-worker', value: 'worker', img: '/img/caracters/1.jpg'},
    {index: 2, label: 'the-astronaut', value: 'astronaut', img: '/img/caracters/2.jpg'},
    {index: 3, label: 'the-ballerina-dancer', value: 'dancer', img: '/img/caracters/3.jpg'},
    {index: 4, label: 'the-doctoress', value: 'doctoress', img: '/img/caracters/4.jpg'},
    {index: 5, label: 'the-fireman', value: 'fireman', img: '/img/caracters/5.jpg'},
    {index: 6, label: 'the-gardener', value: 'gardener', img: '/img/caracters/6.jpg'},
    {index: 7, label: 'the-farmer', value: 'farmer', img: '/img/caracters/7.jpg'},
    {index: 8, label: 'the-cook', value: 'cook', img: '/img/caracters/8.jpg'},
    {index: 9, label: 'the-kitten', value: 'kitten', img: '/img/caracters/9.jpg'},
    {index: 10, label: 'the-dog', value: 'dog', img: '/img/caracters/10.jpg'},
    {index: 11, label: 'the-fox', value: 'fox', img: '/img/caracters/11.jpg'},
    {index: 12, label: 'the-owl', value: 'owl', img: '/img/caracters/12.jpg'},
    {index: 13, label: 'the-koala', value: 'koala', img: '/img/caracters/13.jpg'},
    {index: 14, label: 'the-otter', value: 'otter', img: '/img/caracters/14.jpg'},
    {index: 15, label: 'the-red-panda', value: 'red panda', img: '/img/caracters/15.jpg'},
    {index: 16, label: 'the-mouse', value: 'mouse', img: '/img/caracters/16.jpg'},
    {index: 17, label: 'the-lioness', value: 'lioness', img: '/img/caracters/17.jpg'}
]

export default function Step2({ data, setData }) {
    const { t } = useLocale();

    return (
        <>
            <div className="flex flex-col gap-3 w-full max-w-4xl">
                <H2>{t('choose-your-caracters')}</H2>
                <H3 className="text-gray-400">{t('choose-your-caracters-description')}</H3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 w-full gap-2 sm:gap-3 md:gap-4 max-w-5xl">
                {caracters.map((caracter) => (
                    <CaracterCard key={caracter?.index} caracter={caracter} data={data} setData={setData} />
                ))}
            </div>

            {data?.caracters.length > 0 && (
                <motion.div
                    initial={{y: 40,filter: 'blur(8px)', opacity: 0}}
                    animate={{y: 0, filter: 'blur(0px)', opacity: 1}}
                    exit={{y: -40, filter: 'blur(8px)', opacity: 0}}
                    transition={{
                        type: 'spring',
                        ease: "easeOut",
                        duration: 1.5,
                        delay: 0.5,
                        bounce: 0.2,
                    }}
                    className="flex flex-col flex-nowrap items-center sm:flex-row gap-6 w-full max-w-4xl p-4 lg:p-6 rounded-md lg:rounded-lg bg-gradient-to-r from-fuchsia-950/40 to-fuchsia-950/0 border border-fuchsia-800/30">
                    <div className="flex flex-col gap-2.5 lg:gap-3 w-full">
                        <H3>{t('choose-your-main-caracters')}</H3>
                        <p className="text-fuchsia-50/70 text-xs sm:text-sm">{t('choose-your-main-caracters-description')}</p>
                    </div>

                    <Select>
                        <SelectTrigger className="max-w-60">
                            <SelectValue placeholder={t('select-caracter')} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {data?.caracters.map((caracter) => (
                                    <SelectItem key={caracter?.index} value={caracter}>
                                        {t(caracter)}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </motion.div>
            )}
        </>
    );
}