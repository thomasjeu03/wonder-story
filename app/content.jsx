"use client"

import {useLocale} from "@/app/contexts/LocaleContext";
import {H1} from "@/components/typo/H1";
import {Button} from "@/components/ui/button";
import {Sparkles} from "lucide-react";
import {H2} from "@/components/typo/H2";
import {H3} from "@/components/typo/H3";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {useState} from "react";
import CaracterCard from "@/components/caracter/CaracterCard";
import { motion } from 'framer-motion';

const caracters= [
    {index: 0, label: 'Nina la Petite Fée', value: 'nina', img: '/img/caracters/0.jpg'},
    {index: 1, label: 'Milo le Chaton Magicien', value: 'milo', img: '/img/caracters/1.jpg'},
    {index: 2, label: 'Pablo le Dinosaure Courageux', value: 'pablo', img: '/img/caracters/2.jpg'},
    {index: 3, label: 'Oscar le Robot Rêveur', value: 'oscar', img: '/img/caracters/3.jpg'},
    {index: 4, label: 'Luna la Sorcière Mystérieuse', value: 'luna', img: '/img/caracters/4.jpg'},
    {index: 5, label: 'Zacharie le Zèbre', value: 'zacharie', img: '/img/caracters/5.jpg'},
    {index: 6, label: 'Pico le Pingouin Inventeur', value: 'pico', img: '/img/caracters/6.jpg'},
    {index: 7, label: 'Lola la Licorne Volante', value: 'lola', img: '/img/caracters/7.jpg'},
    {index: 8, label: 'Gaspard le Hérisson Jardinier', value: 'gaspard', img: '/img/caracters/8.jpg'}
]

export default function HomeContent() {
    const { t } = useLocale();

    const [data, setData] = useState({
        ageRange: '',
        caracters: [],
        mainCaracter: '',
        places: [],
        eras: [],
        time: '',
        genres: [],
        moral: false,
        inputCustom: '',
    })

    return (
        <>
            <section
                className="min-h-min w-full flex flex-col items-center justify-center gap-12 sm:gap-16"
                style={{height: 'calc(100dvh - 24px)'}}
            >
                <h1 className="sr-only">Wonder Story</h1>
                <H1>{t('wonderful-stories-start-here')}</H1>
                <Button
                    size="lg"
                    className="shadow-lg shadow-amber-500"
                    style={{boxShadow: '0 6px 24px rgba(249, 244, 249, 0.3)', gap: 0}}
                >
                    <motion.p
                        initial={{width: 0, marginRight: 0}}
                        animate={{width: 'auto', marginRight: 12}}
                        transition={{
                            type: 'spring',
                            ease: "easeOut",
                            duration: 1,
                            bounce: 0.5,
                            delay: 0.5
                        }}
                        style={{overflow: "hidden"}}
                    >
                        {t('create-now')}
                    </motion.p>
                    <Sparkles/>
                </Button>
        </section>


        <section className="min-h-min w-full flex flex-col items-center justify-center gap-8 sm:gap-12 lg:gap-16" style={{height: 'calc(100dvh - 24px)'}}>
            <div className="flex flex-col gap-3 w-full max-w-4xl">
                <H2>{t('choose-your-caracters')}</H2>
                    <p className="text-xs sm:text-sm text-gray-400">{t('choose-your-caracters-description')}</p>
                </div>

                <div className="flex overflow-x-scroll sm:overflow-x-initial sm:grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 w-full gap-2 sm:gap-3 md:gap-4 max-w-6xl">
                    {caracters.map((caracter) => (
                        <CaracterCard key={caracter?.index} caracter={caracter}/>
                    ))}
                </div>

                <div className="flex flex-col flex-nowrap items-center sm:flex-row gap-6 w-full max-w-4xl p-4 lg:p-6 rounded-md lg:rounded-lg bg-gradient-to-r from-fuchsia-950/40 to-fuchsia-950/0 border border-fuchsia-800/30">
                    <div className="flex flex-col gap-2.5 lg:gap-3 w-full">
                        <H3>{t('choose-your-main-caracters')}</H3>
                        <p className="text-fuchsia-50/70 text-xs sm:text-sm">{t('choose-your-main-caracters-description')}</p>
                    </div>

                    {/*TODO:*/}
                    <Select>
                        <SelectTrigger className="max-w-60">
                            <SelectValue placeholder={t('select-caracter')}/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {caracters.map((caracter) => (
                                    <SelectItem key={caracter?.index} value={caracter?.value}>
                                        {t(caracter?.label)}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </section>
        </>
    );
}