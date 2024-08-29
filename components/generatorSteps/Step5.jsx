import {Skeleton} from "@/components/ui/skeleton";

export default function Step5({loading }) {

    return (
        <>
            {/*TODO: animation chargement histoire puis redirection vers /story/[id]*/}
            {loading && (
                <Skeleton className="w-full rounded-lg" style={{ height: 'calc(100dvh - 184px)' }} />
            )}
        </>
    );
}