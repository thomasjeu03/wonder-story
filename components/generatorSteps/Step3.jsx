import { H2 } from "@/components/typo/H2";
import { useLocale } from "@/app/contexts/LocaleContext";
import PlaceCard from "@/components/cards/PlaceCard";
import {H3} from "@/components/typo/H3";
import EraCard from "@/components/cards/EraCard";
import Image from "next/image";

const places= [
    {index: 0, label: 'foret_enchantee', value: 'nina', img: '/img/places/0.jpg'},
    {index: 1, label: 'royaume_des_arc_en_ciels', value: 'milo', img: '/img/places/1.jpg'},
    {index: 2, label: 'pole_des_glaces_eternelles', value: 'pablo', img: '/img/places/2.jpg'},
    {index: 3, label: 'royaume_des_grottes_luminescentes', value: 'oscar', img: '/img/places/3.jpg'},
    {index: 4, label: 'monde_subaquatique_de_lumis', value: 'luna', img: '/img/places/4.jpg'},
]
const eras= [
    {index: 0, label: 'prehistory', value: 'nina', img: '/img/eras/0.jpg'},
    {index: 1, label: 'middle-age', value: 'milo', img: '/img/eras/1.jpg'},
    {index: 2, label: 'present', value: 'pablo', img: '/img/eras/2.jpg'},
    {index: 3, label: 'distant-future', value: 'oscar', img: '/img/eras/3.jpg'},
]

export default function Step3({ data, setData }) {
    const { t } = useLocale();

    return (
        <>
            <div className="flex flex-col gap-3 w-full max-w-4xl">
                <H2>{t('choose-your-places')}</H2>
                <H3 className="text-gray-400">{t('choose-your-places-description')}</H3>
            </div>

            <div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 w-full gap-2 sm:gap-3 md:gap-4 max-w-5xl">
                {places.map((place) => (
                    <PlaceCard key={place?.index} place={place} data={data} setData={setData}/>
                ))}
            </div>

            <div className="flex flex-col gap-3 w-full max-w-4xl">
                <H2>{t('choose-your-eras')}</H2>
                <H3 className="text-gray-400">{t('choose-your-eras-description')}</H3>
            </div>

            {/*TODO: Eras*/}
            {/*<div*/}
            {/*    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 w-full gap-2 sm:gap-3 md:gap-4 max-w-5xl">*/}
            {/*    {eras.map((era) => (*/}
            {/*        <EraCard key={era?.index} era={era} data={data} setData={setData}/>*/}
            {/*    ))}*/}
            {/*</div>*/}
        </>
    );
}