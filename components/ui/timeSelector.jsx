import {useLocale} from "@/app/contexts/LocaleContext";
import * as SliderPrimitive from "@radix-ui/react-slider";

const TimeSelector = ({ data, setData }) => {
    const { t } = useLocale();

    const handleValueChange = (value) => {
        setData((prev) => ({
            ...prev,
            time: value[0]
        }));
    };

    return (
        <div className="w-full flex flex-col gap-3 max-w-xl">
            <div className="flex flex-row w-full items-center gap-3 justify-between">
                <p className="text-gray-500">{t('reading-duration')}</p>
                <p className="text-sm whitespace-nowrap">
                    <span className="text-base font-semibold whitespace-nowrap">
                        {data?.time}
                    </span>{' '}
                    min
                </p>
            </div>
            <SliderPrimitive.Root
                value={[data?.time || 3]}
                min={1}
                max={6}
                step={1}
                onValueChange={handleValueChange}
                className="relative flex w-full touch-none select-none items-center"
            >
                <SliderPrimitive.Track
                    className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
                    <SliderPrimitive.Range className="absolute h-full bg-primary"/>
                </SliderPrimitive.Track>
                <SliderPrimitive.Thumb
                    className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"/>
            </SliderPrimitive.Root>
        </div>
    );
};

export default TimeSelector;