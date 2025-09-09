"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

import type { User, AuthError } from "@supabase/supabase-js";

import { supabase } from "@/lib/supabaseClient";

type AuthContextType = {
    user: User | null;
    loading: boolean;
    signInWithGithub: () => Promise<{ error: AuthError | null }>;
    signOut: () => Promise<{ error: AuthError | null }>;
};

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    signInWithGithub: async () => ({ error: null }),
    signOut: async () => ({ error: null }),
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // sign in
    const signInWithGithub = async (): Promise<{ error: AuthError | null }> => {
        setLoading(true);
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "github",
            options: {
                redirectTo: window.location.origin,
            },
        });
        setLoading(false);
        return { error };
    };

    // sign out
    const signOut = async (): Promise<{ error: AuthError | null }> => {
        return supabase.auth.signOut();
    };

    useEffect(() => {
        // initial session check
        const getSession = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();
            setUser(session?.user ?? null);
            setLoading(false);
        };
        getSession();

        // listen for auth changes
        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setUser(session?.user ?? null);
                setLoading(false);
            }
        );

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, signInWithGithub, signOut }
        }>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
