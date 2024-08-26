import {Skeleton} from "@/components/ui/skeleton";
import MarkdownRenderer from "@/components/MarkdownRenderer";

export default function Step5({loading , error, newStory }) {

    return (
        <>
            {/*TODO: animation chargement histoire puis redirection vers /story/[id]*/}
            {loading && (
                <Skeleton className="w-full rounded-lg" style={{ height: 'calc(100dvh - 184px)' }} />
            )}
            {!loading && !error && newStory && <MarkdownRenderer story={newStory}/>}
        </>
    );
}