"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

import type { User, AuthError } from "@supabase/supabase-js";

import { supabase }     from "@/lib/supabase/client";
import { fetchProfile } from "@/lib/supabase/profile";
import { useError }     from "@/contexts/ErrorContext";

import type { AuthContextType, Profile } from "@/types";

const { NEXT_PUBLIC_LOGIN_REDIRECT } = process.env;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);
    const { setError } = useError();

    useEffect(() => {
        // Check for OAuth errors in URL parameters
        const checkOAuthErrors = () => {
            if (typeof window === 'undefined') {
                return;
            }

            const urlParams = new URLSearchParams(window.location.search);
            const hashParams = new URLSearchParams(window.location.hash.substring(1));

            const error = urlParams.get('error') || hashParams.get('error');
            const errorDescription = urlParams.get('error_description') || hashParams.get('error_description');

            if (error) {
                let errorMessage = `OAuth Error: ${error}`;
                if (errorDescription) {
                    const decodedDescription = decodeURIComponent(errorDescription.replace(/\+/g, ' '));
                    errorMessage += `\n\nDetails: ${decodedDescription}`;
                }

                setError(errorMessage);

                // Clean up the URL by removing error parameters
                const cleanUrl = window.location.pathname;
                window.history.replaceState({}, document.title, cleanUrl);
            }
        };

        checkOAuthErrors();

        // On mount, check for an existing session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);

            if (session?.user) {
                fetchProfile(session.user.id).then(({data : profile, error}) => {
                    if (error) {
                        console.error("Error fetching profile:", error);
                    } else {
                        setProfile(profile);
                    }

                    setLoading(false);
                });
            } else {
                setLoading(false);
            }
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

    const signInWithProvider = async (provider: 'github' | 'google' | 'facebook' | 'azure'): Promise<{ error: AuthError | null }> => {
        setLoading(true);

        const { error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: NEXT_PUBLIC_LOGIN_REDIRECT,
                scopes: "email"
            },
        });

        setLoading(false);

        return { error };
    };

    const signInWithEmail = async (email: string): Promise<{ error: AuthError | null; data?: any }> => {
        setLoading(true);

        const { data, error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: process.env.NODE_ENV === "development" ?
                    "http://localhost:3000" :
                    "https://lyritenextjs.netlify.app",
            },
        });

        setLoading(false);

        return { error, data };
    };

    const deleteAccount = async (): Promise<{ error: AuthError | null }> => {
        if (!user) return { error: new Error("No user logged in") as AuthError };

        const { error } = await supabase.auth.admin.deleteUser(user.id);

        return { error };
    };

    const downloadPii = async (): Promise<void> => {
        if (!user) return;

        const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();
        if (error) {
            console.error("Error fetching user data:", error);
            return;
        }

        return data;
    };

    const signOut = async (): Promise<{ error: AuthError | null }> => {
        return supabase.auth.signOut();
    };

    return (
        <AuthContext.Provider value={{
            user,
            profile,
            loading,
            signInWithProvider,
            signInWithEmail,
            signOut,
            deleteAccount,
            downloadPii
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) throw new Error("useAuth must be used inside AuthProvider");

    return context;
}