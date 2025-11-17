"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

import { fetchProfile } from "@/lib/supabase/profile";

import type { UserContextType, Profile } from "@/types";

const UserContext = createContext<UserContextType>({
    id: null,
    loading: true,
    profile: null
});

export const UserProvider = ({ children, userId }: { children: ReactNode, userId: string }) => {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            const { data, error } = await fetchProfile(userId);

            if (error) {
                console.error("Error fetching user:", error);
            } else {
                setProfile(data);
            }
            setLoading(false);
        };

        fetchData();
    }, [userId]);

    return (
        <UserContext.Provider value={{ id : userId, profile, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);

