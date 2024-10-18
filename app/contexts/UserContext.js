import React, {createContext, useContext, useEffect, useState} from 'react';
import {useSession} from "next-auth/react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const { data: session, status } = useSession();
    
    const [user, setUser] = useState(null);
    const [isPremium, setIsPremium] = useState(false);
    const [canGenerate, setCanGenerate] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const fetchUser = async () => {
            if (session?.user?.id) {
                try {
                    const response = await axios.get(`/api/user/${session?.user?.id}`);

                    if (response.status === 200) {
                        const userData = response.data.user;
                        setUser(userData);
                        setIsPremium(userData?.plan === 'PREMIUM');
                        setCanGenerate(userData?.plan === 'PREMIUM' || userData?.storiesGenerated < 10 );
                        localStorage.setItem('user', JSON.stringify(userData));
                    } else {
                        console.error('Failed to fetch user');
                    }
                } catch (error) {
                    console.error('Error fetching user:', error);
                }
            }
        };

        if (session) {
            fetchUser();
        }
        if ( status === "unauthenticated") {
            localStorage.removeItem('user');
        }
    }, [session, status]);

    return (
        <UserContext.Provider value={{ user, status, isPremium, currentStep, setCurrentStep, canGenerate }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
