"use client"

import { signOut } from "next-auth/react";
import {Button} from "@/components/ui/button";
import {H2} from "@/components/typo/H2";
import Image from 'next/image';
import {BuyButton} from "@/components/buy/BuyButton";
import {AccountSettingsButton} from "@/components/buy/UserSettings";
import {useUser} from "@/app/contexts/UserContext";
import {useState} from "react";
import {Send} from "lucide-react";
import axios from "axios";

export default function AccountContent() {
    const { user, isPremium } = useUser();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await axios.post('/api/sendEmail', {name: user?.name, email: user?.email });
            if (response.status === 200){
                setSuccess(true);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {user?.image && (
                <Image
                    src={user?.image}
                    alt={user?.name || 'User Image'}
                    width={60}
                    height={60}
                    unoptimized
                    className="rounded-full"
                    quality={80}
                />
            )}
            <H2 className='text-center'>{user?.name}</H2>
            <p className='text-center'>{user?.email}</p>
            <p className={`rounded-md px-4 py-1 text-white 
                        ${isPremium ? 'bg-yellow-600' : 'bg-green-600'}`}
            >
                {user?.plan}
            </p>
            <div className='flex gap-2'>
                {isPremium ? (
                    <AccountSettingsButton/>
                ) : (
                    <BuyButton/>
                )}
                <Button variant='link' className='text-destructive' onClick={() => signOut()}>
                    Sign out
                </Button>
            </div>
            <hr/>
            {isPremium && (
                <>
                    <Button onClick={handleSubmit} type="button" disabled={loading}>
                        {loading ? 'Sending...' : 'Send email test'}
                        <Send size={18} />
                    </Button>
                    {error && <p style={{color: 'red'}}>Error: {error}</p>}
                    {success && <p style={{color: 'green'}}>Email sent successfully!</p>}
                </>
            )}
        </>
    );
}