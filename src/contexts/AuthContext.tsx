"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

import type { User, AuthError } from "@supabase/supabase-js";

import { env }             from "@/lib/env";
import { supabase }        from "@/lib/supabase/client";
import { fetchOwnProfile } from "@/lib/supabase/profile";
import { useError }        from "@/contexts/ErrorContext";

import type { AuthContextType, Profile } from "@/types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);
    const { setError } = useError();
    const router = useRouter();

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
        const restoreSession = async () => {
            try {
                const projectId = new URL(env.NEXT_PUBLIC_SUPABASE_URL).hostname.split(".")[0];
                const legacyStorageKey = `sb-${projectId}-auth-token`;
                const legacySession = window.localStorage.getItem(legacyStorageKey);

                if (legacySession) {
                    const storedSession: unknown = JSON.parse(legacySession);
                    if (
                        typeof storedSession === "object" &&
                        storedSession !== null &&
                        "access_token" in storedSession &&
                        typeof storedSession.access_token === "string" &&
                        "refresh_token" in storedSession &&
                        typeof storedSession.refresh_token === "string"
                    ) {
                        const { error: migrationError } = await supabase.auth.setSession({
                            access_token: storedSession.access_token,
                            refresh_token: storedSession.refresh_token,
                        });

                        if (migrationError) throw migrationError;

                        window.localStorage.removeItem(legacyStorageKey);
                        router.refresh();
                    } else {
                        console.error("Unable to migrate the stored Supabase session: invalid session data");
                        window.localStorage.removeItem(legacyStorageKey);
                    }
                }

                const { data: { session }, error } = await supabase.auth.getSession();

                if (error) {
                    setUser(null);
                    setProfile(null);
                    setLoading(false);
                    return;
                }

                setUser(session?.user ?? null);

                if (session?.user) {
                    const { data: profile, error: profileError } = await fetchOwnProfile(session.user.id);

                    if (profileError) {
                        if (profileError.code === "PGRST116") {
                            await supabase.auth.signOut();
                            setUser(null);
                        } else {
                            console.error("Error fetching profile:", profileError.message);
                        }
                    } else {
                        setProfile(profile);
                    }
                }
            } catch (error) {
                console.error("Unable to restore the Supabase session:", error);
                setUser(null);
                setProfile(null);
            } finally {
                setLoading(false);
            }
        };

        void restoreSession();

        // Listen for changes (login, logout, refresh)
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            if (!session) setProfile(null);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, [router, setError]);

    const signInWithProvider = async (provider: 'github' | 'google' | 'facebook' | 'azure'): Promise<{ error: AuthError | null }> => {
        setLoading(true);

        const { error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: env.NEXT_PUBLIC_LOGIN_REDIRECT,
                scopes: "email"
            },
        });

        setLoading(false);

        return { error };
    };

    const signInWithEmail = async (email: string): Promise<{ error: AuthError | null; data?: unknown }> => {
        setLoading(true);

        const { data, error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: env.NEXT_PUBLIC_LOGIN_REDIRECT,
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