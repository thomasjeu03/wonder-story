"use client"

import MarkdownRenderer from "@/components/MarkdownRenderer";

export default function StoryContent({data}) {
    return (
        <>
            <MarkdownRenderer story={data?.content} />
        </>
    );
}