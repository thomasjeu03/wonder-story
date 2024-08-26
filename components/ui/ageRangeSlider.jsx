import * as SliderPrimitive from "@radix-ui/react-slider";
import { useLocale } from "@/app/contexts/LocaleContext";
import {H3} from "@/components/typo/H3";

const AgeRangeSlider = ({ data, setData }) => {
    const { t } = useLocale();

    const handleValueChange = (value) => {
        setData((prev) => ({
            ...prev,
            ageRange: value[0]
        }));
    };

    return (
        <div className="w-full flex flex-col gap-3">
            <div className="flex flex-row w-full items-center justify-between">
                <p className="text-gray-500">{t('age-selection')}</p>
                <p className="text-sm">
                    <span className="text-base font-semibold whitespace-nowrap">
                        {data?.ageRange}
                    </span>{' '}
                    {t("years-old")}
                </p>
            </div>

            <SliderPrimitive.Root
                value={[data?.ageRange || 3]}
                min={3}
                max={12}
                step={1}
                onValueChange={handleValueChange}
                className="relative flex w-full touch-none select-none items-center"
            >
                <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
                    <SliderPrimitive.Range className="absolute h-full bg-primary"/>
                </SliderPrimitive.Track>
                <SliderPrimitive.Thumb
                    className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"/>
            </SliderPrimitive.Root>
        </div>
    );
};

export default AgeRangeSlider;