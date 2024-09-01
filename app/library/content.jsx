"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useUser } from "@/app/contexts/UserContext";
import { getStories } from "@/lib/api";
import {Skeleton} from "@/components/ui/skeleton";
import {useLocale} from "@/app/contexts/LocaleContext";
import {Button} from "@/components/ui/button";
import {Sparkles} from "lucide-react";

const formatDate = (dateString, showHours = true, showDate = true) => {
    const date = new Date(dateString);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {t} = useLocale();

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const months = ['january', 'february', 'march', 'april', 'mai', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

    const dayOfWeek = daysOfWeek[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];

    if (showHours && !showDate) {
        return `${hours}:${minutes}`;
    }

    if (showDate && !showHours) {
        return `${t(dayOfWeek)} ${day} ${t(month)}`;
    }

    return `${hours}:${minutes} ${t(dayOfWeek)} ${day} ${t(month)}`;
};

export const getTitle = (story) => {
    const content = story?.content || '';
    const match = content.match(/^#\s(.+)/m);
    return match ? match[1] : '';
};

export default function LibraryContent() {
    const { user } = useUser();
    const { t } = useLocale();
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [limit, setLimit] = useState(20)
    const [offset, setOffset] = useState(0)

    useEffect(() => {
        async function fetchStories() {
            setLoading(true);
            try {
                if (user?.id) {
                    const fetchedStories = await getStories({ userId: user?.id }, offset, limit);
                    setStories(fetchedStories);
                } else {
                    setStories([]);
                }
            } catch (error) {
                setLoading(false)
            } finally {
                setLoading(false);
            }
        }

        fetchStories();
    }, [limit, offset, user?.id]);

    return (
        <section
            className="min-h-min w-full flex flex-col items-center pt-4 sm:pt-6 gap-6 sm:gap-8 pb-20 max-w-4xl relative">
            <h2 className="font-bold text-2xl lg:text-3xl w-full sticky top-12 sm:top-14 z-10 left-0">{t('my-library')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                {loading ? (
                    <>
                        <Skeleton className="w-full rounded-sm" style={{height: '58px'}}/>
                        <Skeleton className="w-full rounded-sm" style={{height: '58px', opacity: '0.7'}}/>
                        <Skeleton className="w-full rounded-sm" style={{height: '58px', opacity: '0.3'}}/>
                        <Skeleton className="w-full rounded-sm" style={{height: '58px', opacity: '0.1'}}/>
                    </>
                ) : (
                    stories && stories?.length > 0 ? (
                        stories.map((story, index) => (
                            <Link href={`/story/${story?.id}`} key={index}
                                  className="w-full flex flex-col rounded-sm pt-2.5 pl-3 pr-3 pb-2 bg-secondary backdrop-blur-sm shadow-lg hover:bg-secondary/80 outline-dashed outline-1 outline-gray-600 -outline-offset-4 hover:outline-gray-600">
                                <div className="w-full flex flex-row items-center justify-between">
                                    <p className="text-xs text-gray-400">{formatDate(story?.createdAt, false, true)}</p>
                                    <p className="text-xs text-gray-400">{formatDate(story?.createdAt, true, false)}</p>
                                </div>
                                <h2 className="text-base font-semibold line-clamp-1">{getTitle(story)}</h2>
                                {/*TODO: menu -> delete button (with alert)*/}
                            </Link>
                        ))
                    ) : (
                        <>
                            <p className="text-gray-400 text-center">{t('no-story-created')}</p>
                            <Link href="/">
                                <Button variant="secondary" className="w-full">
                                    {t('create-your-first-story')}
                                    <Sparkles size={18}/>
                                </Button>
                            </Link>
                        </>
                    )
                )}
            </div>
            {/*TODO: pagination*/}
        </section>
    );
}