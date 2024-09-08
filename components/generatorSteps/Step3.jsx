import { H2 } from "@/components/typo/H2";
import { useLocale } from "@/app/contexts/LocaleContext";
import PlaceCard from "@/components/cards/PlaceCard";
import {H3} from "@/components/typo/H3";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Skeleton} from "@/components/ui/skeleton";
import DynamicIcon from "@/components/ui/dynamicIcon";

export default function Step3({ data, setData, loadingPlaces, loadingPlaceTags, places, placeTags }) {
    const { t } = useLocale();

    return (
        <>
            <div className="flex flex-col gap-3 w-full max-w-4xl">
                <H2>{t('choose-your-places')}</H2>
                <H3 className="text-gray-400">{t('choose-your-places-description')}</H3>
            </div>

            <Tabs defaultValue={placeTags[0]?.name} className="w-full flex flex-col items-center">
                <TabsList className="w-full max-w-4xl gap-2">
                    {loadingPlaceTags ? (
                        <Skeleton height="20px" width="40px" />
                    ):(
                        <>
                            {placeTags && placeTags.map((placeTag, index) => (
                                <TabsTrigger key={index+placeTag?.id} value={placeTag?.name}
                                             style={{ background: `radial-gradient(50% 100% at 50% 0%, ${placeTag?.color} 0%, ${placeTag?.color}77 50%, ${placeTag?.color}22 100%, ${placeTag?.color}00 150%)` }}>
                                    <DynamicIcon name={placeTag?.icon} size={20} strokeWidth={1.5} />
                                    {t(placeTag?.name)}
                                </TabsTrigger>
                            ))}
                        </>
                    )}
                </TabsList>
                {loadingPlaceTags ? (
                    <Skeleton height="20px" width="40px" />
                ):(
                    <>
                        {placeTags && placeTags.map((placeTag, index) => (
                            <TabsContent key={index+placeTag?.id} value={placeTag?.name} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 w-full gap-2 sm:gap-3 md:gap-4 max-w-5xl">
                                <>
                                    {loadingPlaces ? (
                                        <Skeleton height="20px" width="40px" />
                                    ):(
                                        <>
                                            {places && places
                                                .filter(place => place?.placeTagId === placeTag?.id)
                                                .map((place, index) => (
                                                    <PlaceCard key={index+place?.id} place={place} data={data} setData={setData} placeTagColor={placeTag?.color}/>
                                                ))}
                                        </>
                                    )}
                                </>
                            </TabsContent>
                        ))}
                    </>
                )}
            </Tabs>
        </>
    );
}