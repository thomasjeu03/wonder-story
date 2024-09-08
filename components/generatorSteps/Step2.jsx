import { H2 } from "@/components/typo/H2";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {motion} from "framer-motion";

import { useLocale } from "@/app/contexts/LocaleContext";
import {H3} from "@/components/typo/H3";
import CaracterCard from "@/components/cards/CaracterCard";
import {Skeleton} from "@/components/ui/skeleton";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import DynamicIcon from "@/components/ui/dynamicIcon";

export default function Step2({ data, setData, loadingCaracters, loadingCaracterTags, caracters, caracterTags }) {
    const { t } = useLocale();

    return (
        <>
            <div className="flex flex-col gap-3 w-full max-w-4xl">
                <H2>{t('choose-your-caracters')}</H2>
                <H3 className="text-gray-400">{t('choose-your-caracters-description')}</H3>
            </div>

            <Tabs defaultValue={caracterTags[0]?.name} className="w-full flex flex-col items-center">
                <TabsList className="w-full max-w-4xl gap-2">
                    {loadingCaracterTags ? (
                        <Skeleton height="20px" width="40px" />
                    ):(
                        <>
                            {caracterTags && caracterTags.map((caracterTag, index) => (
                                <TabsTrigger key={index+caracterTag?.id} value={caracterTag?.name}
                                    style={{ background: `radial-gradient(50% 100% at 50% 0%, ${caracterTag?.color} 0%, ${caracterTag?.color}77 50%, ${caracterTag?.color}22 100%, ${caracterTag?.color}00 150%)` }}>
                                    <DynamicIcon name={caracterTag?.icon} size={20} strokeWidth={1.5} />
                                    {t(caracterTag?.name)}
                                </TabsTrigger>
                            ))}
                        </>
                    )}
                </TabsList>
                {loadingCaracterTags ? (
                    <Skeleton height="20px" width="40px" />
                ):(
                    <>
                        {caracterTags && caracterTags.map((caracterTag, index) => (
                            <TabsContent key={index+caracterTag?.id} value={caracterTag?.name} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 w-full gap-2 sm:gap-3 md:gap-4 max-w-5xl">
                                <>
                                    {loadingCaracters ? (
                                        <Skeleton height="20px" width="40px" />
                                    ):(
                                        <>
                                            {caracters && caracters
                                                .filter(caracter => caracter?.caracterTagId === caracterTag?.id)
                                                .map((caracter, index) => (
                                                <CaracterCard key={index+caracter?.id} caracter={caracter} data={data} setData={setData} caracterTagColor={caracterTag?.color} />
                                            ))}
                                        </>
                                    )}
                                </>
                            </TabsContent>
                        ))}
                    </>
                )}
            </Tabs>

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