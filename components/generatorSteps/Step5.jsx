import {Skeleton} from "@/components/ui/skeleton";

export default function Step5() {

    return (
        <>
            {/*TODO: animation chargement histoire avec rotation des personnages, lieux et themes*/}
            <Skeleton className="w-full rounded-lg" style={{ height: 'calc(100dvh - 200px)' }} />
        </>
    );
}