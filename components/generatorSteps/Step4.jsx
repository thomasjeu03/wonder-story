import { useLocale } from "@/app/contexts/LocaleContext";
import AgeRangeSlider from "@/components/ui/ageRangeSlider";
import {H2} from "@/components/typo/H2";
import {Switch} from "@/components/ui/switch";
import TagGenre from "@/components/cards/TagGenre";

const genres = [
    {
        label: "adventure",
        color: "#ff5733"
    },
    {
        label: "fantasy",
        color: "#33ff57"
    },
    {
        label: "love",
        color: "#f733ff"
    },
    {
        label: "mystery",
        color: "#33aaff"
    },
    {
        label: "science-fiction",
        color: "#ff33a1"
    },
    {
        label: "comedy",
        color: "#f7ff33"
    },
    {
        label: "fairy-tale",
        color: "#ffb833"
    },
    {
        label: "education",
        color: "#33ffb8"
    },
    {
        label: "drama",
        color: "#ff5733"
    },
    {
        label: "historical",
        color: "#b833ff"
    },
    {
        label: "animals",
        color: "#33ff57"
    },
    {
        label: "supernatural",
        color: "#a1ff33"
    }
];

export default function Step4({ data, setData }) {
    const { t } = useLocale();

    return (
        <>
            <H2>{t('customization-title')}</H2>
            <div className="flex flex-col gap-3 w-full max-w-xl">
                <AgeRangeSlider data={data} setData={setData}/>
            </div>
            <div className="w-full flex flex-col gap-3 max-w-xl">
                <div className="flex flex-row w-full items-center justify-between">
                    <p className="text-gray-500">{t('reading-duration')}</p>
                    <p className="text-sm">
                    <span className="text-base font-semibold whitespace-nowrap">
                        {data?.time}
                    </span>{' '}
                        min
                    </p>
                </div>
                <div>
                    {/*TODO: slect time*/}
                </div>
            </div>
            <div className="w-full flex flex-col gap-3 max-w-xl">
                <div className="flex flex-row w-full items-center justify-between">
                    <p className="text-gray-500">{t('theme-selection')}</p>
                </div>
                <div className='flex gap-3 flex-wrap w-full'>
                    {genres.map((genre, index) => (
                        <TagGenre key={index} genre={genre} data={data} setData={setData} />
                    ))}
                </div>
            </div>
            <div className="w-full flex flex-col gap-3 max-w-xl">
                <div className="flex flex-row w-full gap-3 items-center justify-between">
                    <p className="text-gray-500">{t('include-moral')}</p>
                    <Switch data={data} setData={setData} />
                </div>
            </div>
        </>
    );
}