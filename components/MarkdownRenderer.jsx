import { useEffect, useState } from 'react';
import {markdownToHtml} from "@/lib/markdownToHtml";

function MarkdownRenderer({ story }) {
    const [html, setHtml] = useState('');

    useEffect(() => {
        const convertMarkdown = async () => {
            if (story) {
                const htmlContent = await markdownToHtml(story);
                setHtml(htmlContent);
            }
        };
        convertMarkdown();
    }, [story]);

    return (
        <div
            className='markdown w-full max-w-lg'
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}

export default MarkdownRenderer;