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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // On mount, check for an existing session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        // Listen for changes (login, logout, refresh)
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const signInWithGithub = async (): Promise<{ error: AuthError | null }> => {
        setLoading(true);
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "github",
            options: {
                redirectTo: window.location.href,
            },
        });
        setLoading(false);
        return { error };
    };


    const signOut = async (): Promise<{ error: AuthError | null }> => {
        return supabase.auth.signOut();
    };

    return (
        <AuthContext.Provider value={{ user, loading, signInWithGithub, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) throw new Error("useAuth must be used inside AuthProvider");

    return context;
}