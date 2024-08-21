import generateMetadata from '@/lib/metadata';
import {H1} from "@/components/typo/H1";
import {H2} from "@/components/typo/H2";
import LoginComponent from "@/components/loginComponent";

export const metadata = generateMetadata({});

export default function Home() {
    return (
        <>
            <main className="flex min-h-screen flex-col items-center justify-between p-8">
                <LoginComponent />
                <br/>
                <div className='max-w-4xl'>
                    <H1 className='text-fuchsia-500'>The Joke Tax Chronicles</H1>
                    <p className="leading-7 [&:not(:first-child)]:mt-6">
                        Once upon a time, in a far-off land, there was a very lazy king who
                        spent all day lounging on his throne. One day, his advisors came to him
                        with a problem: the kingdom was running out of money.
                    </p>
                    <H2>The Kings Plan</H2>
                    <p className="leading-7 [&:not(:first-child)]:mt-6">
                        The king thought long and hard, and finally came up with{" "}
                        <a
                            href="#"
                            className="font-medium text-primary underline underline-offset-4"
                        >
                            a brilliant plan
                        </a>
                        : he would tax the jokes in the kingdom.
                    </p>
                    <blockquote className="mt-6 border-l-2 pl-6 italic">
                        After all he said, everyone enjoys a good joke, so its only fair
                        that they should pay for the privilege.
                    </blockquote>
                    <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
                        The Joke Tax
                    </h3>
                    <p className="leading-7 [&:not(:first-child)]:mt-6">
                        The kings subjects were not amused. They grumbled and complained, but
                        the king was firm:
                    </p>
                    <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                        <li>1st level of puns: 5 gold coins</li>
                        <li>2nd level of jokes: 10 gold coins</li>
                        <li>3rd level of one-liners : 20 gold coins</li>
                    </ul>
                    <p className="leading-7 [&:not(:first-child)]:mt-6">
                        As a result, people stopped telling jokes, and the kingdom fell into a
                        gloom. But there was one person who refused to let the king
                        foolishness get him down: a court jester named Jokester.
                    </p>
                    <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
                        Jokestes Revolt
                    </h3>
                    <p className="leading-7 [&:not(:first-child)]:mt-6">
                        Jokester began sneaking into the castle in the middle of the night and
                        leaving jokes all over the place: under the pillow, in his soup,
                        even in the royal toilet. The king was furious, but he seem to
                        stop Jokester.
                    </p>
                    <p className="leading-7 [&:not(:first-child)]:mt-6">
                        And then, one day, the people of the kingdom discovered that the jokes
                        left by Jokester were so funny that they help but laugh. And
                        once they started laughing, they stop.
                    </p>
                    <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
                        The Rebellion
                    </h3>
                    <p className="leading-7 [&:not(:first-child)]:mt-6">
                        The people of the kingdom, feeling uplifted by the laughter, started to
                        tell jokes and puns again, and soon the entire kingdom was in on the
                        joke.
                    </p>
                    <div className="my-6 w-full overflow-y-auto">
                        <table className="w-full">
                            <thead>
                            <tr className="m-0 border-t p-0 even:bg-muted">
                                <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                                    Kings Treasury
                                </th>
                                <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                                    Peoples happiness
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr className="m-0 border-t p-0 even:bg-muted">
                                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                                    Empty
                                </td>
                                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                                    Overflowing
                                </td>
                            </tr>
                            <tr className="m-0 border-t p-0 even:bg-muted">
                                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                                    Modest
                                </td>
                                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                                    Satisfied
                                </td>
                            </tr>
                            <tr className="m-0 border-t p-0 even:bg-muted">
                                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                                    Full
                                </td>
                                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                                    Ecstatic
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="leading-7 [&:not(:first-child)]:mt-6">
                        The king, seeing how much happier his subjects were, realized the error
                        of his ways and repealed the joke tax. Jokester was declared a hero, and
                        the kingdom lived happily ever after.
                    </p>
                    <p className="leading-7 [&:not(:first-child)]:mt-6">
                        The moral of the story is: never underestimate the power of a good laugh
                        and always be careful of bad ideas.
                    </p>
                </div>
            </main>
        </>
    );
}
