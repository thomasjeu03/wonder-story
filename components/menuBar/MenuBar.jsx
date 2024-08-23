import Link from 'next/link';
import Image from "next/image";
import logo from "../../public/img/logo.png";
import {Button} from "@/components/ui/button";
import {SquareLibrary} from "lucide-react";
import {useUser} from "@/app/contexts/UserContext";
import {Skeleton} from "@/components/ui/skeleton";

export default function MenuBar() {
    const { user, status, isPremium } = useUser();

    return (
        <nav className="w-full">
            <ul className="flex flex-nowrap gap-3 justify-between w-full h-9 items-center">
                <li>
                    <Link href="/library" aria-label="Ma librairie">
                        <Button variant="ghost" size="icon">
                            <SquareLibrary />
                        </Button>
                    </Link>
                </li>
                <li>
                    <Link href="/" aria-label="Accueil">
                        <Image src={logo} alt="Wonder Story logo" className="h-6 sm:h-9 w-[135px] sm:w-[202px]" height={36} width={202} priority />
                    </Link>
                </li>
                <li>
                    <Link href="/account" aria-label="Mon compte">
                        {user ? (
                            <>
                                {user?.image && (
                                    <Image
                                        src={user?.image}
                                        alt={user?.name || 'User Image'}
                                        width={32}
                                        height={32}
                                        priority
                                        unoptimized
                                        className={`${isPremium ? 'border-2 border-yellow-500' : ''} rounded-full h-8 w-8 mx-[2px] my-[2px]`}
                                    />
                                )}
                            </>
                        ) :  (
                            <Skeleton className="rounded-full h-8 w-8" />
                        )}
                    </Link>
                </li>
            </ul>
        </nav>
    );
}