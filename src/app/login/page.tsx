"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button, Card, Flex, TextField } from "@radix-ui/themes";

import { useAuth } from "@/contexts/AuthContext";

import Layout from "@/components/layout/Layout";
import Hr from "@/components/hr/Hr";

import { LogoIcon } from "@/components/icons/LogoIcon.svg";
import { GoogleG } from "@/components/icons/providers/google-g.svg";
import { FacebookF } from "@/components/icons/providers/facebook-f.svg";
import { MicrosoftIcon } from "@/components/icons/providers/microsoft-icon.svg";
import { GithubIcon } from "@/components/icons/providers/github-icon.svg";

import css from "./page.module.css";

const emailReg = /^[\w.!#$%&'*+/=?^`{|}~-]+@[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?(?:\.[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?)*$/i;

const loginProviders = [
    { name: "GitHub", icon: <GithubIcon />, provider: "github" as const },
    { name: "Google", icon: <GoogleG />, provider: "google" as const },
    { name: "Facebook", icon: <FacebookF />, provider: "facebook" as const },
    { name: "Microsoft", icon: <MicrosoftIcon />, provider: "azure" as const },
];

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [emailSent, setEmailSent] = useState(false);

    const { user, signInWithProvider, signInWithEmail } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // Check for auth callback errors
        const urlParams = new URLSearchParams(window.location.search);
        const authError = urlParams.get('error');

        if (authError === 'auth_callback_error') {
            setError('There was an error signing you in. Please try again.');
            // Clean up the URL
            const cleanUrl = window.location.pathname;
            window.history.replaceState({}, document.title, cleanUrl);
        }
    }, []);

    if (user) {
        router.replace("/");
    }

    const handleLogin = async (provider: 'github' | 'google' | 'facebook' | 'azure') => {
        setLoading(true);
        setError(null);
        setEmailSent(false); // Reset email sent state if user tries OAuth

        const { error : signinError } = await signInWithProvider(provider);

        if (signinError) {
            setError(signinError.message);
        }

        setLoading(false);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        setError(null); // Clear any existing errors when user starts typing

        // Basic email validation regex
        const valid = emailReg.test(value);
        setIsValidEmail(valid);
    };

    const handleEmailKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && isValidEmail && !loading) {
            handleEmailSubmit();
        }
    };

    const handleEmailSubmit = async () => {
        if (!isValidEmail || loading) return;

        setLoading(true);
        setError(null);

        const { error: emailError } = await signInWithEmail(email);

        if (emailError) {
            setError(emailError.message);
        } else {
            setEmailSent(true);
        }

        setLoading(false);
    };

    return (
        <Layout header={false} bg="mesh" justifyContent="center">
            <Flex direction="column" gap="6" align="center" justify="center" className={css.container}>
                <Link href="/" aria-label="Go to homepage">
                    <LogoIcon className={css.logo} />
                </Link>

                <Card className={css.checkEmail} size="4">
                    <Flex direction="column" gap="3" align="center">
                        {emailSent ? (
                            <>
                                <h3>Check your email</h3>
                                <p style={{ textAlign: 'center', margin: 0 }}>
                                    We've sent you a magic link at <strong>{email}</strong>.<br/>
                                    Click the link in your email to sign in.
                                </p>
                                <Button
                                    size="3"
                                    variant="soft"
                                    onClick={() => {
                                        setEmailSent(false);
                                        setEmail("");
                                        setIsValidEmail(false);
                                    }}
                                >
                                    Try a different email
                                </Button>
                            </>
                        ) : (
                            <>
                                Sign in with
                                {loginProviders.map((provider) => (
                                    <Button
                                        key={provider.name}
                                        onClick={() => handleLogin(provider.provider)}
                                        size="4"
                                        color="gray"
                                        className={css.providerButton}
                                        variant="soft"
                                        disabled={loading}
                                    >
                                        {provider.icon}
                                        {provider.name}
                                    </Button>
                                ))}

                                <Hr className={css.hr}>or</Hr>

                                <TextField.Root
                                    placeholder="enter your email address"
                                    size="3"
                                    className={css.emailInput}
                                    type="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    onKeyPress={handleEmailKeyPress}
                                />

                                <Button
                                    size="3"
                                    className={css.loginButton}
                                    disabled={!isValidEmail || loading}
                                    onClick={handleEmailSubmit}
                                >
                                    Continue with Email
                                </Button>
                            </>
                        )}

                        {error && (
                            <p style={{ color: 'var(--red-9)', margin: 0, textAlign: 'center' }}>
                                {error}
                            </p>
                        )}
                    </Flex>
                </Card>
            </Flex>
        </Layout>
    );
}
