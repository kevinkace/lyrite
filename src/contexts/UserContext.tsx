"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

import { supabase } from "@/lib/supabase/client";

import type { User } from "@supabase/supabase-js";

import type { UserContextType } from "@/types";

const UserContext = createContext<UserContextType>({
    user: null,
    loading: true
});

export const UserProvider = ({ children, userId }: { children: ReactNode, userId: string }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);

            const { data, error } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", userId)
                .single();

            if (error) {
                console.error("Error fetching user:", error);
            } else {
                setUser(data);
            }
            setLoading(false);
        };

        fetchUser();
    }, [userId]);

    return (
        <UserContext.Provider value={{ user, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
