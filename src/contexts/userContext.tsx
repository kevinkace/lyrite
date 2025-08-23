"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/lib/supabaseClient";

import type { User } from "@supabase/supabase-js";

type UserContextType = {
    user: User | null;
    loading: boolean;
    handleSignOut: () => Promise<void>;
};

const UserContext = createContext<UserContextType>({
    user: null,
    loading: true,
    handleSignOut: async () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // signout
    const handleSignOut = async () => {
        await supabase.auth.signOut();
    };

    useEffect(() => {
        // Check current session
        const getSession = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();

            setUser(session?.user ?? null);
            setLoading(false);
        };
        getSession();

        // Listen for auth changes
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    return (
        <UserContext.Provider value={{ user, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
