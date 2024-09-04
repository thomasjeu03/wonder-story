import StoryContent from "@/app/story/[id]/content";
import { getStoryById } from "@/lib/api";
import {customMetadata} from "@/lib/metadata";

export async function generateMetadata({ params: { id } }) {
    const story = await getStoryById(id);

    return customMetadata({
        title: story?.title || 'Histoire - Wonder Story',
        postURL: `/story/${id}`,
    });
}

export default async function Story({ params: { id } }) {
    const story = await getStoryById(id);

    return (
        <>
            <StoryContent data={story} />
        </>
    );
}