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
    {index: 17, label: 'the-lioness', value: 'lioness', img: '/img/caracters/17.jpg'},
    {index: 18, label: 'the-pirat', value: 'pirat', img: '/img/caracters/18.jpg'},
    {index: 19, label: 'the-jellyfish', value: 'jellyfish', img: '/img/caracters/19.jpg'},
    {index: 20, label: 'the-crab', value: 'crab', img: '/img/caracters/20.jpg'},
    {index: 21, label: 'the-whale', value: 'whale', img: '/img/caracters/21.jpg'},
    {index: 22, label: 'the-seal', value: 'seal', img: '/img/caracters/22.jpg'},
    {index: 23, label: 'the-seahorse', value: 'seahorse', img: '/img/caracters/23.jpg'},
    {index: 24, label: 'the-mermaid', value: 'mermaid', img: '/img/caracters/24.jpg'},
    {index: 25, label: 'the-sea-turtle', value: 'turtle', img: '/img/caracters/25.jpg'},
    {index: 26, label: 'the-octopus', value: 'octopus', img: '/img/caracters/26.jpg'},
    {index: 27, label: 'the-unicorn', value: 'uncicorn', img: '/img/caracters/27.jpg'},
    {index: 28, label: 'the-ghost', value: 'ghost', img: '/img/caracters/28.jpg'},
    {index: 29, label: 'the-elf', value: 'elf', img: '/img/caracters/29.jpg'},
    {index: 30, label: 'the-robot', value: 'robot', img: '/img/caracters/30.jpg'},
    {index: 31, label: 'the-dragon', value: 'dragon', img: '/img/caracters/31.jpg'},
    {index: 32, label: 'the-troll', value: 'troll', img: '/img/caracters/32.jpg'},
    {index: 33, label: 'the-fairy', value: 'fairy', img: '/img/caracters/33.jpg'},
    {index: 34, label: 'the-alien', value: 'alien', img: '/img/caracters/34.jpg'},
    {index: 35, label: 'the-witch', value: 'witch', img: '/img/caracters/35.jpg'},
    {index: 36, label: 'the-knight', value: 'knight', img: '/img/caracters/36.jpg'},
    {index: 37, label: 'the-princess', value: 'princess', img: '/img/caracters/37.jpg'},
    {index: 38, label: 'the-roman', value: 'roman', img: '/img/caracters/38.jpg'},
    {index: 39, label: 'the-prehistoric-woman', value: 'prehistoric woman', img: '/img/caracters/39.jpg'},
    {index: 40, label: 'the-samurai', value: 'samurai', img: '/img/caracters/40.jpg'},
    {index: 41, label: 'the-egyptian', value: 'egyptian', img: '/img/caracters/41.jpg'},
    {index: 42, label: 'the-greek', value: 'greek', img: '/img/caracters/42.jpg'},
    {index: 43, label: 'the-viking', value: 'viking', img: '/img/caracters/43.jpg'},
    {index: 44, label: 'the-amazon', value: 'amazon', img: '/img/caracters/44.jpg'}
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