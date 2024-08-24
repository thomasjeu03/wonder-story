import Image from "next/image";
import {useLocale} from "@/app/contexts/LocaleContext";


export default function CaracterCard({ caracter }) {
    const { t } = useLocale();
    return (
        <button type="button" className="w-full min-w-40 flex flex-col bg-fuchsia-950/20 overflow-hidden relative rounded-xs sm:rounded-md border-2 border-fuchsia-800/30 shadow-lg">
            <Image
                src={caracter?.img}
                alt={caracter?.label}
                className="w-full aspect-square object-cover"
                width={200}
                priority
                height={200}
                quality={80}
            />
            <div className="p-1 sm:p-2 md:p-3">
                <h4 className="text-sm md:text-base text-left text-fuchsia-200">{t(caracter?.label)}</h4>
            </div>
        </button>
    )
}