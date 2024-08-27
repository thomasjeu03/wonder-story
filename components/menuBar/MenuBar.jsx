import Link from 'next/link';
import Image from "next/image";
import logo from "../../public/img/logo-white.png";
import logoPremium from "../../public/img/logo-white-premium.png";
import {Button} from "@/components/ui/button";
import {SquareLibrary} from "lucide-react";
import {useUser} from "@/app/contexts/UserContext";
import {useLocale} from "@/app/contexts/LocaleContext";

export default function MenuBar() {
    const { user, isPremium } = useUser();
    const {setCurrentStep } = useUser();

    const { t } = useLocale();

    return (
        <>
            <div className="gradient-blur">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <nav className="w-full fixed top-2 sm:top-3 z-50 left-0 px-2 sm:px-3">
                <ul className="w-full h-9 flex sm:grid flex-row sm:grid-cols-3 justify-between sm:justify-center items-center">
                    <li className="flex items-center justify-start">
                        {user && (
                            <Link href="/library" aria-label="Ma librairie">
                                <Button variant="ghost" size="icon">
                                    <SquareLibrary />
                                    <p className="hidden sm:block">{t('my-library')}</p>
                                </Button>
                            </Link>
                        )}
                    </li>
                    <li className="flex items-center justify-center">
                        <Link href="/" aria-label="Accueil" onClick={() => setCurrentStep(0)}>
                            <Image src={isPremium ? logoPremium : logo} alt="Wonder Story logo" className="h-6 sm:h-9 w-[135px] sm:w-[202px]" height={36} width={202} priority quality={80} />
                        </Link>
                    </li>
                    <li className="flex items-center justify-end">
                        {user && (
                            <Link href="/account" aria-label="Mon compte">
                                <Image
                                    src={user?.image}
                                    alt={user?.name || 'User Image'}
                                    width={32}
                                    height={32}
                                    priority
                                    quality={80}
                                    unoptimized
                                    className={`${isPremium ? 'border-2 border-yellow-500' : ''} rounded-full h-8 w-8 mx-[2px] my-[2px]`}
                                />
                            </Link>
                        )}
                    </li>
                </ul>
            </nav>
        </>
    );
}